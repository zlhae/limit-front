import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const ShoesCate = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const [selectedGenders, setSelectedGenders] = useState([]);  

    const categoryNameMap = {
        7: '스니커즈',  
        8: '부츠',              
        9: '샌들/슬리퍼',           
    };

    const shoesCategories = [7, 8, 9];
    const categoryNames = shoesCategories.map((id) => categoryNameMap[id]);

    // 상품을 가져오는 함수
    const fetchProducts = async (categories, genders) => {
        try {
            // 필터 적용: 기본적으로 모든 카테고리와 성별을 선택
            const filteredCategories = categories.length > 0 ? categories : shoesCategories;
            const filteredGenders = genders.length > 0 ? genders : ['남성', '여성', '공용'];

            // URL에 필터링된 카테고리 및 성별을 쿼리로 추가하고 페이지 크기(size)를 125로 설정
            const categoryParam = filteredCategories.map(cat => `categoryId=${cat}`).join('&');
            const genderParam = filteredGenders.map(gen => `gender=${encodeURIComponent(gen)}`).join('&');
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&${genderParam}&size=125`; // 페이지 크기 125로 설정

            // API 요청
            const response = await axios.get(url);
            setProducts(response.data.content);
            setTotalProducts(response.data.content.length);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // 필터 상태가 변경되면 상품을 다시 가져오는 함수
    useEffect(() => {
        fetchProducts(selectedCategories, selectedGenders);
    }, [selectedCategories, selectedGenders]);

    // 카테고리 필터 처리
    const handleCategoryChange = (categoryId, isChecked) => {
        const updatedCategories = isChecked
            ? [...selectedCategories, categoryId]  // 카테고리 추가
            : selectedCategories.filter((id) => id !== categoryId);  // 카테고리 제거

        setSelectedCategories(updatedCategories); // 필터 변경 후 바로 상태 업데이트
    };

    // 성별 필터 처리
    const handleGenderChange = (gender, isChecked) => {
        const updatedGenders = isChecked
            ? [...selectedGenders, gender]  // 성별 추가
            : selectedGenders.filter((g) => g !== gender);  // 성별 제거

        setSelectedGenders(updatedGenders);  // 필터 변경 후 바로 상태 업데이트
    };

    return (
        <MainProduct>
            <SubHeader />
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter 
                        categories={categoryNames}
                        allCategories={shoesCategories}
                        onCategoryChange={handleCategoryChange} 
                        onGenderChange={handleGenderChange}  // 성별 필터 전달
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap 
                        category={selectedCategories.length > 0 ? selectedCategories : shoesCategories} 
                        products={products} 
                    /> 
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

// 스타일 정의
const MainProduct = styled.div``;

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

export default ShoesCate;
