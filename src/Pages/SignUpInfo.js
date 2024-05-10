import styled from 'styled-components';
import axios from 'axios';
import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

export default function SignUpInfo() {

    const location = useLocation(); // useLocation 훅
    //const certificationToken = location.state.certificationToken; // 인증토큰 값

    const [phoneNumber, setPhoneNumber] = useState(""); // 사용자 휴대전화 번호
    const [nickname, setNickname] = useState(""); // 사용자 닉네임
    const [email, setEmail] = useState(""); // 사용자 이메일
    const [password, setPassword] = useState(""); // 사용자 패스워드
    const [gender, setGender] = useState(""); // 사용자 성별

    const UserInfoSignUp = async () => { // 사용자 회원가입 메서드
        try {
            const response = await axios.post("https://api.lim-it.one/api/v1/auth/signup", {
                phoneNumber,
                nickname,
                email,
                password,
                gender,
                //certificationToken,
            });
        } catch (error) {
          
        }
    };

    return (
        <Container>

        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;