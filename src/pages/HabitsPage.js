import styled from "styled-components"
import Menu from "../assets/components/Menu.js";
import Header from "../assets/components/Header.js";
import { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../assets/contexts/userDataContext.js";
import { days } from "../assets/constants/days.js"
import { ThreeDots } from "react-loader-spinner";
import HabitCard from "../assets/components/HabitCard.js";
import { BASE_URL } from "../assets/constants/urls.js"
import axios from "axios";

export default function HabitsPage() {
    const { token, habits, setHabits, loginStatus } = useContext(UserDataContext);

    const [form, setForm] = useState({ name: '', days: [] });
    const [newHabit, setNewHabit] = useState(false);
    const [disableForm, setDisableForm] = useState(false);
    const [saveButton, setSaveButton] = useState("Salvar");

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        axios.get(`${BASE_URL}/habits`, config)
            .then(res => {
                setHabits(res.data);
            })
            .catch(err => alert(err.response.data.message));
    }, []);

    function addHabit(e) {
        e.preventDefault();
        if (form.name == "" || form.days.length === 0) {
            alert("Você precisa escrever o nome da atividade e escolher pelo menos um dia da semana!")
            return;
        }
        else {

            setDisableForm(true);
            setSaveButton(<ThreeDots color="#FFFFFF" width="45px"/>);

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            axios.post(`${BASE_URL}/habits`, form, config)
                .then(res => {
                    setForm({ name: '', days: [] });
                    const newHabits = [...habits, res.data];
                    setHabits(newHabits);
                    setNewHabit(false);
                    setDisableForm(false);
                    setSaveButton("Salvar");
                })
                .catch(err => {
                    alert(err.response.data.message);
                    setDisableForm(false);
                    setSaveButton("Salvar");
                });
        }
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function selectDay(id) {
        let newForm = {};
        if (form.days.includes(id)) {
            newForm = { ...form, days: form.days.filter(i => i !== id) };
            setForm(newForm);
        } else {
            newForm = { ...form, days: [...form.days, id] };
            setForm(newForm);
        }
    }

    return (
        <>
            <Header data-test="header"></Header>
            <ContainerPage>
                <ContainerHabits>
                    <h1>Meus hábitos</h1>
                    <AddButton data-test="habit-create-btn" onClick={() => setNewHabit(!newHabit)}>+</AddButton>
                </ContainerHabits>
                {newHabit && (
                    <HabitsForm data-test="habit-create-container" onSubmit={addHabit}>
                        <input
                            data-test="habit-name-input"
                            placeholder=" nome do hábito"
                            type="text"
                            name="name"
                            onChange={handleForm}
                            value={form.name}
                            disabled={disableForm}
                        />
                        <ContainerDays>
                            {days.map((d, i) =>
                                <DaysButton
                                    data-test="habit-day"
                                    key={i}
                                    id={i}
                                    selected={form.days.includes(i)}
                                    onClick={() => selectDay(i)}
                                    disabled={disableForm}>
                                    {d}
                                </DaysButton>)}
                        </ContainerDays>
                        <ContainerButton>
                            <button data-test="habit-create-cancel-btn" type="reset" disabled={disableForm} onClick={() => setNewHabit(!newHabit)}>Cancelar</button>
                            <SaveButton data-test="habit-create-save-btn" type="submit" disabled={disableForm}>{saveButton}</SaveButton>
                        </ContainerButton>
                    </HabitsForm>
                )}
                {(habits.length > 0) ? habits.map((h) => <HabitCard key={h.id} card={h} />) :
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
            </ContainerPage>
            <Menu data-test="menu"></Menu>
        </>
    );
}

const ContainerPage = styled.div`
    margin-top: 70px;
    margin-bottom: 110px;
    padding: 0 17px;
    p{
        color: #666666;
        margin-top:28px;
        font-size: 18px;
        line-height: 22px;
    }
`;

const ContainerHabits = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 23px;
    color: #126BA5;
    padding-top:28px;
`;

const AddButton = styled.button`
    width: 40px;
    height: 35px;
    color: #FFFFFF;
    padding-bottom: 5px;
    background-color:#52B6FF;
    border: none;
    border-radius: 4.7px;
    display: flex;
    justify-content: center;
    align-items: center;  
    font-size: 27px;
    cursor: pointer;
`;

const HabitsForm = styled.form`
    width: 340px;
    height: 180px;
    padding: 18px;
    margin-top: 20px;
    margin-bottom: 29px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 5px;
    input{
        width: 100%;
        height: 45px;
        padding: 0 11px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        ::placeholder{
            color:#DBDBDB;
        }
        :disabled{
            background-color: #F2F2F2;
            color: #B3B3B3;
        }
    }
`;

const ContainerDays = styled.div`
    display: flex;
    div{
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        margin-top: 8px;
        margin-right: 4px;
    }
`;

const DaysButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    width: 30px;
    height: 30px;
    color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.selected ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    font-size: 20px;
    line-height: 25px;
    cursor:pointer ;
`;

const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    button{
        width: 84px;
        height: 35px;
        color: #FFFFFF;
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        &:disabled{
            opacity: 0.7;
        }
    }
    button:nth-child(1){
        color: #52B6FF;
        background-color: #FFFFFF;
        margin-right: 10px;
    }
`;

const SaveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor:pointer;
`

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;