import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        background-color:#F2F2F2;
    }
`

export default GlobalStyle;