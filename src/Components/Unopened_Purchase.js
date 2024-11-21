import React, { useState, useEffect } from 'react';
import MyPageTemplate from './MyPageTemplate.js';
import img1 from "../Images/img1.png";
import styled from 'styled-components';

export default function Unopened_Purchase() {

    const [selectedBtn, setSelectedBtn] = useState("전체"); // 현재 선택된 토글 버튼

    const toggleButtons = [
        { name : "전체", isSelected : selectedBtn === "전체", onClick : () => setSelectedBtn("전체"), count: 1 },
        { name : "진행중", isSelected : selectedBtn === "진행중", onClick : () => setSelectedBtn("진행중"), count: 0 },
        { name : "구매 완료", isSelected : selectedBtn === "구매 완료", onClick : () => setSelectedBtn("구매 완료"), count: 1 }
    ];

    const imgBox = (selectedBtn === "전체" || selectedBtn === "구매 완료") ? <ImgBox /> : null;

    return (
        <MyPageTemplate title = {"미개봉 구매 내역"} toggleButtons = {toggleButtons} imgBox = {imgBox}></MyPageTemplate>
    );
}

const ImgBox = styled.div`
    width: 270px;
    cursor: pointer;
    height: 360px;
    border-radius: 15px;
    background-image: url(${img1}); 
    background-size: cover; 
    background-position: center; 
`;