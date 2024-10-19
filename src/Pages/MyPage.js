import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu, toggleMobileMenu, closeMobileMenu } from '../store';
import MenuIcon from "../Images/menu-button.svg";
import Default_MyPage from "../Components/Default_MyPage.js";
import Unopened_Purchase from "../Components/Unopened_Purchase.js";
import Unopened_Sale from "../Components/Unopened_Sale.js";
import Used_Purchase from "../Components/Used_Purchase.js";
import Used_Sale from "../Components/Used_Sale.js";
import ModifyProfile from '../Components/ModifyProfile.js';
import Interest_Product from "../Components/Interest_Product.js";
import InquiryPage from "../Components/InquiryPage.js";
import SubHeader from '../Components/SubHeader';

const menuTitles = {
    unopened_purchase: "미개봉 구매 내역",
    unopened_sale: "미개봉 판매 내역",
    used_purchase: "중고 구매 내역",
    used_sale: "중고 판매 내역",
    interest_product: "관심 상품 목록",
    inquiry: "문의 내역",
    default: "마이페이지",
};

export default function MyPage() { // 마이페이지 메뉴

    const dispatch = useDispatch();
    const selectedMenu = useSelector((state) => state.MypageMenu.selectedMenu); // 선택된 메뉴바 상태
    const mobileMenu = useSelector((state) => state.MypageMenu.mobileMenu); // 모바일 뷰 상태

    const renderComponent = () => { // 우측 컨테이너 컴포넌트 렌더링 메서드
        switch(selectedMenu) {
            case "unopened_purchase":
                return <Unopened_Purchase />;
            case "unopened_sale":
                return <Unopened_Sale />;
            case "used_purchase":
                return <Used_Purchase />;
            case "used_sale":
                return <Used_Sale />;
            case "modify_profile":
                return <ModifyProfile />;
            case "interest_product":
                return <Interest_Product />;
            case "inquiry":
                return <InquiryPage />;
            default:
                return <Default_MyPage setSelectedMenu = {dispatch(setSelectedMenu)}/>;
        }
    }

    return (
        <>
        <SubHeader/>
        <MyPageContainer onClick = {() => dispatch(closeMobileMenu())}>
            <LeftNavBar mobileMenu = {mobileMenu}>
                <NaviList style = {{fontSize: "17.5px", fontWeight: "bold", marginBottom: "30px"}} 
                          onClick = {() => dispatch(setSelectedMenu("default"))}>마이페이지</NaviList>

                <NaviList selected = {selectedMenu === "unopened_purchase"}
                          onClick = {() => dispatch(setSelectedMenu("unopened_purchase"))}>미개봉 구매 내역</NaviList>

                <NaviList selected = {selectedMenu === "unopened_sale"}
                          onClick = {() => dispatch(setSelectedMenu("unopened_sale"))}>미개봉 판매 내역</NaviList>

                <NaviList selected = {selectedMenu === "used_purchase"}
                          onClick = {() => dispatch(setSelectedMenu("used_purchase"))}>중고 구매 내역</NaviList>

                <NaviList selected = {selectedMenu === "used_sale"}
                          onClick = {() => dispatch(setSelectedMenu("used_sale"))}>중고 판매 내역</NaviList>

                <NaviList selected = {selectedMenu === "interest_product"}
                          onClick = {() => dispatch(setSelectedMenu("interest_product"))}>관심 상품 목록</NaviList>

                <NaviList selected = {selectedMenu === "inquiry"}
                          onClick = {() => dispatch(setSelectedMenu("inquiry"))}>문의 내역</NaviList>
            </LeftNavBar>    
            <RightContainer>
                <MenuBox onClick = {(e) => {e.stopPropagation(); dispatch(toggleMobileMenu());}}>
                    <MenuButton src = {MenuIcon}/>
                    <MenuTitle>{menuTitles[selectedMenu]}</MenuTitle>
                </MenuBox>
                {renderComponent()}
            </RightContainer>   
        </MyPageContainer>
        </>
    );
}

const MyPageContainer = styled.div` // 마이페이지 최상위 부모 컨테이너
    display: flex;
    width: 80%;
    margin: 0px 10%;

    @media (max-width: 600px) {
        width: 90%;
        margin: 0px 5%;
    }
`;

const LeftNavBar = styled.div` // 마이페이지 좌측 목록 네비바 컨테이너
    @media (max-width: 800px) { // 모바일 뷰
        position: fixed;
        text-align: center;
        padding-top: 10%;
        top: 0;
        left: 0;
        width: 125px;
        height: 100%; 
        z-index: 100; 
        background-color: #F5F5F7; 
        transition: left 0.1s ease-in-out; 
        left: ${props => props.mobileMenu ? "0" : "-100%"};
    }

    @media (min-width: 800px) { // PC 뷰
        position: relative;
        width: 97px;
        margin-right: 50px;
        text-align: left;
        padding-top: 0;
        flex-shrink: 0; 
        flex-basis: content; 
    }
`;

const NaviList = styled.div` // 좌측 네비바 내부 목록
    font-size: 12.5px;
    margin-bottom: 10px;
    cursor: pointer;
    color: ${(props) => (props.selected ? "#B1B1B2" : "black")}; 
    text-decoration: ${(props) => (props.selected ? "underline" : "none")}; 
`;

const RightContainer = styled.div` // 우측 렌더링 컨테이너
    flex-grow: 1;
`;

const MenuBox = styled.div` // 모바일 뷰 메뉴바 컨테이너
    display: none;
    cursor: pointer;

    @media (max-width: 800px) {
        display: flex;
    }
`;

const MenuButton = styled.img` // 모바일 뷰 메뉴바 이미지
    width: 18px;
    margin-right: 10px;
`;

const MenuTitle = styled.div` // 모바일 뷰 메뉴바 제목
    font-size: 17.5px;
    font-weight: bold;
`;