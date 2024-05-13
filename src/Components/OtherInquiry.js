import styled from "styled-components";
import { useState } from "react";
import MenuIcon from "../Images/menu-button.svg";

const OtherInquiry=({handleShowMobileSideBar})=>{
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");

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
                        onChange={(e)=>{setTitle(e.target.value)}}
                    ></InquiryInput>
                </InquiryElement>
                <InquiryElement>
                    <InquiryLabel htmlFor="content">내용</InquiryLabel>
                    <InquiryTextarea
                        id="content"
                        type="text"
                        onChange={(e)=>{setContent(e.target.value)}}
                    ></InquiryTextarea>
                </InquiryElement>
                <SubmitButton>제출</SubmitButton>
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
    height: 450px;
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
    height: 300px;
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