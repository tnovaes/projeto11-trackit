import logo from "../assets/images/logo.svg"
import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/constants/urls"
import { UserDataContext } from "../assets/contexts/userDataContext";
import { ThreeDots } from 'react-loader-spinner'

export default function LoginPage() {
    const { setToken, setProfilePic, setLoginStatus } = useContext(UserDataContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loginButton, setLoginButton] = useState("Entrar")
    const [disableButton, setDisableButton] = useState(true);
    const [disableInput, setDisableInput] = useState(false);



    useEffect(() => {
        if (form.email && form.password) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [form])

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function login(e) {
        e.preventDefault();
        setLoginButton(<ThreeDots color="#FFFFFF"/>);
        setDisableButton(true);
        setDisableInput(true);

        axios.post(`${BASE_URL}/auth/login`, form)
            .then(res => {
                setLoginStatus(true);
                setToken(res.data.token);
                setProfilePic(res.data.image);
                navigate("/hoje");
            })
            .catch(err => {
                alert(err.response.data.message);
                setDisableInput(false);
                setDisableButton(false);
                setLoginButton("Entrar");
            });
    }

    return (
        <>
            <LoginContainer>
                <img src={logo} alt="logo"></img>
                <CredentialContainer onSubmit={login}>
                    <input
                        data-test="email-input"
                        placeholder=" email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleForm}
                        disabled={disableInput}
                        required>
                    </input>
                    <input
                        data-test="password-input"
                        placeholder=" senha"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleForm}
                        disabled={disableInput}
                        required>
                    </input>
                    <button data-test="login-btn" type="submit" disabled={disableButton}>{loginButton}</button>
                </CredentialContainer>
                <Link to={`/cadastro`} data-test="signup-link">
                    <SignUpCall>
                        Não tem uma conta? Cadastre-se!
                    </SignUpCall>
                </Link>
                
            </LoginContainer>
        </>

    );

}

const LoginContainer = styled.div`
    height:100vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    background: #FFFFFF;
    img {
        margin-top:68px;
    }
    
`

const CredentialContainer = styled.form`
    display:flex;
    flex-direction: column;
    margin-top:32px;
        input{
            width: 303px;
            height: 45px;
            font-size: 19.976px;
            line-height: 25px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            margin-bottom:6px;
        }
        input:disabled {
            color:#AFAFAF;
            background: #D4D4D4;
        }
        button{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 303px;
            height: 45px;
            color: #FFFFFF;
            background: #52B6FF;
            border: none;
            border-radius: 4.63636px;
            font-size: 20.976px;
            line-height: 26px;
            text-align: center;
        }
        button:disabled {
            background: #dddddd;
        }
`

const SignUpCall = styled.div`
    margin-top:25px;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`

