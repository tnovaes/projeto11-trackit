import styled from "styled-components"
import { UserDataContext } from "../contexts/userDataContext";
import { useContext } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Link } from "react-router-dom";

export default function Menu() {
    const { progress } = useContext(UserDataContext);

    return (
        <ContainerMenu>
            <Link to={`/habitos`} data-test="habit-link">
                <p>
                    Hábitos
                </p>
            </Link>
            <Link to={`/hoje`} data-test="today-link">
                <ProgressCircle>
                    <CircularProgressbarWithChildren
                        value={100}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                            textSize: '18px',
                            strokeLinecap: "round"

                        })}>
                        <p>
                            Hoje
                        </p>
                    </CircularProgressbarWithChildren>
                </ProgressCircle>
            </Link>
            <Link to={`/historico`} data-test="history-link">
                <p>
                    Histórico
                </p>
            </Link>
        </ContainerMenu>
    );
}

const ContainerMenu = styled.div`
    width: 100vw;
    height:70px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 36px;
    background-color: #FFFFFF;

    position: absolute;
    bottom:0px;
    left:0px;
    z-index: 1;
    
    p {
        color:#52B6FF;
        font-size:18px;
        line-height: 22px;
    }

    a{
        text-decoration: none;
    }
`

const ProgressCircle = styled.div`
    width:91px;
    height:91px;
    text-align: center;
    position: relative;
    bottom:20px;
    p {
        color: #FFFFFF;
        transform: translateY(-20%);
    }
`