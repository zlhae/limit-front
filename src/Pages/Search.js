import React, { useState } from 'react';
import styled from 'styled-components';

const Search = () => {
    return (
        <Container>
            <CancelButton>
                <img alt='search_close' src='images/icon-search-close.svg'></img>
            </CancelButton>
            <SearchBox>
                <input type='text' placeholder='브랜드명, 상품명, 모델 번호 등'></input>
            </SearchBox>
            <RecentSearchContainer>
                <RecentSearchText>
                    <h1>최근 검색어</h1>
                </RecentSearchText>
                <RecentSearchButton>
                    <button>전체 지우기</button>
                </RecentSearchButton>
            </RecentSearchContainer>
            <RecentSearchListContainer>
                <RecentSearchList>슈프림 <img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>미스치프<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
                <RecentSearchList>노스페이스<img alt='search_delete' src='images/icon-search-delete.svg'></img></RecentSearchList>
            </RecentSearchListContainer>
            <TopSearchContainer>
                <TopSearchTitle>
                    <h1>인기 검색어</h1>
                    <TopSearchDate>2024/03/28 기준</TopSearchDate>
                </TopSearchTitle>
                <TopSearchList>
                    <ul>
                        <li>
                            <span className='top_search_ranking'>1</span>
                            <span className='top_search_ranking_list'>오타니</span>
                        </li>
                        <li>
                            <span className='top_search_ranking'>2</span>
                            <span className='top_search_ranking_list'>오타니</span>
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
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;

    @media (max-width: 1100px) {
        width: 80%;
    }
`;

const CancelButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    cursor: pointer;
`;

const SearchBox = styled.div`
    input {
        border-width: 0 0 3px;
        border-color: black;
        width: 100%;
        height: 30px;
        margin-top: 50px;
        font-size: 20px;
        background-color: transparent;
    }
`;

const RecentSearchContainer = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
`;

const RecentSearchText = styled.div`
    h1 {
        font-size: 23px;
    }
`;

const RecentSearchButton = styled.div`
    button {
        margin-left: 10px;
        background-color: transparent;
        text-decoration: underline;
        border: none;
        color: #979797;
    }
`;

const RecentSearchListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

const RecentSearchList = styled.span`
    font-size: 15px;
    background-color: white;
    padding: 9px;
    border-radius: 20px;
    border: solid #d9d9d9;
    margin-bottom: 10px;
    max-width: 85px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;

    img {
        margin-left: 7px;
    }
`;

const TopSearchContainer = styled.div`
    margin-bottom: 100px;
`;

const TopSearchTitle = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;

    h1 {
        font-size: 23px;
    }
`;

const TopSearchDate = styled.div`
    margin-left: 15px;
    font-size: 14px;
    background-color: transparent;
    color: #979797;
`;

const TopSearchList = styled.div`
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .top_search_ranking {
        margin-right: 10px;
        font-size: 18px;
        font-weight: bold;
    }
`;

export default Search;