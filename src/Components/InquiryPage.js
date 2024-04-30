import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function InquiryPage() {

    const [expanded, setExpanded] = useState(false); // 답변 보기&닫기 버튼의 현재 상태

    const toggleExpanded = () => { // 답변 보기&닫기 버튼 상태 반전 메서드
        setExpanded(!expanded); 
    };

    return (
        <Container>
            <Title>문의 내역</Title>
            <InnerContainer>
                <InquiryBox BoxState = {expanded}>
                    <InquiryDate>{"2025-01-01"}</InquiryDate>
                    <InfoBox>
                        <TitleAndButtonBox>
                            <InquiryTitle>ㅇㅇㅇ 서비스에 대해 문의 드립니다.</InquiryTitle>
                            <DetailButton onClick = {toggleExpanded}>
                                {expanded ? "닫기" : "보기"}
                            </DetailButton>
                        </TitleAndButtonBox>
                        {expanded && 
                            <HiddenBox>
                                <QuestionBox>
                                    안녕하세요. ㅇㅇㅇ 서비스에 대한 의문점이 생겨 문의드립니다.<br/>
                                    어떻게 사용하는 기능인지 설명 부탁드려도 될까요?
                                </QuestionBox>
                                <AnswerBox>
                                    안녕하세요 고객님.<br/>
                                    고객님이 질문해주신 문의에 대한 답변은 아래와 같습니다.<br/>
                                    ㅇㅇㅇ 기능은 ㅇㅇㅇ 화면에서 ㅇㅇㅇ에 대한 ㅇㅇ 기능입니다.<br/>
                                    참고 부탁드립니다. 감사합니다.
                                </AnswerBox>
                            </HiddenBox>
                        }
                    </InfoBox>
                </InquiryBox>     
            </InnerContainer>
        </Container>
    );
}

const Container = styled.div` // 최상위 부모컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 17.5px;
    font-weight: bold;

    @media (max-width: 800px) {
        display: none;
    }
`;

const InnerContainer = styled.div` // 내부 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin-top: 30px;
    border-radius: 15px;
    background-color: white;
    overflow-y: auto;
`;

const InquiryBox = styled.div` // 문의 내역 컨테이너 컴포넌트
    display: flex;
    width: 95%;
    height: ${({BoxState}) => (BoxState ? "auto" : "50px")};
    border-radius: 10px;
    background-color: #D9D9D9;
    margin-left: 2.5%;
    margin-top: 2.5%;
`;

const InquiryDate = styled.div` // 문의 내역 작성(생성) 날짜
    flex-shrink: 0; 
    flex-basis: content; 
    font-size: 12.5px;
    line-height: 50px;
    margin-left: 15px;
    margin-right: 5px;
`;

const InfoBox = styled.div` // 문의 내역 상세 정보 컨테이너
    flex-grow: 1;
`;

const TitleAndButtonBox = styled.div` // 제목&버튼 컨테이너
    display: flex;
    width: 100%;
`;

const InquiryTitle = styled.div` // 문의 내역 제목 컴포넌트
    font-size: 15px;
    font-weight: bold;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 650px) and (max-width: 800px) {
        width: 300px;
        font-size: 14px;
    }

    @media (min-width: 500px) and (max-width: 649px) {
        width: 200px;
        font-size: 13px;
    }

    @media (max-width: 499px) {
        width: 125px;
        font-size: 12px;
    }
`;

const DetailButton = styled.div` // 답변 보기&닫기 버튼
    width: 50px;
    height: 35px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 35px;
    font-size: 12.5px;
    margin: 7.5px 7.5px 0 auto;
    cursor: pointer;

    &:hover {
        background-color: #F5F5F7; 
    }
`;

const HiddenBox = styled.div` // 답변 보기버튼을 클릭했을 시 나타나는 컴포넌트
    width: 95%;
`;

const QuestionBox = styled.div` // 사용자 질문내용 박스
    width: 100%;
    font-size: 12.5px;
    white-space: pre-wrap;
`;

const AnswerBox = styled.div` // 관리자 답변내용 박스
    width: 95%;
    background-color: white;
    border-radius: 5px;   
    font-size: 12.5px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 15px;
    white-space: pre-wrap;

    @media (max-width: 800px) {
        width: 85%;
    }
`;