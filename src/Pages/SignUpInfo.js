import styled from 'styled-components';
import axios from 'axios';
import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setPhoneNumber, setNickname, setPassword, setCheckPW, setGender, setPwValid, setEmail,
         setPwInvalid, setPwTouched, setPwConfirmTouched, setNicknameValid, setMemberId } from '../store';

export default function SignUpInfo() { // 사용자 회원가입 상세정보 입력 페이지

    const location = useLocation(); // useLocation 훅
    const navigate = useNavigate(); // 페이지 이동 훅
    const certificationToken = location.state.certificationToken; // 인증토큰 값
    const email = location.state.email; // 이메일 값

    const dispatch = useDispatch();
    const { phoneNumber, nickname, password, checkPW, gender, pwValid, 
            pwInvalid, pwTouched, pwConfirmTouched, nickNameValid } = useSelector((state) => state.signUpInfo);

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
        if (nickname === "") {
            Swal.fire({
                icon: "error",
                text: "닉네임을 입력해 주세요."
            });
            return;
        }
        if (!nickNameValid) {
            Swal.fire({
                icon: "error",
                text: "중복된 닉네임 입니다."
            });
            return;
        }
        if (gender !== "남성" && gender !== "여성") { 
            Swal.fire({
                icon: "error",
                text: "성별을 선택해 주세요."
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
      
            dispatch(setMemberId(response.data.id));
            console.log(response.data.id);
            dispatch(setEmail(email));
            console.log(email);
            dispatch(setNickname(nickname));
            console.log(nickname);

            navigate("/sign-up-complete"); 
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "회원가입 실패",
                text: "회원가입중에 오류가 발생하였습니다. 다시 시도해주십시오."
            });
        }
    };

    const checkNickname = async (nickname) => { //닉네임 중복확인 메서드
        try {
            const response = await axios.get("https://api.lim-it.one/api/v1/auth/signup/nickname-check", {
                params: {
                    nickname: encodeURIComponent(nickname) 
                }
            });

            if (response.data.duplicated) {
                dispatch(setNicknameValid(false));
                Swal.fire({
                    icon: "error",
                    title: "중복된 닉네임",
                    text: "이미 사용중인 닉네임입니다."
                });
            } else {
                dispatch(setNicknameValid(true));
                Swal.fire({
                    icon: "success",
                    title: "사용가능한 닉네임",
                    text: "사용가능한 닉네임입니다."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "통신 오류",
                text: "닉네임 중복 확인 중 오류가 발생하였습니다."
            });
        }
    };    

    const pwCheck = (e) => { // 패스워드 검사 메서드
        const newPassword = e.target.value;
        dispatch(setPassword(newPassword));
        const isValid = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/.test(newPassword);
        dispatch(setPwValid(isValid));
        dispatch(setPwInvalid(newPassword !== checkPW && pwConfirmTouched));
        dispatch(setPwTouched(true));
    };

    const pwConfirmCheck = (e) => { // 패스워드 확인 검사 메서드 
        const newCheckPW = e.target.value;
        dispatch(setCheckPW(newCheckPW));
        dispatch(setPwInvalid(newCheckPW !== password && pwTouched));
        dispatch(setPwConfirmTouched(true)); 
    };

    const phoneNumberChange = (e) => { // 사용자 휴대폰 번호 입력제한 메서드
        const { value } = e.target;
        const onlyNums = value.replace(/[^\d]/g, '');

        if (onlyNums.length <= 3) {
            dispatch(setPhoneNumber(onlyNums));
        } else if (onlyNums.length <= 7) {
            dispatch(setPhoneNumber(`${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`));
        } else if (onlyNums.length <= 11) {
            dispatch(setPhoneNumber(`${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`));
        }
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
                <InputField2 placeholder = "닉네임" value = {nickname} onChange = {(e) => dispatch(setNickname(e.target.value))}/>
                <SubmitButton onClick = {checkNickname}>중복 확인</SubmitButton>
            </Box>
            <Box>
                <InputField2 placeholder = "휴대전화 번호" value = {phoneNumber} type = "tel" onChange = {phoneNumberChange}/>
                <SubmitButton>인증번호 발송</SubmitButton>
            </Box>
            <Box>
                <InputField2 placeholder = "인증번호를 입력하세요"/>
                <SubmitButton>인증번호 확인</SubmitButton>
            </Box>
            <CheckBox>
                <CheckButton active = {gender === "남성"} onClick = {() => dispatch(setGender("남성"))}>남자</CheckButton>
                <CheckButton active = {gender === "여성"} onClick = {() => dispatch(setGender("여성"))}>여자</CheckButton>
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