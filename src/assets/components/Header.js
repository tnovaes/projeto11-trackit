import styled from "styled-components"
import logo from "../images/simple-logo.svg"
import { UserDataContext } from "../contexts/userDataContext";
import { useContext } from "react";

export default function Header() {
    const { profilePic } = useContext(UserDataContext);

    return (
        <ContainerHeader>
            <Logo src={logo} alt="Logo"></Logo>
            <ProfilePic src={profilePic} alt="Foto de perfil"></ProfilePic>
        </ContainerHeader>
    );
}

const ContainerHeader = styled.div`
    width:100vw;
    height: 70px;
    padding:16px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

const Logo = styled.img`
    width:97px;
    height:49px;
`

const ProfilePic = styled.img`
    width: 51px;
    height:51px;
    border-radius: 98.5px;
`