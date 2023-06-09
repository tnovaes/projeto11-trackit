import styled from "styled-components"
import { UserDataContext } from "../contexts/userDataContext";
import { useContext } from "react";

export default function Header() {
    const { profilePic } = useContext(UserDataContext);

    return (
        <ContainerHeader data-test="header">
            <Logo>TrackIt</Logo>
            <ProfilePic src={profilePic} alt="Foto de perfil"></ProfilePic>
        </ContainerHeader>
    );
}

const ContainerHeader = styled.div`
    width:100vw;
    height: 70px;
    padding:0 18px;
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

const Logo = styled.p`
    width:97px;
    height:49px;
    font-family: 'Playball';
    font-size: 39px;
    line-height: 49px;
    color:#FFFFFF;
`

const ProfilePic = styled.img`
    width: 51px;
    height:51px;
    border-radius: 98.5px;
`