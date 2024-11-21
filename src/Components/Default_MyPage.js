import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setSelectedMenu } from '../store';
import Cookies from 'js-cookie';
import Default_Profile from "../Images/Default_Profile.svg";
import BrandProduct from "./BrandProduct";

export default function Default_MyPage() { // 기본 마이페이지

    const dispatch = useDispatch();
    const [nickname, setNickname] = useState(''); // 사용자 닉네임
    const [email, setEmail] = useState(''); // 사용자 이메일
    const [profileUrl, setProfileUrl] = useState(Default_Profile); // 사용자 프로필 URL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = Cookies.get("accessToken"); 

                const response = await axios.get('https://api.lim-it.one/api/v1/members/my-profile/basic', {
                    headers: {
                        Authorization: `Bearer ${accessToken}` 
                    }
                });

                const { nickname, email, profileUrl } = response.data;

                setNickname(nickname);
                setEmail(email);
                setProfileUrl(profileUrl ? profileUrl : Default_Profile);
            } catch (error) {
                console.error("조회중 에러발생 : ", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <Container> 
            <ProfileContainer> 
                <ProfileImage profileUrl = {profileUrl}/>
                <UserInfoContainer>
                    <UserInfo type = {"nickname"}>{nickname}</UserInfo>
                    <UserInfo type = {"email"}>{email}</UserInfo> 
                </UserInfoContainer>
                <ProfileModiBtn onClick = {() => dispatch(setSelectedMenu("modify_profile"))}>프로필 관리</ProfileModiBtn>
            </ProfileContainer>
            <Title>미개봉 구매 내역</Title>
            <ContentsBox type = {"Purchase"}>
                <Contents>
                    <div>전체</div>
                    <div>{1}</div>
                </Contents>
                <Vline type = {"Purchase"}/>
                <Contents>
                    <div>입찰중</div>
                    <div>{0}</div>
                </Contents>
                <Vline type = {"Purchase"}/>
                <Contents>
                    <div>구매 완료</div>
                    <div>{1}</div>
                </Contents>
            </ContentsBox>
            <Title>미개봉 판매 내역</Title>
            <ContentsBox>
                <Contents>
                    <div>전체</div>
                    <div>{0}</div>
                </Contents>
                <Vline/>
                <Contents>
                    <div>입찰중</div>
                    <div>{0}</div>
                </Contents>
                <Vline/>
                <Contents>
                    <div>판매 완료</div>
                    <div>{0}</div>
                </Contents>
            </ContentsBox>
        </Container>
    );
}

const Container = styled.div` // 최상위 부모컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ProfileContainer = styled.div` // 사용자 프로필 부모 컨테이너
    display: flex;
    width: 100%;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    margin-top: 55px;
    margin-bottom: 30px;

    @media (max-width: 800px) {
        margin-top: 25px;
        margin-bottom: 10px;
        height: 120px;
    }
`;

const ProfileImage = styled.div` // 사용자 프로필 이미지
    width: 120px;
    height: 120px;
    margin-top: 15px;
    margin-left: 30px;
    background-image: url(${props => props.profileUrl});
    background-size: cover;
    border-radius: 50%;

    @media (max-width: 800px) {
        width: 80px;
        height: 80px;
        margin-top: 20px;
        margin-left: 20px;
    }
`;

const UserInfoContainer = styled.div` // 사용자 정보 컨테이너
    margin-left: 50px;
    margin-top: 50px;

    @media (max-width: 800px) {
        margin-left: 20px;
        margin-top: 40px;
    }
`;

const UserInfo = styled.div` // 사용자 닉네임 & 이메일 정보
    font-size: ${props => props.type === "nickname" ? "20px" : "15px"};
    font-weight: ${props => props.type === "nickname" ? "bold" : "normal"};
    color: ${props => props.type === "email" ? "#A3A3A3" : "black"};
    text-decoration: ${props => props.type === "email" ? "underline" : "none"};

    @media (max-width: 800px) {
        font-size: ${props => props.type === "nickname" ? "15px" : "12.5px"};
    }
`;

const ProfileModiBtn = styled.div` // 프로필 수정 페이지 이동 버튼
    width: 120px;
    height: 50px;
    background-color: #D9D9D9;
    border-radius: 10px;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    font-weight: bold;
    margin: 20px 20px 0 auto;
    cursor: pointer;

    @media (max-width: 800px) {
        width: 70px;
        height: 35px;
        line-height: 35px;
        font-size: 10px;
        margin: 10px 10px 0 auto;
    }
`;

const Title = styled.div` // 제목 컴포넌트
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 17.5px;
    font-weight: bold;

    @media (max-width: 800px) {
        font-size: 15px;
    }
`;

const ContentsBox = styled.div` // 컨텐츠 부모 박스 
    display: flex;
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background-color: ${props => props.type === "Purchase" ? "#F7ECD1" : "#DBE9F2"};

    @media (max-width: 800px) {
        height: 120px;
    }
`;

const Contents = styled.div` // 박스 내부 컨텐츠 컴포넌트
    display: flex;
    flex-direction: column;
    width: 33%;
    height: 150px;
    font-size: 15px;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        height: 120px;
        font-size: 12.5px;
    }
`;

const Vline = styled.div` // 구분선 컴포넌트
    width: 1px;
    height: 100px;
    margin-top: 25px;
    background-color: ${props => props.type === "Purchase" ? "#FCD672" : "#37A5DE"};

    @media (max-width: 800px) {
        height: 80px;
        margin-top: 20px;
    }
`;

const UsedProductBox = styled.div` // 중고 상품 컨테이너 박스
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;

    @media (max-width: 800px) {
        height: 120px;
    }
`;

const UsedContents = styled.div` // 중고 상품 컨텐츠 컴포넌트
    display: flex;
    flex-direction: column;
    width: 47.5%;
    height: 150px;
    border-radius: 15px;
    font-size: 15px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.type === "Purchase" ? "#F7ECD1" : "#DBE9F2"};

    @media (max-width: 800px) {
        height: 120px;
        font-size: 12.5px;
    }
`;

const DipsContainer = styled.div` // 사용자 찜상품 컨테이너
    display: flex;
    width: 100%;
    height: 200px;
`;