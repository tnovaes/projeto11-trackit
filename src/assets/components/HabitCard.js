import styled from "styled-components"
import { days } from "../constants/days.js"
import { TrashOutline } from 'react-ionicons';
import { useContext } from "react";
import { UserDataContext } from "../contexts/userDataContext.js";
import { BASE_URL } from "../constants/urls.js"
import axios from "axios";


export default function HabitCard(props) {
    const { token, habits, setHabits } = useContext(UserDataContext);

    function deleteHabit(id) {
        if (window.confirm("Você tem certeza que deseja deletar esse hábito?")) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            axios.delete(`${BASE_URL}/habits/${id}`, config)
                .then(() => setHabits(habits.filter(h => h.id != id)))
                .catch(err => alert(err.response.data.message));
        }
    }

    return (
        <ContainerHabit>
            <HabitName>{props.card.name}</HabitName>
            <ContainerDays>
                {days.map((d, i) => <Button key={i} id={i} selected={props.card.days.includes(i)}>{d}</Button>)}
            </ContainerDays>
            <DeleteButton>
                <TrashOutline
                    color={'#666666'}
                    title="delete"
                    height="17px"
                    width="17px"
                    onClick={() => deleteHabit(props.card.id)} />
            </DeleteButton>
        </ContainerHabit>

    );
}

const ContainerHabit = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 10px;
    position: relative;
`;

const HabitName = styled.h1`
    color: #666666;
    font-size: 18px;
    line-height: 22px;
    margin-top: 0px;
    margin-bottom: 10px;
`;

const ContainerDays = styled.div`
    display: flex;
`;

const Button = styled.button`
    width: 30px;
    height: 30px;
    color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.selected ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    font-size: 20px; 
    line-height: 25px;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;
