import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Default_MyPage from "./Default_MyPage.js";
import Unopened_Purchase from "./Unopened_Purchase.js";
import Unopened_Sale from "./Unopened_Sale.js";
import Used_Purchase from "./Used_Purchase.js";
import Used_Sale from "./Used_Sale.js";
import Interest_Product from "./Interest_Product.js";
import InquiryPage from "./InquiryPage.js";

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
            case "interest_product":
                return <Interest_Product />;
            case "inquiry":
                return <InquiryPage />;
            default:
                return <Default_MyPage />;
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
`;

const LeftNavBar = styled.div` // 마이페이지 좌측 목록 네비바 컨테이너
    display: flex;
    flex-direction: column;
    width: 10%;
    margin-left: 150px;
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
    width: 70%;
    margin-right: 150px;
`;
