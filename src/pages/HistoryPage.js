import styled from "styled-components"
import Menu from "../assets/components/Menu";
import Header from "../assets/components/Header";

export default function HistoryPage(){
    return(
        <>
        <Header data-test="header"></Header>
        <ContainerHistory>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </ContainerHistory>
        <Menu data-test="menu"></Menu>
        </>
    );
}

const ContainerHistory = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:70px;
    padding: 22px 17px;
    h1{
        color: #126BA5;
        font-size: 23px;
    }
    p {
        margin-top: 17px;
        color: #666666;
        font-size: 18px;
        line-height: 22px;
    }
`