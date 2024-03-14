import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Default_Profile from "../Images/Default_Profile.svg";

export default function Default_MyPage() {
    return (
        <>
            <ProfileContainer>
                <ProfileImage/>
                <UserInfoContainer>
                    <UserInfo type = {"nickname"}>리밋</UserInfo>
                    <UserInfo type = {"email"}>limit@gmail.com</UserInfo>
                </UserInfoContainer>
                <ProfileModiBtn>프로필 관리</ProfileModiBtn>
            </ProfileContainer>
            <Title>미개봉 구매 내역</Title>
            <ContentsBox type = {"Purchase"}>
                <Contents>
                    <div>전체</div>
                    <div>{0}</div>
                </Contents>
                <Vline type = {"Purchase"}/>
                <Contents>
                    <div>입찰중</div>
                    <div>{0}</div>
                </Contents>
                <Vline type = {"Purchase"}/>
                <Contents>
                    <div>구매 완료</div>
                    <div>{0}</div>
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
            <Title>중고 거래 내역</Title>
            <UsedProductBox>
                <UsedContents type = {"Purchase"}>
                    <div>구매</div>
                    <div>{0}</div>
                </UsedContents>
                <UsedContents>
                    <div>판매</div>
                    <div>{0}</div>
                </UsedContents>
            </UsedProductBox>
            <Title>관심 상품 목록</Title>
        </>
    );
}

const ProfileContainer = styled.div` // 사용자 프로필 최상위 부모 컨테이너
    display: flex;
    width: 100%;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    margin-top: 55px;
    margin-bottom: 30px;
`;

const ProfileImage = styled.div` // 사용자 프로필 이미지
    width: 120px;
    height: 120px;
    margin-top: 15px;
    margin-left: 30px;
    background-image: url(${Default_Profile});
    background-size: cover;
    border-radius: 50%;
`;

const UserInfoContainer = styled.div` // 사용자 정보 컨테이너
    width: 300px;
    height: 150px;
    margin-left: 50px;
    margin-top: 50px;
`;

const UserInfo = styled.div` // 사용자 닉네임 & 이메일 정보
    font-size: ${props => props.type === "nickname" ? "20px" : "15px"};
    font-weight: ${props => props.type === "nickname" ? "bold" : "normal"};
    color: ${props => props.type === "email" ? "#A3A3A3" : "black"};
    text-decoration: ${props => props.type === "email" ? "underline" : "none"};
`;

const ProfileModiBtn = styled.div` // 프로필 수정 페이지 이동 버튼
    width: 150px;
    height: 50px;
    background-color: #D9D9D9;
    border-radius:15px;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    font-weight: bold;
    margin: 20px 20px 0 auto;
`;

const Title = styled.div` // 제목 컴포넌트
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bold;
`;

const ContentsBox = styled.div` // 컨텐츠 부모 박스 
    display: flex;
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background-color: ${props => props.type === "Purchase" ? "#F7ECD1" : "#DBE9F2"};
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
`;

const Vline = styled.div` // 구분선 컴포넌트
    width: 1px;
    height: 100px;
    margin-top: 25px;
    background-color: ${props => props.type === "Purchase" ? "#FCD672" : "#37A5DE"};
`;

const UsedProductBox = styled.div` // 중고 상품 컨테이너 박스
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
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
`;