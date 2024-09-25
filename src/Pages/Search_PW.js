import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search_PW() {

    const [userEmail, setUserEmail] = useState(""); // 사용자 이메일

    return (
        <div style = {{width: "100%"}}>
            <SearchBox>
                <Title>비밀번호 찾기</Title>
                <Line/>
                <Explanation>
                    가입 시 등록한 이메일을 입력하시면 이메일로 임시 비밀번호를 발급해드립니다.
                </Explanation>
                <SubTitle>이메일</SubTitle>
                <InputField placeholder = "예) limit@limit.com"></InputField>
                <SubmitButton>이메일 발송하기</SubmitButton>
                <LoginLink to = "/login">로그인페이지로 이동</LoginLink>
            </SearchBox>
        </div>
    );
}

const SearchBox = styled.div` // PW찾기 컨테이너
    display: flex;
    flex-direction: column;
    width: 450px;
    margin: 100px auto;

    @media (min-width: 500px) and (max-width: 600px) {
        width: 400px;
    }

    @media (max-width: 500px) {
        width: 250px;
    }
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;

    @media (max-width: 500px) {
        font-size: 25px;
    }
`;

const Line = styled.div` // 구분선
    width: 100%;
    border: 2px solid black;
`;

const Explanation = styled.div` // 안내 텍스트
    margin-top: 30px;
    font-size: 12.5px;
`;

const SubTitle = styled.div` // 소제목 컴포넌트
    font-size: 20px;
    font-weight: bold;
    margin-top: 60px;

    @media (max-width: 500px) {
        font-size: 15px;
    }
`;

const InputField = styled.input` // 사용자 입력 필드
    width: 100%;
    font-size: 15px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;  
    margin-top: 10px;
    padding: 5px;

    @media (max-width: 500px) {
        font-size: 12.5px;
    }
`;

const SubmitButton = styled.div` // 전송 버튼 컴포넌트
    width: 100%;
    height: 60px;
    margin-top: 60px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    color: white;
    background-color: #979797;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
`;

const LoginLink = styled(Link)` // 로그인페이지 링크
    color: #6d6d6d;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    margin-top: 30px;
`;