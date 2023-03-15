import styled from "styled-components"
import Menu from "../assets/components/Menu";
import Header from "../assets/components/Header";

export default function TodayPage(){
    return(
        <>
        <Header data-test="header"></Header>
        <Menu data-test="menu"></Menu>
        </>
    );
}