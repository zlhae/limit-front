import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login=()=>{
    const [id, setId]=useState("");
    const [password, setPassword]=useState("");

    return(
        <div>
            <LoginTitle id='login-title'>로그인</LoginTitle>
            <EmailLoginContainer>  
                <EmailLoginInput
                    type="text"
                    placeholder="이메일"
                    onChange={(e)=>{setId(e.target.value)}}
                ></EmailLoginInput>
                <EmailLoginInput
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e)=>{setPassword(e.target.value)}}
                ></EmailLoginInput>
                <EmailLoginButton>이메일로 로그인하기</EmailLoginButton>
            </EmailLoginContainer>
            <LoginHr id='login-hr'></LoginHr>
            <OauthLoginContainer>
                <OauthLoginButton type={"naver"}>네이버로 로그인하기</OauthLoginButton>
                <OauthLoginButton type={"kakao"}>카카오로 로그인하기</OauthLoginButton>
                <OauthLoginButton type={"google"}>Google로 로그인하기</OauthLoginButton>
            </OauthLoginContainer>
            <SearchContainer>
                <SearchLink to={"/search-id"}>아이디 찾기</SearchLink>
                <SearchLink to={"/search-password"}>비밀번호 찾기</SearchLink>
            </SearchContainer>
            <GotoJoinContainer>
                <GotoJoinText>아직 계정이 없으신가요?</GotoJoinText>
                <GotoJoinLink to={"/search"}>회원가입으로 이동</GotoJoinLink>
            </GotoJoinContainer>
        </div>
    );
}

const LoginTitle=styled.h1`
    text-align: center;
    margin-bottom: 50px;
`

const EmailLoginContainer=styled.div`
    width: 452px;
    margin: 0 auto;
    margin-bottom: 30px;
`

const EmailLoginInput=styled.input`
    width: 440px; height: 50px;
    display: inline-block;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    margin-bottom: 15px;
    padding-left: 10px;
`

const EmailLoginButton=styled.button`
    width: 452px; height: 50px;
    display: inline-block;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    background-color: #979797;
    color: #ffffff;
`

const LoginHr=styled.hr`
    width: 450px;
    margin-bottom: 30px;
`

const OauthLoginContainer=styled.div`
    width: 452px;
    margin: 0 auto;
    margin-bottom: 30px;
`

const OauthLoginButton=styled.button`
    width: 452px; height: 50px;
    display: inline-block;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    margin-bottom: 15px;
    font-weight: bold;
    background-color: #ffffff;
    color: ${props => props.type === "naver" ? "#72dd60" : props.type === "kakao" ? "#ffc939" : "#72b8df"};
`

const SearchContainer=styled.div`
    width: 215px;
    margin: 0 auto;
`

const SearchLink=styled(Link)`
    color: #6d6d6d;
    font-weight: bold;
    font-size: 13px;
    text-decoration: none;
    margin: 0 15px;
`

const GotoJoinContainer=styled.div`
    width: 280px;
    margin: 0 auto;
`

const GotoJoinText=styled.p`
    color: #979797;
    font-size: 13px;
    display: inline-block;
    margin-right: 10px;
`

const GotoJoinLink=styled(Link)`
    color: #6d6d6d;
    font-weight: bold;
    font-size: 13px;
`

export default Login;