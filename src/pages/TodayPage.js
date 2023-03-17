import styled from "styled-components"
import Menu from "../assets/components/Menu";
import Header from "../assets/components/Header";
import { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../assets/contexts/userDataContext.js";
import dayjs from "dayjs";
import { weekdays } from "../assets/constants/days";
import axios from "axios";
import { BASE_URL } from "../assets/constants/urls";
import TodayHabitCard from "../assets/components/TodayHabitCard";


export default function TodayPage() {
    const { token, completedHabits, todayHabits, setTodayHabits } = useContext(UserDataContext);

    const [completed, setCompleted] = useState([]);
    const habitsDone = Math.floor((completed.length / todayHabits.length) * 100);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        axios.get(`${BASE_URL}/habits/today`, config)
            .then(res => {
                setCompleted(res.data.filter((d) => d.done = true))
                setTodayHabits(res.data);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })

    }, [completedHabits])


    return (
        <>
            <Header></Header>
            <ContainerPage>
                <DateContainer>
                    <Today data-test="today">
                        {weekdays[dayjs().day()]}, {dayjs().format("DD/MM")}
                    </Today>
                    <HabitsStatus data-test="today-counter" check={completed.length > 0}>
                        {completed.length > 0 ? `${habitsDone}% dos hábitos concluídos` : "Nenhum hábito concluido ainda"}
                    </HabitsStatus>
                </DateContainer>
                <div>
                    {todayHabits.map((t) => {
                        <TodayHabitCard
                            key={t.id}
                            id={t.id}
                            name={t.name}
                            done={t.done}
                            currentSequence={t.currentSequence}
                            highestSequence={t.highestSequence}
                        />
                    })}
                </div>
            </ContainerPage>
            <Menu></Menu>
        </>
    );
}

const ContainerPage = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 98px;
    margin-bottom: 110px;
    padding: 0 17px;
    p{
        color: #666666;
        margin-top:28px;
        font-size: 18px;
        line-height: 22px;
    }
`;

const DateContainer = styled.div`
  margin-bottom: 28px;
`;

const Today = styled.h1`
  width: 172px;
  height: 29px;
  font-size: 23px;
  line-height: 29px;
  color: #126BA5;
`

const HabitsStatus = styled.div`
    font-size: 18px;
    line-height: 22px;
    color:#8FC549;
`;
