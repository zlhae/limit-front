import styled from 'styled-components';
import axios from 'axios';
import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

export default function SignUpInfo() {

    const location = useLocation(); // useLocation 훅
    const navigate = useNavigate(); // 페이지 이동 훅
    const certificationToken = location.state.certificationToken; // 인증토큰 값
    const email = location.state.email; // 이메일 값

    const [phoneNumber, setPhoneNumber] = useState(""); // 사용자 휴대전화 번호
    const [nickname, setNickname] = useState(""); // 사용자 닉네임
    const [password, setPassword] = useState(""); // 사용자 패스워드
    const [checkPW, setCheckPW] = useState(""); // 사용자 패스워드 확인
    const [pwInvalid, setPwInvalid] = useState(false); // 유효하지 않은 비밀번호
    const [pwValid, setPwValid] = useState(false); // 유효한 비밀번호
    const [pwTouched, setPwTouched] = useState(false); // 패스워드 입력여부
    const [pwConfirmTouched, setPwConfirmTouched] = useState(false); // 패스워드 확인 입력여부
    const [gender, setGender] = useState(""); // 사용자 성별

    const UserInfoSignUp = async () => { // 사용자 회원가입 메서드
        if (password !== checkPW) {
            setPwInvalid(true);
            Swal.fire({
                icon: "error",
                title: "패스워드 불일치",
                text: "패스워드와 패스워드확인의 암호가 일치하지 않습니다."
            });
            return;
        }
        if (!password.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/)) {
            setPwValid(false);
            Swal.fire({
                icon: "error",
                title: "패스워드 조건 미충족",
                text: "패스워드는 최소 8자 이상이어야 하며, 숫자, 문자, 특수문자를 하나씩 포함해야 합니다."
            });
            return;
        }
        try {
            const response = await axios.post("https://api.lim-it.one/api/v1/auth/signup", {
                phoneNumber,
                nickname,
                password,
                gender,
                email,
                certificationToken
            });

            if (response.status === 200) {
                navigate("/sign-up-complete"); 
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "회원가입 실패",
                text: "회원가입중에 오류가 발생하였습니다. 다시 시도해주십시오."
            });
        }
    };

    const pwCheck = (e) => { // 패스워드 검사 메서드
        const newPassword = e.target.value;
        setPassword(newPassword); 
        setPwInvalid(newPassword !== checkPW && pwConfirmTouched);
        setPwValid(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/g.test(newPassword));
        setPwTouched(true);
    };

    const pwConfirmCheck = (e) => { // 패스워드 확인 검사 메서드
        const newCheckPW = e.target.value;
        setCheckPW(newCheckPW); 
        setPwInvalid(newCheckPW !== password && pwTouched); 
        setPwConfirmTouched(true); 
    };

    return (
        <Container>
            <Title>회원가입</Title>
            <InputField value = {email} readOnly/>

            <InputField placeholder = "비밀번호" value = {password} onChange = {pwCheck} type = "password"/>
            {pwTouched && 
                <GuideMessage color = {pwValid ? "#17B75E" : "#F4361E"}>
                    {pwValid ? "올바른 패스워드 형식입니다" : "암호는 반드시 영문, 숫자, 특수문자등을 하나씩 포함한 8자이상 이여야 합니다."}
                </GuideMessage>
            }

            <InputField placeholder = "비밀번호 확인" value = {checkPW} onChange = {pwConfirmCheck} type = "password"/>
            {pwConfirmTouched && pwValid && 
                <GuideMessage color = {checkPW === password ? "#17B75E" : "#F4361E"}>
                    {checkPW === password ? "패스워드와 일치합니다." : "패스워드가 일치하지 않습니다."}
                </GuideMessage>
            }
            <Box>
                <InputField2 placeholder = "닉네임" value = {nickname} onChange = {(e) => setNickname(e.target.value)}/>
                <SubmitButton>중복 확인</SubmitButton>
            </Box>
            <Box>
                <InputField2 placeholder = "휴대전화 번호" value = {phoneNumber} onChange = {(e) => setPhoneNumber(e.target.value)}/>
                <SubmitButton>인증번호 발송</SubmitButton>
            </Box>
            <Box>
                <InputField2 placeholder = "인증번호를 입력하세요"/>
                <SubmitButton>인증번호 확인</SubmitButton>
            </Box>
            <CheckBox>
                <CheckButton active = {gender === "남성"} onClick = {() => setGender("남성")}>남자</CheckButton>
                <CheckButton active = {gender === "여성"} onClick = {() => setGender("여성")}>여자</CheckButton>
            </CheckBox>
            <SaveButton onClick = {UserInfoSignUp}>회원가입 완료</SaveButton>
        </Container>
    );
}

const Container = styled.div` // 최상위 컨테이너
    display: flex;
    flex-direction: column;
    width: 25%;
    margin: 100px auto;

    @media (min-width: 1300px) and (max-width: 1500px) {
        width: 30%;
    }

    @media (min-width: 1000px) and (max-width: 1300px) {
        width: 40%;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        width: 50%;
    }

    @media (min-width: 650px) and (max-width: 800px) {
        width: 60%;
    }

    @media (min-width: 550px) and (max-width: 650px) {
        width: 70%;
    }

    @media (max-width: 550px) {
        width: 90%;
    }
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

const InputField = styled.input` // 사용자 입력 필드
    width: 100%;
    height: 30px;
    font-size: 15px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 0px 10px 5px;
    margin-top: 20px;
`;

const Box = styled.div` // 사용자 입력필드 컨테이너
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

const InputField2 = styled.input` // 사용자 입력 필드 2
    width: 70%;
    height: 30px;
    font-size: 15px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    margin-right: 5%;
`;

const SubmitButton = styled.div` // 전송 버튼 컴포넌트
    width: 25%;
    height: 30px;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    color: white;
    background-color: #D9D9D9;
    text-align: center;
    line-height: 30px;
    cursor: pointer;

    @media (max-width: 550px) {
        font-size: 12.5px;
    }

    &:hover {
        background-color: #BFBFBF;
    }
`;

const CheckBox = styled.div` // 성별 선택 박스 컨테이너
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    margin-top: 20px;
`;

const CheckButton = styled.div`
    width: 45%;
    height: 100%;
    border: 1px solid #D9D9D9;
    border-radius: 15px;
    font-size: 15px;
    color: ${props => props.active ? "black" : "#979797"};
    background-color: white;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border-color: ${props => props.active ? "black" : "#D9D9D9"};
`;

const SaveButton = styled.div` // 회원가입 완료 버튼
    width: 100%;
    height: 50px;
    border-radius: 5px;
    font-size: 15px;
    color: white;
    background-color: #CEE3F0;
    margin-top: 20px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;

    &:hover {
        background-color: #1B6EF3;
    }
`;

const GuideMessage = styled.div` // 사용자 입력 가이드 메세지
    color: ${props => props.color};
    font-size: 12.5px;
    margin-top: 5px;
`;