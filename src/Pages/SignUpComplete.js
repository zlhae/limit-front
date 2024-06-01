import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function SignUp() {
    return (
        <Container>
            <Title>회원가입이 완료되었습니다.</Title>
            <LoginPageLink to = "/login">로그인페이지로 이동</LoginPageLink>
        </Container>
    );
}

const Container = styled.div` // 최상위 컨테이너
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

const LoginPageLink = styled(Link)` // 로그인페이지 링크
    font-size: 15px;
    text-align: center;
    color: #6d6d6d;

    @media (max-width: 500px) {
        font-size: 12.5px; 
    }
`;