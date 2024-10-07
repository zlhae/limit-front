import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SearchIcon from '../Images/icon-search.svg';
import DeleteIcon from '../Images/icon-search-delete.svg';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchResults, setSearchResults] = useState([]); 
    const [topSearches, setTopSearches] = useState([]);
    
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const fetchTopSearches = async () => {
        try {
            const response = await axios.get('https://api.lim-it.one/api/v1/search-logs/top');
            setTopSearches(response.data);
        } catch (error) {
            console.error('인기 검색어 가져오기 중 오류 발생:', error);
        }
    };

    const saveRecentSearch = (searchName) => {
        let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const trimmedSearchName = searchName.trim();
        if (trimmedSearchName && !searches.includes(trimmedSearchName)) {
            searches = [trimmedSearchName, ...searches];
            localStorage.setItem('recentSearches', JSON.stringify(searches));
            setRecentSearches(searches);
        }
    };

    const handleSearch = async (searchName) => {
        if (searchName.trim() !== '') {
            saveRecentSearch(searchName.trim());

            try {
                const response = await axios.get(`https://api.lim-it.one/api/v1/products/search`, {
                    params: {
                        name: searchName.trim(),
                        page: 0,
                        size: 1000,
                        sort: 'ASC'
                    }
                });

                setSearchResults(response.data.content);
                navigate('/searchresult', { state: { query: searchName.trim(), results: response.data.content } });
                setSearchTerm('');
            } catch (error) {
                console.error('검색 중 오류 발생:', error);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const handleRecentSearchClick = (searchName) => {
        handleSearch(searchName);
    };

    const handleTopSearchClick = (searchName) => {
        handleSearch(searchName);
    };

    const fetchRecentSearches = () => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(searches);
    };

    useEffect(() => {
        fetchRecentSearches();
        fetchTopSearches();
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
            <SearchBox>
                <input
                    type='text'
                    placeholder='브랜드명, 상품명, 모델 번호 등'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={SearchIcon} alt="Search" onClick={() => handleSearch(searchTerm)} />
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
                    <RecentSearchList key={index} onClick={() => handleRecentSearchClick(search)}>
                    {search}
                    <img
                        alt='search_delete'
                        src={DeleteIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteRecentSearch(search);
                        }}
                    />
                </RecentSearchList>                
                ))}
            </RecentSearchListContainer>
            <TopSearchContainer>
                <TopSearchTitle>
                    <h3>인기 검색어</h3>
                    <TopSearchDate>{getTodayDate()} 기준</TopSearchDate>
                </TopSearchTitle>
                <TopSearchList>
                    <ul>
                        {topSearches.map((search, index) => (
                            <li key={index} onClick={() => handleTopSearchClick(search.searchName)}>
                                <span className='top_search_ranking'>{search.rank}</span>
                                <span className='top_search_ranking_list'>{search.searchName}</span>
                            </li>
                        ))}
                    </ul>
                </TopSearchList>
            </TopSearchContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 60%; 
    margin: 0 auto; 

    @media (max-width: 800px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const SearchBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    input {
        border-width: 0 0 3px; 
        border-color: black;
        width: 100%;
        margin-top: 10%;
        font-size: 17px;
        background-color: transparent;
        outline: none;
        padding-bottom: 1%; 
        padding-left: 30px;

        @media (max-width: 600px) {
            font-size: 15px;
            padding-left: 23px;
        }
    }

    img {
        position: absolute;
        cursor: pointer;
        margin-top: 9%;
        padding-bottom: 0.5%; 

        @media (max-width: 600px) {
            width: 18px;
        }
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
    vertical-align: middle;

    img {
        margin-left: 7px;
        cursor: pointer;
        position: relative;
        top: 1px; 
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
