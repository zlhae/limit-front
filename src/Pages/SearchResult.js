import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter';
import Product from '../Components/ResultProduct';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredResults, setFilteredResults] = useState(location.state?.results || []);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const searchResults = location.state?.results || [];
    const searchQuery = location.state?.query || '';

    // 카테고리 매핑 및 전체 카테고리 배열
    const categoryNameMap = {
        2: '자켓',
        3: '아노락',
        4: '코트',
        5: '패딩',
        7: '스니커즈',
        8: '부츠',
        9: '샌들/슬리퍼',
        11: '반팔 티셔츠',
        12: '긴팔 티셔츠',
        13: '셔츠',
        14: '후드',
        15: '후드 집업',
        16: '스웨트셔츠',
        17: '슬리브리스',
        18: '원피스',
        19: '니트',
        21: '바지',
        22: '반바지',
        23: '스커트',
        24: '레깅스',
        26: '미니백',
        27: '백팩',
        28: '숄더백',
        29: '토트백',
        30: '크로스백',
        31: '더플백',
        33: '비니',
        34: '베레모',
        35: '볼캡',
        36: '스냅백',
        37: '기타 모자',
        38: '장갑',
    };

    const totalCategories = [2, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38];
    const categoryNames = totalCategories.map((id) => categoryNameMap[id]);

    const handleSearchBoxClick = () => {
        navigate('/search');
    };

    const handleCategoryChange = (category, isChecked) => {
        setSelectedCategories((prev) =>
            isChecked ? [...prev, category] : prev.filter((cat) => cat !== category)
        );
    };

    const handleGenderChange = (gender, isChecked) => {
        setSelectedGenders((prev) =>
            isChecked ? [...prev, gender] : prev.filter((g) => g !== gender)
        );
    };

    useEffect(() => {
        let filtered = [...searchResults];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((result) =>
                selectedCategories.includes(result.categoryId)
            );
        }

        if (selectedGenders.length > 0) {
            filtered = filtered.filter((result) =>
                selectedGenders.includes(result.gender)
            );
        }

        setFilteredResults(filtered);
    }, [selectedCategories, selectedGenders, searchResults]);

    return (
        <MainProduct>
            <SubHeader />
            <SearchBox onClick={handleSearchBoxClick}>
                <input
                    type="text"
                    placeholder="브랜드명, 상품명, 모델 번호 등"
                    value={searchQuery}
                    readOnly
                />
            </SearchBox>
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter
                        categories={categoryNames}
                        allCategories={totalCategories}
                        onCategoryChange={handleCategoryChange}
                        onGenderChange={handleGenderChange}
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {filteredResults.length}개</h3>
                    </ProductNumber>
                    <Product searchResults={filteredResults} />
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

const MainProduct = styled.div`
`;

const ProductContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        margin-top: -50px;
    }
`;

const SideFilterWrapper = styled.div`
    margin-left: 10%;
    width: 210px;

    @media (max-width: 600px) {
        width: 100%;
        margin-left: 0;
        order: -1;
    }
`;

const SearchBox = styled.div`
    width: 50%;
    margin: 0 auto;
    margin-top: -30px;

    input {
        border-width: 0 0 3px;
        border-color: black;
        width: 100%;
        font-size: 17px;
        background-color: transparent;
        outline: none;
        padding-bottom: 1%;
    }

    @media (max-width: 600px) {
        width: 90%;
        margin-top: 0;
    }
`;

const ProductWrapper = styled.div`
    flex-grow: 1;
    margin-right: 10%;
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
        margin: 0 auto;
        width: 100%;
    }
`;

const ProductNumber = styled.h3`
    margin-top: 30px;
    font-size: 12px;
    color: #656565;

    @media (max-width: 600px) {
        margin-left: 5%;
        font-size: 10px;
        color: #656565;
        margin-top: 70px;
        margin-bottom: 25px;
    }
`;

export default SearchResult;
