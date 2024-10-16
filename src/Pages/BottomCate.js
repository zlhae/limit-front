import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const BottomCate = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const [selectedGenders, setSelectedGenders] = useState([]); // 성별 필터 상태 추가
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const categoryNameMap = {
        21: '바지',
        22: '반바지',
        23: '스커트',
        24: '레깅스',
    };

    const bottomCategories = [21, 22, 23, 24];
    const categoryNames = bottomCategories.map((id) => categoryNameMap[id]);

    // 상품을 가져오는 함수 (카테고리와 페이지 크기 size=122 추가)
    const fetchProducts = async (categories) => {
        try {
            const filteredCategories = categories.length > 0 ? categories : bottomCategories;

            const categoryParam = filteredCategories.map(cat => `categoryId=${cat}`).join('&');
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&size=122`;  // 페이지 크기 122로 설정

            const response = await axios.get(url);

            setProducts(response.data.content);
            setTotalProducts(response.data.content.length);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchProducts([]); 
    }, []);

    const handleCategoryChange = (categoryId, isChecked) => {
        if (isChecked) {
            setSelectedCategories((prev) => [...prev, categoryId]); 
        } else {
            setSelectedCategories((prev) => prev.filter((id) => id !== categoryId)); 
        }
    };

    // 성별 선택 시 처리 함수
    const handleGenderChange = (gender, isChecked) => {
        if (isChecked) {
            setSelectedGenders((prev) => [...prev, gender]); 
        } else {
            setSelectedGenders((prev) => prev.filter((g) => g !== gender)); 
        }
    };

    // 선택된 카테고리 또는 성별이 변경될 때마다 상품을 다시 불러옴
    useEffect(() => {
        fetchProducts(selectedCategories, selectedGenders);
    }, [selectedCategories, selectedGenders]);

    return (
        <MainProduct>
            <SubHeader />
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter 
                        categories={categoryNames}
                        allCategories={bottomCategories}
                        onCategoryChange={handleCategoryChange} 
                        onGenderChange={handleGenderChange} 
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap category={selectedCategories.length > 0 ? selectedCategories : bottomCategories} products={products} />  
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

const MainProduct = styled.div`
`;

const ProductContainer = styled.div`
    margin-top: -20px;
    display: flex;
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: column;
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
        margin-bottom: 25px;
    }
`;

export default BottomCate;
