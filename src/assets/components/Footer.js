import styled from "styled-components"
import { UserDataContext } from "../contexts/userDataContext";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Footer() {
    const { progress } = useContext(UserDataContext);

    return (
        <NavFooter>
            <p>
                Hábitos
            </p>
            <ProgressCircle>
                <CircularProgressbar
                    value={44}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                        textSize: "18px",
                        strokeLinecap: "round"
                        
                    })}
                />
            </ProgressCircle>
            <p>
                Histórico
            </p>
        </NavFooter>
    );
}

const NavFooter = styled.div`
    width: 100vw;
    height:70px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 36px;
    background-color: #FFFFFF;

    position: absolute;
    bottom:0;
    left:0;
    z-index: 1;
    
    p {
        color:#52B6FF;
        font-size:18px;
    }
`

const ProgressCircle = styled.div`
    width:91px;
    height:91px;
    text-align: center;
    position: relative;
    bottom:20px;
`