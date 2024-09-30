// 수정할 것 : 사이드바, 상품 갯수

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const OuterCate = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const categoryNameMap = {
        2: '자켓',
        3: '아노락',
        4: '코트',
        5: '패딩',
    };

    const outerCategories = [2, 3, 4, 5];

    const categoryNames = outerCategories.map((id) => categoryNameMap[id]);

    const allCategories = { 아우터: categoryNames };  

    const fetchProducts = async () => {
        try {
            const categoryParam = outerCategories.map(cat => `category=${cat}`).join('&');
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}`;
            
            const response = await axios.get(url);

            console.log("API Response:", response.data); 
            
            setProducts(response.data.content);
            setTotalProducts(response.data.totalElements);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <MainProduct>
                <SubHeader />
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter selectedCategory="outer" categories={categoryNames} allCategories={allCategories} />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap category={outerCategories} products={products} />  
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
