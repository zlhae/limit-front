import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import MyPageTemplate from './MyPageTemplate.js';

export default function Unopened_Sale() {

    const [selectedBtn, setSelectedBtn] = useState("전체"); // 현재 선택된 토글 버튼

    const toggleButtons = [
      { name : "전체", isSelected : selectedBtn === "전체", onClick : () => setSelectedBtn("전체"), count: 0 },
      { name : "진행중", isSelected : selectedBtn === "진행중", onClick : () => setSelectedBtn("진행중"), count: 0 },
      { name : "판매 완료", isSelected : selectedBtn === "판매 완료", onClick : () => setSelectedBtn("판매 완료"), count: 0 }
  ];

    return (
        <MyPageTemplate title = "미개봉 판매 내역" toggleButtons = {toggleButtons}></MyPageTemplate>
    );
}