import logo from "../assets/images/logo.svg"
import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/constants/urls"
import { ThreeDots } from 'react-loader-spinner'

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", name: "", image: "", password: "" });
    const [signUpButton, setSignUpButton] = useState("Cadastrar")
    const [disableButton, setDisableButton] = useState(true);
    const [disableInput, setDisableInput] = useState(false);
    

    useEffect(() => {
        if (form.email && form.name && form.image && form.password) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [form])

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function signUp(e) {
        e.preventDefault();
        setSignUpButton(<ThreeDots color="#FFFFFF"/>);
        setDisableInput(true);
        setDisableButton(true);

        axios.post(`${BASE_URL}/auth/sign-up`, form)
            .then(res => {
                navigate("/")
            })
            .catch(err => {
                alert(err.response.data.message);
                setDisableInput(false);
                setDisableButton(false);
                setSignUpButton("Cadastrar");
            });
    }

    return (
        <>
            <SignUpContainer>
                <img src={logo} alt="logo"></img>
                <CredentialContainer onSubmit={signUp}>
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
                    <input
                        data-test="user-name-input"
                        placeholder=" nome"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleForm}
                        disabled={disableInput}
                        required>
                    </input>
                    <input
                        data-test="user-image-input"
                        placeholder=" foto"
                        type="url"
                        name="image"
                        value={form.image}
                        onChange={handleForm}
                        disabled={disableInput}
                        required>
                    </input>
                    <button data-test="signup-btn" type="submit" disabled={disableButton}>{signUpButton}</button>
                </CredentialContainer>
                <Link to={`/`} data-test="login-link">
                    <LoginCall>
                        Já tem uma conta? Faça login!
                    </LoginCall>
                </Link>
            </SignUpContainer>
        </>

    );

}

const SignUpContainer = styled.div`
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

const LoginCall = styled.div`
    margin-top:25px;
    margin-bottom: 97px;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`