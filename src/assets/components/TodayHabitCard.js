import styled from "styled-components";
import { useContext, useState } from "react";
import { UserDataContext } from "../contexts/userDataContext.js";
import axios from "axios";
import { BASE_URL } from "../constants/urls.js"
import { Checkbox } from 'react-ionicons'

export default function TodayHabitCard({ id, name, done, currentSequence, highestSequence }) {
    const { token, completedHabits, setCompletedHabits } = useContext(UserDataContext);
    const [doneHabit, setDoneHabit] = useState(done);
    const [sequence, setSequence] = useState({ done, currentSequence })

    function checkHabit(id, done) {
        console.log(id, done);
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        if (done === false) {
            axios.post(`${BASE_URL}/habits/${id}/check`, {}, config)
                .then(() => {
                    setSequence({ done: true, currentSequence: currentSequence + 1 });
                    setCompletedHabits([...completedHabits, id]);
                    setDoneHabit(true);
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
        else {
            axios.post(`${BASE_URL}/habits/${id}/uncheck`, {}, config)
                .then(() => {
                    setSequence({ done: true, currentSequence: currentSequence - 1 });
                    setCompletedHabits(completedHabits.filter(h => h !== id));
                    setDoneHabit(false);
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        }
    }
    return (
        <TodayHabitCardContainer data-test="today-habit-container">
            <CardContainer>
                <HabitName data-test="today-habit-name">{name}</HabitName>
                <SequenceContainer>
                    <Sequence >Sequência atual:
                        <SequenceSpan data-test="today-habit-sequence" check={done}>
                            {` ${sequence.currentSequence} ${sequence.currentSequence !== 1 ? "dias" : "dia"}`}
                        </SequenceSpan>
                    </Sequence>
                    <Sequence data-test="today-habit-record">Seu recorde:
                        <SequenceSpan check={currentSequence === sequence.currentSequence ? sequence.currentSequence !== 0 : false}>
                            {` ${highestSequence} ${highestSequence !== 1 ? "dias" : "dia"}`}</SequenceSpan>
                    </Sequence>
                </SequenceContainer>
            </CardContainer>
            <CheckButton data-test="today-habit-check-btn" onClick={() => checkHabit(id, done, doneHabit)} check={doneHabit}>
                <Checkbox 
                    color={done ? "#8FC549" : "#EBEBEB"}
                    height="69px"
                    width="69px" />
            </CheckButton>
        </TodayHabitCardContainer>
    )
}

const TodayHabitCardContainer = styled.div`
    width: 340px;
    height: 94px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666666;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
`

const CardContainer = styled.div`
    width:100%;
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const HabitName = styled.p`
    font-size: 20px;
    line-height: 25px;
  
`

const SequenceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Sequence = styled.p`
    font-size: 13px;
    line-height: 16px;
`

const SequenceSpan = styled.span`
    color: ${props => props.check ? "#8FC549" : "#666666"};
`

const CheckButton = styled.button`
    background-color: transparent;
    border:none;
    border-radius: 5px;
    cursor: pointer;

    
`
