import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import Cookies from 'js-cookie';

export default function InquiryPage() {
    const [expandedIndex, setExpandedIndex] = useState(null); // 답변 보기&닫기 버튼의 현재 상태
    const [inquiries, setInquiries] = useState([]); // 문의내역
    const [detailedInquiries, setDetailedInquiries] = useState({}); // 상세 문의 내역

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const accessToken = Cookies.get('accessToken');

                const response = await axios.get('https://api.lim-it.one/api/v1/auth/inquiries', {
                    params: {
                        page: 0,
                        size: 20,
                        sort: 'ASC'
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setInquiries(response.data.content);
            } catch (error) {
                console.error("문의 내역 조회 중 에러 발생 :", error);
            }
        };

        fetchInquiries();
    }, []);

    const toggleExpanded = async (index, inquiryId) => { // 답변상태 토글 메서드
        if (expandedIndex === index) {
            setExpandedIndex(null); 
            return;
        }

        try {
            const accessToken = Cookies.get('accessToken');
            const response = await axios.get(`https://api.lim-it.one/api/v1/auth/inquiries/${inquiryId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setDetailedInquiries(prevState => ({
                ...prevState,
                [inquiryId]: response.data 
            }));
            setExpandedIndex(index); 
        } catch (error) {
            console.error("문의 답변 조회 중 에러 발생 :", error);
        }
    };

    const formatDate = (dateTime) => { // 작성일시 형태변환 메서드
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('ko-KR', options); 

        return formattedDate.replace(/\s/g, '').replace(/\.$/, '');
    };

    return (
        <Container>
            <Title>문의 내역</Title>
            <InnerContainer>
                {inquiries.map((inquiry, index) => (
                    <InquiryBox key = {inquiry.id} isOpen = {expandedIndex === index}>
                        <InquiryDate>{formatDate(inquiry.createAt)}</InquiryDate>
                        <InfoBox>
                            <TitleAndButtonBox>
                                <InquiryTitle>
                                    {inquiry.title ? inquiry.title : `${inquiry.brand} ${inquiry.productName} 상품 등록 문의내역`}
                                </InquiryTitle>
                                <DetailButton onClick = {() => toggleExpanded(index, inquiry.id)}>
                                    {expandedIndex === index ? "닫기" : "보기"}
                                </DetailButton>
                            </TitleAndButtonBox>
                            {expandedIndex === index && (
                                <HiddenBox>
                                    {detailedInquiries[inquiry.id] && (
                                        <>
                                            {detailedInquiries[inquiry.id].contents ? (
                                                <QuestionBox>{detailedInquiries[inquiry.id].contents}</QuestionBox>
                                            ) : null}
                                            <AnswerBox hasContent = {detailedInquiries[inquiry.id]?.contents !== null}>
                                                {detailedInquiries[inquiry.id]?.answerContents || "아직 답변이 없습니다."}
                                            </AnswerBox>
                                        </>
                                    )}
                                </HiddenBox>
                            )}
                        </InfoBox>
                    </InquiryBox>
                ))}
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
    height: ${({ isOpen }) => (isOpen ? "auto" : "50px")};
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

    @media (max-width: 800px) {
        font-size: 12px;
    }

    @media (max-width: 600px) {
        font-size: 11px;
        margin-left: 5px;
    }

    @media (max-width: 550px) {
        font-size: 9px;
    }
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

    @media (max-width: 800px) {
        width: 80%;
        font-size: 14px;
    }

    @media (max-width: 600px) {
        font-size: 12px;
    }

    @media (max-width: 550px) {
        font-size: 11px;
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

    @media (max-width: 800px) {
        width: 40px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        margin: 10px 7.5px 0 auto;
    }

    @media (max-width: 600px) {
        width: 35px;
        height: 25px;
        line-height: 25px;
        font-size: 11px;
        margin: 13px 7.5px 0 auto;
        border-radius: 5px;
    }

    @media (max-width: 500px) {
        width: 30px;
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        margin: 16px 7.5px 0 auto;
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

    ${({ hasContent }) => hasContent ? css`
        margin-top: 10px; 
    ` : css`
        margin-top: 0; 
    `}

    @media (max-width: 600px) {
        width: 90%;
    }
`;