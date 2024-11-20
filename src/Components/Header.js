import styled from 'styled-components';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { login, logout } from '../store'; 
import Logo from '../Images/limit-logo.svg';
import ChattingIcon from '../Images/chatting-icon.svg';
import SearchIcon from '../Images/search-icon.svg'

const Header = () => { // 헤더

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // 로그인 상태 

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            dispatch(login({ isLoggedIn: true, id: "", password: "" }));
        }
    }, [isLoggedIn]);

    const handleLogout = () => { // 로그아웃
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(logout()); 
        window.location.href = "/";
    };

    return(
        <HeaderContainer>
            <HeaderTop>
                <HeaderTopList>
                    <HeaderTopItem><HeaderTopItemLink to = {"/cs-center"}>고객센터</HeaderTopItemLink></HeaderTopItem>
                    <HeaderTopItem><HeaderTopItemLink to = {"/my-page"}>마이페이지</HeaderTopItemLink></HeaderTopItem>
                    <HeaderTopItem>
                        {isLoggedIn ? (<HeaderLoggedIn onClick = {handleLogout}>로그아웃</HeaderLoggedIn>) : (
                            <HeaderTopItemLink to = "/login">로그인</HeaderTopItemLink>)}
                    </HeaderTopItem>
                </HeaderTopList>
            </HeaderTop>
            <HeaderMain>
                <Link to = {"/"}><img alt="limit-logo" src = {Logo}></img></Link>
                <div className = "header-bnt-area">
                    <Link to = {"/chatting"}><IconImg alt = 'chatting-icon' src = {ChattingIcon}></IconImg></Link>
                    <Link to = {"/search"}><IconImg alt = 'search-icon' src = {SearchIcon}></IconImg></Link>
                </div>
            </HeaderMain>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 85px;
    background-color: #ffffff;
    position: sticky;
`
const HeaderTop = styled.div`
    display: flex;
    height: 30px;
    padding: 0px 10%;

    @media (max-width: 600px) {
        padding: 0px 5%;
    }
`

const HeaderTopList = styled.ul`
    list-style: none;
    align-items: center;
    display: flex;
    margin-left: auto;
`

const HeaderTopItem = styled.li`
    list-style: none;
    margin-left: 10px;
    font-size: 12px;
`
const HeaderTopItemLink = styled(Link)`
    color: #979797;
    text-decoration: none;
`

const HeaderLoggedIn = styled(Link)`
    color: #979797;
    text-decoration: none;
`;

const HeaderMain = styled.div`
    padding: 0px 10%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
        padding: 0px 5%;
    }
`

const IconImg = styled.img`
    height: 25px;
    margin-left: 10px;
`

export default Header;