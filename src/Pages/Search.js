import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../Images/icon-search-delete.svg';
import CloseIcon from '../Images/icon-search-close.svg';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    const saveRecentSearch = (searchName) => {
        let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

        const trimmedSearchName = searchName.trim();
        if (trimmedSearchName && !searches.includes(trimmedSearchName)) {
            searches = [trimmedSearchName, ...searches]; 
            localStorage.setItem('recentSearches', JSON.stringify(searches));
            setRecentSearches(searches); 
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            saveRecentSearch(searchTerm.trim()); 
            navigate('/searchresult', { state: { query: searchTerm.trim() } }); 
            setSearchTerm(''); 
        }
    };

    const handleRecentSearchClick = (searchName) => {
        navigate('/searchresult', { state: { query: searchName } }); 
    };

    const fetchRecentSearches = () => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(searches);
    };

    useEffect(() => {
        fetchRecentSearches();
    }, []);

    const deleteRecentSearch = (searchName) => {
        let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        searches = searches.filter(search => search !== searchName); 
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        setRecentSearches(searches);
    };

    const deleteAllRecentSearches = () => {
        localStorage.removeItem('recentSearches');
        setRecentSearches([]);
    };

    return (
        <Container>
            <CancelButton>
                <img alt='search_close' src={CloseIcon}></img>
            </CancelButton>
            <SearchBox>
                <input
                    type='text'
                    placeholder='브랜드명, 상품명, 모델 번호 등'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
            </SearchBox>
            <RecentSearchContainer>
                <RecentSearchText>
                <h3>최근 검색어</h3>
                </RecentSearchText>
                <RecentSearchButton>
                    <button onClick={deleteAllRecentSearches}>전체 지우기</button>
                </RecentSearchButton>
            </RecentSearchContainer>
            <RecentSearchListContainer>
                {recentSearches.map((search, index) => (
                    <RecentSearchList key={index} onClick={() => handleRecentSearchClick(search)}> {/* 클릭 시 페이지 이동 */}
                        {search} 
                        <img 
                            alt='search_delete' 
                            src={DeleteIcon} 
                            onClick={() => deleteRecentSearch(search)} 
                        />
                    </RecentSearchList>
                ))}
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
                    </ul>
                </TopSearchList>
            </TopSearchContainer>
        </Container>
    );
};

const Container = styled.div` 
    width: 65%; 
    margin: 0 auto; 

    @media (max-width: 1100px) {
        width: 90%;
    } 
`;

const CancelButton = styled.div` 
    position: absolute; 
    top: 100px; 
    right: 10%; 
    cursor: pointer;

    @media (max-width: 1100px) {
        right: 5%;
    } 
`;

const SearchBox = styled.div`
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

const RecentSearchContainer = styled.div`
    margin-top: 2%;
    display: flex;
    align-items: center;
`;

const RecentSearchText = styled.div`
    h3 {
        font-size: 16px;
    }
`;

const RecentSearchButton = styled.div`
    button {
        margin-left: 5px;
        background-color: transparent;
        text-decoration: underline;
        border: none;
        color: #979797;
        cursor: pointer;
    }
`;

const RecentSearchListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    & > *:nth-child(n) {
        margin-bottom: 3px;
    }
`;

const RecentSearchList = styled.span`
    font-size: 13px;
    background-color: transparent;
    padding: 8px;
    border-radius: 20px;
    border: solid 1px #d9d9d9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    img {
        margin-left: 7px;
        cursor: pointer;
    }
`;

const TopSearchContainer = styled.div`
    margin-top: 5%;
`;

const TopSearchTitle = styled.div`
    display: flex;
    align-items: center;

    h3 {
        font-size: 16px;
    }
`;

const TopSearchDate = styled.div`
    margin-left: 10px;
    font-size: 14px;
    background-color: transparent;
    color: #979797;
`;

const TopSearchList = styled.div`
    cursor: pointer;

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
        font-size: 15px;    
        font-weight: bold;  
    }

    .top_search_ranking_list {
        font-size: 14px;
    }
`;

export default Search;
