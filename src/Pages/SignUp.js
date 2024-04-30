import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function SignUp() {
    return (
        <div style = {{width: "100%"}}>
            <SignUpBox>
                <Title>회원가입</Title>
                <EmailBox>
                    <InputField placeholder = "이메일을 입력해주세요."/>
                    <SubmitButton>전송</SubmitButton>
                </EmailBox>
                <SuscessMessage>
                    이메일 발송이 완료되었습니다. <br/>
                    발송된 이메일의 링크로 이동하셔서 회원가입을 완료해주세요.
                </SuscessMessage>
                <LoginPageLink to = {"/login"}>로그인 화면으로 이동</LoginPageLink>
            </SignUpBox>
        </div>
    );
}

const SignUpBox = styled.div` // 회원가입 컨테이너
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
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

const EmailBox = styled.div` // 이메일 컨테이너
    display: flex;
    width: 100%;
    height: 35px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #909090;
    background-color: white;
    
    @media (max-width: 500px) {
        height: 25px; 
    }
`;

const InputField = styled.input` // 사용자 이메일 입력 필드
    width: 80%;
    font-size: 15px; 
    border: none;

    @media (max-width: 500px) {
        font-size: 12.5px; 
    }
`;

const SubmitButton = styled.div` // 이메일 전송 버튼
    width: 15%;
    height: 35px;
    font-size: 12.5px;
    color: #888888;
    margin-left: 5%;
    background-color: #D9D9D9;
    border-radius: 5px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;

    @media (max-width: 500px) {
        height: 25px; 
        line-height: 25px;
        font-size: 10px;
    }
`;

const SuscessMessage = styled.div` // 이메일 전송 성공메세지
    font-size: 15px;
    text-align: center;
    margin-top: 30px;

    @media (max-width: 500px) {
        font-size: 12.5px; 
    }
`;

const LoginPageLink = styled(Link)` // 로그인페이지 링크
    font-size: 15px;
    text-align: center;
    margin-top: 30px;
    color: #6d6d6d;

    @media (max-width: 500px) {
        font-size: 12.5px; 
    }
`;