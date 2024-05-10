import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Certification() { 

    const location = useLocation(); // useLocation 훅
    const navigate = useNavigate(); // 페이지 이동 훅
    const [responseMessage, setResponseMessage] = useState(""); // 서버 응답 메시지
    const [linkPath, setLinkPath] = useState("/sign-up-info"); // 링크 경로 상태
    const [linkText, setLinkText] = useState("회원가입 정보입력 페이지로 이동"); // 링크 텍스트 상태
    const [certificationToken, setCertificationToken] = useState(""); // 인증토큰값
    const [email, setEmail] = useState(""); // 사용자 이메일

    useEffect(() => { // url 쿼리 파라미터 파싱
        const searchParams = new URLSearchParams(location.search);
        setEmail(searchParams.get("email"));
        setCertificationToken(searchParams.get("certificationToken"));
    }, [location.search]);

    useEffect(() => { // 이메일 인증
        if (certificationToken && email) {
            const CertificationEmail = async () => {
                try {
                    const response = await axios.post("https://api.lim-it.one/api/v1/auth/cert/email/verify", { certificationToken, email });

                    if (response.status === 200) {
                        setResponseMessage("인증이 성공적으로 완료되었습니다.\n아래의 링크를 통해 추가적인 회원가입정보를 입력해주십시오.");
                    }
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        setResponseMessage("인증을 실패하였습니다.\n다시 회원가입 페이지로 이동하셔서 이메일을 전송해주십시오.");
                        setLinkPath("/sign-up");
                        setLinkText("회원가입 페이지로 이동");
                    } 
                }
            };
            CertificationEmail();
        }
    }, [certificationToken, email]);

    const PageLink = () => { // 페이지 이동 링크 메서드
        if (linkPath === "/sign-up-info") {
            navigate(linkPath, {state : {certificationToken}}); // 회원가입 정보입력 페이지로 이동할 때만 certificationToken값 전달
        } else {
            navigate(linkPath); 
        }
    };

    return (
        <Container>
            <ResponseText>{responseMessage}</ResponseText>
            <LinkBox onClick = {PageLink}>{linkText}</LinkBox>
        </Container>
    );
}

const Container = styled.div` // 최상위 부모 컴포넌트
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 100px;
`;

const ResponseText = styled.div` // 서버응답 메세지 컴포넌트
    width: 50%;
    font-size: 20px;
    font-weight: bold;
    white-space: pre-wrap;
    text-align: center;

    @media (max-width: 1150px) {
        font-size: 17.5px;
        width: 80%;
    }

    @media (max-width: 600px) {
        font-size: 15px;
        width: 90%;
    }
`;

const LinkBox = styled.div` // 링크 컴포넌트
    color: #6d6d6d;
    margin-top: 50px;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
`;