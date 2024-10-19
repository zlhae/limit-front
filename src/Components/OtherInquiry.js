import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import MenuIcon from "../Images/menu-button.svg";
import Cookies from 'js-cookie';

const OtherInquiry=({handleShowMobileSideBar})=>{
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");

    const submitOtherInquiry=()=>{
        if(!Cookies.get("accessToken")){
            Swal.fire({
                icon: "info",
                title: "로그인 후 이용 가능합니다.",
                text: '로그인 하시겠습니까?',
            })
            .then(result=>{
                if(result.isConfirmed){
                    window.location.href = "/login"
                }
            });
        }
        else if(title==='' || content===''){
            Swal.fire({
                icon: "error",
                title: "비어있는 칸이 존재합니다."
            });
        }
        else{
            axios
            .post('https://api.lim-it.one/api/v1/auth/inquiries/other',{
                title: title,
                contents: content
            },{
                headers:{
                    Authorization: `Bearer ${Cookies.get("accessToken") || ''}`,
                }
            })
            .then(()=>{
                Swal.fire({
                    icon: "success",
                    title: "기타 문의가 접수되었습니다."
                });
            })
            .catch(()=>{
                Swal.fire({
                    icon: "error",
                    text: "기타 문의가 접수되지 않았습니다. 다시 시도해주세요.",
                });
            })

            setTitle('');
            setContent('');
        }
    }

    const EnterKey = (e) => { 
        if (e.key === "Enter") {
            e.preventDefault();
            submitOtherInquiry();
        }
    };

    return(
        <ContentContainer>
            <MenuImg src={MenuIcon} onClick={(e)=>{e.stopPropagation(); handleShowMobileSideBar();}}></MenuImg>
            <ContentTitle>기타 문의</ContentTitle>
            <InquiryContainer>
                <InquiryElement>
                    <InquiryLabel htmlFor="title">제목</InquiryLabel>
                    <InquiryInput
                        id="title"
                        type="text"
                        value={title}
                        onKeyDown = {EnterKey}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    ></InquiryInput>
                </InquiryElement>
                <InquiryElement>
                    <InquiryLabel htmlFor="content">내용</InquiryLabel>
                    <InquiryTextarea
                        id="content"
                        type="text"
                        value={content}
                        onKeyDown = {EnterKey}
                        onChange={(e)=>{setContent(e.target.value)}}
                    ></InquiryTextarea>
                </InquiryElement>
                <SubmitButton onClick={submitOtherInquiry}>제출</SubmitButton>
            </InquiryContainer>
        </ContentContainer>
    );
}

const ContentContainer=styled.div`
    flex: 2;
`

const MenuImg=styled.img`
    width: 18px;
    margin-right: 15px;
    cursor: pointer;

    @media (min-width:600px){
        display: none;
    }
`

const ContentTitle=styled.h3`
    margin: 0px;
    margin-bottom: 20px;
    cursor: default;
    display: inline-block;
`

const InquiryContainer=styled.div`
    height: 425px;
`

const InquiryElement=styled.div`
    display: flex;
    margin-bottom: 20px;
`

const InquiryLabel=styled.label`
    padding: 10px 0px;
    width: 60px;
    display: inline-block;
    font-size: 0.83em;
    font-weight: bold;
    margin-right: 15px;
`

const InquiryInput=styled.input`
    flex: 2;
    border: 1px solid #979797;
    padding: 10px 0px 10px 10px;
    border-radius: 10px;
`

const InquiryTextarea=styled.textarea`
    flex: 2;
    border: 1px solid #979797;
    padding: 10px 0px 10px 10px;
    border-radius: 10px;
    height: 285px;
    overflow: scroll;
    resize: none;
`

const SubmitButton=styled.button`
    float: right;
    border: 0;
    background-color: #d9d9d9;
    padding: 10px 20px;
    border-radius: 15px;
`

export default OtherInquiry;