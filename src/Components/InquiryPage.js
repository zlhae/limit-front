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
                                {expanded ? "답변 닫기" : "답변 보기"}
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
    font-size: 20px;
    font-weight: bold;
`;

const InnerContainer = styled.div` // 내부 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
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
    min-width: 90px;
    font-size: 15px;
    line-height: 50px;
    margin-left: 15px;
`;

const InfoBox = styled.div` // 문의 내역 상세 정보 컨테이너
    flex-grow: 1;
    flex-direction: column;
`;

const TitleAndButtonBox = styled.div` // 제목&버튼 컨테이너
    display: flex;
    width: 100%;
`;

const InquiryTitle = styled.div` // 문의 내역 제목 컴포넌트
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
`;

const DetailButton = styled.div` // 답변 보기&닫기 버튼
    min-width: 100px;
    height: 35px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 35px;
    font-size: 15px;
    margin: 7.5px 7.5px 0 auto;
    cursor: pointer;

    &:hover {
        background-color: #F5F5F7; 
    }
`;

const HiddenBox = styled.div` // 답변 보기버튼을 클릭했을 시 나타나는 컴포넌트
    width: 100%;
`;

const QuestionBox = styled.div` // 사용자 질문내용 박스
    width: 95%;
    font-size: 15px;
    white-space: pre-wrap;
`;

const AnswerBox = styled.div` // 관리자 답변내용 박스
    width: 95%;
    background-color: white;
    border-radius: 5px;   
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    white-space: pre-wrap;
`;