import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, setTokens } from '../store'; 
import Cookies from 'js-cookie'; 

const Login = () => { // 로그인 페이지

    const dispatch = useDispatch();
    const id = useSelector((state) => state.auth.id); // 이메일 아이디
    const password = useSelector((state) => state.auth.password); // 패스워드

    const userLogin = async () => { // 사용자 로그인 메서드
        try {
            const response = await axios.post("https://api.lim-it.one/api/v1/auth/login", {
                email: id,
                password: password,
            });
            
            localStorage.setItem("userId", response.data.userId); // 회원 ID 저장
            localStorage.setItem("userPW", password); 

            window.location.href = "/"

            dispatch(login({ id: id, password: password })); 
            dispatch(setTokens({ 
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            }));

            Cookies.set("accessToken", response.data.accessToken); 
            Cookies.set("refreshToken", response.data.refreshToken); 

            setTimeout(() => {
                window.location.href = "/";
            }, 100); 

        } catch (error) {

        }
    };

    const EnterKey = (e) => { 
        if (e.key === "Enter") {
            userLogin();
        }
    };

    return(  
        <LoginContainer>
            <LoginTitle id = "login-title">로그인</LoginTitle>
            <EmailLoginContainer>  
                <EmailLoginInput
                    type = "text"
                    placeholder = "이메일"
                    onChange = {(e) => { dispatch(login({ id: e.target.value, password })); }}
                    onKeyDown = {EnterKey}
                ></EmailLoginInput>
                <EmailLoginInput
                    type = "password"
                    placeholder = "비밀번호"
                    onChange = {(e) => { dispatch(login({ id, password: e.target.value })); }}
                    onKeyDown = {EnterKey}
                ></EmailLoginInput>
                <EmailLoginButton onClick = {userLogin}>이메일로 로그인하기</EmailLoginButton>
            </EmailLoginContainer>
            <LoginHr id = "login-hr"></LoginHr>
            <OauthLoginContainer>
                <OauthLoginButton type = {"naver"}>네이버로 로그인하기</OauthLoginButton>
                <OauthLoginButton type = {"kakao"}>카카오로 로그인하기</OauthLoginButton>
                <OauthLoginButton type = {"google"}>Google로 로그인하기</OauthLoginButton>
            </OauthLoginContainer>
            <SearchContainer>
                <SearchLink to = {"/search-id"}>아이디 찾기</SearchLink>
                <SearchLink to = {"/search-pw"}>비밀번호 찾기</SearchLink>
            </SearchContainer>
            <GotoJoinContainer>
                <GotoJoinText>아직 계정이 없으신가요?</GotoJoinText>
                <GotoJoinLink to = {"/sign-up"}>회원가입으로 이동</GotoJoinLink>
            </GotoJoinContainer>
        </LoginContainer>
    );
}

const LoginContainer =styled.div`
    width: 450px;
    margin: 0 auto;
    margin-top: 50px;

    @media (max-width: 600px){
        width: 90%;
    }
`

const LoginTitle = styled.h1`
    text-align: center;
    margin-bottom: 50px;
    cursor: default;

    @media (max-width: 600px){
        font-size: 20px;
    }
`

const EmailLoginContainer = styled.div`
    width: 100%;
    margin-bottom: 30px;
`

const EmailLoginInput = styled.input`
    width: 100%; height: 50px;
    display: inline-block;
    border: none;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 0px;
    padding-left: 15px;
    box-sizing: border-box;
`

const EmailLoginButton = styled.button`
    width: 100%; height: 50px;
    display: inline-block;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    background-color: #979797;
    color: #ffffff;
    cursor: pointer;
`

const LoginHr = styled.hr`
    width: 100%;
    margin-bottom: 30px;
`

const OauthLoginContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
`

const OauthLoginButton = styled.button`
    width: 100%; height: 50px;
    display: inline-block;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    margin-bottom: 15px;
    font-weight: bold;
    background-color: #ffffff;
    cursor: pointer;
    color: ${props => props.type === "naver" ? "#72dd60" : props.type === "kakao" ? "#ffc939" : "#72b8df"};
`

const SearchContainer = styled.div`
    width: 180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`

const SearchLink = styled(Link)`
    color: #6d6d6d;
    font-weight: bold;
    font-size: 13px;
    text-decoration: none;
`

const GotoJoinContainer = styled.div`
    width: 270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`

const GotoJoinText = styled.p`
    color: #979797;
    font-size: 13px;
    display: inline-block;
    margin: 0px;
    margin-right: 10px;
    cursor: default;
`

const GotoJoinLink = styled(Link)`
    color: #6d6d6d;
    font-weight: bold;
    font-size: 13px;
`

export default Login;