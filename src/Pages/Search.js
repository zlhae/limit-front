import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '../Images/icon-search-delete.svg';
import CloseIcon from '../Images/icon-search-close.svg'

const Search = () => {
    return (
        <Container> 
            <CancelButton>
                <img alt='search_close' src={CloseIcon}></img>
            </CancelButton>
            <SearchBox>
                <input type='text' placeholder='브랜드명, 상품명, 모델 번호 등'></input>
            </SearchBox>
            <RecentSearchContainer>
                <RecentSearchText>
                    <h3>최근 검색어</h3>
                </RecentSearchText>
                <RecentSearchButton>
                    <button>전체 지우기</button>
                </RecentSearchButton>
            </RecentSearchContainer>
            <RecentSearchListContainer>
                <RecentSearchList>슈프림 <img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>아식스<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>슈프림 <img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>노스페이스<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
                <RecentSearchList>마크곤잘레스<img alt='search_delete' src={DeleteIcon}></img></RecentSearchList>
            </RecentSearchListContainer>
            <TopSearchContainer>
                <TopSearchTitle>
                    <h3>인기 검색어</h3>
                    <TopSearchDate>2024/03/28 기준</TopSearchDate>
                </TopSearchTitle>
                <TopSearchList>
                    <ul>
                        <li>
                            <span className='top_search_ranking'>1</span>
                            <span className='top_search_ranking_list'>미스치프</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>2</span>
                            <span className='top_search_ranking_list'>아식스</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>3</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>4</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>5</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>6</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>7</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>8</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>9</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>10</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                    </ul>
                </TopSearchList>
            </TopSearchContainer>
        </Container>
    );

    
}

const Container = styled.div` 
    width: 65%; 
    margin: 0 auto; 

    @media (max-width: 1100px) {
        width: 90%;
    } 
`;

const CancelButton = styled.div` // 검색 화면 닫기 버튼
    position: absolute; 
    top: 100px; 
    right: 10%; 
    cursor: pointer;

    @media (max-width: 1100px) {
        right: 5%;
    } 
`;

const SearchBox = styled.div` // 검색창 
    input {
        border-width: 0 0 3px; 
        border-color: black;
        width: 100%;
        margin-top: 10%;
        font-size: 17px;
        background-color: transparent;
        outline: none;
        padding-bottom: 1%; 
    }
`;

const RecentSearchContainer = styled.div` // 최근 검색어, 전체 지우기 버튼 위치
    margin-top: 2%;
    display: flex;
    align-items: center;
`;

const RecentSearchText = styled.div` // 최근 검색어 텍스트
    h3 {
        font-size: 16px;
    }
`;

const RecentSearchButton = styled.div` // 전체 지우기 버튼
    button {
        margin-left: 5px;
        background-color: transparent;
        text-decoration: underline;
        border: none;
        color: #979797;
        cursor: pointer;
    }
`;

const RecentSearchListContainer = styled.div` // 최근 검색어 항목 전체 컨테이너
    display: flex;
    flex-wrap: wrap; // 여러 줄 나열
    gap: 7px;
    & > *:nth-child(n) {
        margin-bottom: 3px; // 줄이 넘어갈 때마다 각 줄의 간격 
    }
`;

const RecentSearchList = styled.span` // 최근 검색어 항목
    font-size: 13px;
    background-color: transparent;
    padding: 8px;
    border-radius: 20px;
    border: solid 1px #d9d9d9; // 테두리 두께, 색상 설정
    overflow: hidden;
    white-space: nowrap; // 너비를 초과하면 자동으로 줄 바꿈
    text-overflow: ellipsis; // 글자 수 너비 초과하면 ... 표시
    align-self: flex-start;
    display: inline-flex; // 최근 검색어 항목과 버튼 이미지를 수평으로 배치
    align-items: center;
    cursor: pointer;

    img {
        margin-left: 7px;
        cursor: pointer;
    }
`;

const TopSearchContainer = styled.div` // 인기 검색어, 날짜 컨테이너
    margin-top: 5%;
`;

const TopSearchTitle = styled.div` // 인기 검색어 텍스트
    display: flex;
    align-items: center;

    h3 {
        font-size: 16px;
    }
`;

const TopSearchDate = styled.div` // 현재 날짜 표시
    margin-left: 10px;
    font-size: 14px;
    background-color: transparent;
    color: #979797;
`;

const TopSearchList = styled.div` // 인기 검색어 순위 
    cursor: pointer;

    ul {
        list-style-type: none; // 점 등 마커 없애기
        padding: 0; // 패딩 없애서 인기 검색어 바로 밑에 정렬
        margin: 0; // 인기 검색어 텍스트와 인기 검색어 항목 마진
    }

    li {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .top_search_ranking {
        margin-right: 10px;
        font-size: 15px;    
        font-weight: bold;  
    }

    .top_search_ranking_list {
        font-size: 14px;
    }
`;

export default Search;