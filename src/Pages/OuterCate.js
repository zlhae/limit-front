import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const OuterCate = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const searchResults = location.state?.results || [];
    const [selectedGenders, setSelectedGenders] = useState([]);

    const categoryNameMap = {
        2: '자켓',
        3: '아노락',
        4: '코트',
        5: '패딩',
    };

    const outerCategories = [2, 3, 4, 5]; 
    const categoryNames = outerCategories.map((id) => categoryNameMap[id]);

    const fetchProducts = async (categories, genders) => {
        try {
            setIsLoading(true); // 로딩 시작
            const filteredCategories = categories.length > 0 ? categories : outerCategories;
            const filteredGenders = genders.length > 0 ? genders : ['남성', '여성', '공용']; 
    
            const categoryParam = filteredCategories.map(cat => `categoryId=${cat}`).join('&');
            const genderParam = filteredGenders.map(gen => `gender=${gen}`).join('&');
            
            // 페이지 크기(size)를 100으로 설정
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&${genderParam}&size=92`;
    
            const response = await axios.get(url);
    
            setProducts(response.data.content);
            setTotalProducts(response.data.content.length);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };
    

    useEffect(() => {
        fetchProducts([], []);  
    }, []);

    const handleCategoryChange = (categoryId, isChecked) => {
        if (isChecked) {
            setSelectedCategories((prev) => [...prev, categoryId]); 
        } else {
            setSelectedCategories((prev) => prev.filter((id) => id !== categoryId)); 
        }
    };

    const handleGenderChange = (gender, isChecked) => {
        if (isChecked) {
            setSelectedGenders((prev) => [...prev, gender]); 
        } else {
            setSelectedGenders((prev) => prev.filter((g) => g !== gender)); 
        }
    };

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
                        allCategories={outerCategories}
                        onCategoryChange={handleCategoryChange} 
                        onGenderChange={handleGenderChange}  // 성별 필터 처리 함수 추가
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {products.length}개</h3> 
                    </ProductNumber>
                    <ProductListWrap category={selectedCategories.length > 0 ? selectedCategories : outerCategories} products={products} />  
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

export default OuterCate;
