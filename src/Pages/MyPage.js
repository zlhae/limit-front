import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Default_MyPage from "../Components/Default_MyPage.js";
import Unopened_Purchase from "../Components/Unopened_Purchase.js";
import Unopened_Sale from "../Components/Unopened_Sale.js";
import Used_Purchase from "../Components/Used_Purchase.js";
import Used_Sale from "../Components/Used_Sale.js";
import ModifyProfile from '../Components/ModifyProfile.js';
import Interest_Product from "../Components/Interest_Product.js";
import InquiryPage from "../Components/InquiryPage.js";

export default function MyPage() {

    const [selectedMenu, setSelectedMenu] = useState("default"); // 현재 선택된 메뉴 상태

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
                return <Default_MyPage setSelectedMenu = {setSelectedMenu}/>;
        }
    }

    return (
        <MyPageContainer>
            <LeftNavBar>
                <NaviList style = {{fontSize: "20px", fontWeight: "bold", marginBottom: "30px"}} 
                          onClick = {() => setSelectedMenu("default")}>마이페이지</NaviList>

                <NaviList selected = {selectedMenu === "unopened_purchase"}
                          onClick = {() => setSelectedMenu("unopened_purchase")}>미개봉 구매 내역</NaviList>

                <NaviList selected = {selectedMenu === "unopened_sale"}
                          onClick = {() => setSelectedMenu("unopened_sale")}>미개봉 판매 내역</NaviList>

                <NaviList selected = {selectedMenu === "used_purchase"}
                          onClick = {() => setSelectedMenu("used_purchase")}>중고 구매 내역</NaviList>

                <NaviList selected = {selectedMenu === "used_sale"}
                          onClick = {() => setSelectedMenu("used_sale")}>중고 판매 내역</NaviList>

                <NaviList selected = {selectedMenu === "interest_product"}
                          onClick = {() => setSelectedMenu("interest_product")}>관심 상품 목록</NaviList>

                <NaviList selected = {selectedMenu === "inquiry"}
                          onClick = {() => setSelectedMenu("inquiry")}>문의 내역</NaviList>
            </LeftNavBar>
            <RightContainer>
                {renderComponent()}
            </RightContainer>
        </MyPageContainer>
    );
}

const MyPageContainer = styled.div` // 마이페이지 최상위 부모 컨테이너
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2.5%;
`;

const LeftNavBar = styled.div` // 마이페이지 좌측 목록 네비바 컨테이너
    display: flex;
    flex-direction: column;
    width: 10%;
    min-width: 120px;
    margin-left: 20%;

    @media (max-width: 1000px) {
        margin-left: 5%;
    }

    @media (min-width: 1001px) and (max-width: 1200px) {
        margin-left: 10%;
    }
`;

const NaviList = styled.div` // 좌측 네비바 내부 목록
    width: 100%;
    font-size: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    color: ${(props) => (props.selected ? "#B1B1B2" : "black")}; 
    text-decoration: ${(props) => (props.selected ? "underline" : "none")}; 
`;

const RightContainer = styled.div` // 우측 컴포넌트 최상위 부모 컨테이너
    width: 50%;
    margin-right: 20%;

    @media (max-width: 1000px) {
        width: 72.5%;
        margin-right: 5%;
    }

    @media (min-width: 1001px) and (max-width: 1200px) {
        width: 67.5%;
        margin-right: 10%;
    }
`;
