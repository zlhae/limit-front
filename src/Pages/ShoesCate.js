import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import ProductListWrap from '../Components/Product';
import SideFilter from '../Components/SideFilter'; 

const ShoesCate = () => {
    const navigate = useNavigate(); // Replaced useHistory with useNavigate
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([7, 8, 9]); // 기본 신발 카테고리들

    const categoryNameMap = {
        7: '스니커즈',  
        8: '부츠',              
        9: '샌들/슬리퍼',           
    };

    const categoryNames = selectedCategories.map((id) => categoryNameMap[id]);

    const allCategories = { 신발: Object.values(categoryNameMap) };  

    // URL이 바뀔 때마다 상품 데이터를 가져오는 함수
    const fetchProducts = async (categoryParam) => {
        try {
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}`;
            const response = await axios.get(url);
            
            setProducts(response.data.content);
            setTotalProducts(response.data.totalElements);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // URL 파라미터에 맞춰 상품을 필터링
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category') || selectedCategories.map(cat => `category=${cat}`).join('&');
        
        fetchProducts(categoryParam);
    }, [selectedCategories]);

    // 카테고리 체크박스 클릭 시 URL을 변경
    const handleCategoryChange = (newCategories) => {
        setSelectedCategories(newCategories);
        
        // 카테고리 ID를 URL 파라미터로 추가
        const categoryParam = newCategories.map(cat => `category=${cat}`).join('&');
        navigate(`?${categoryParam}`);  // Replaced history.push with navigate
    };

    return (
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilter 
                        selectedCategory="shoes" 
                        categories={categoryNames} 
                        allCategories={allCategories} 
                        setSelectedCategories={handleCategoryChange} // 필터에서 선택된 카테고리를 업데이트하는 함수 전달
                    />
                </SideFilterWrapper>
                <ProductWrapper className='product'>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap category={selectedCategories} products={products} />  
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

// 스타일 컴포넌트 정의
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
