import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const GoodsCate = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const categoryNameMap = {
        33: '비니',
        34: '베레모',
        35: '볼캡',
        36: '스냅백',
        37: '기타 모자',
        38: '장갑',
    };

    const goodsCategories = [33, 34, 35, 36, 37, 38];

    const categoryNames = goodsCategories.map((id) => categoryNameMap[id]);

    const allCategories = { 패션잡화: categoryNames };  

    const fetchProducts = async () => {
        try {
            const categoryParam = goodsCategories.map(cat => `category=${cat}`).join('&');
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
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilter selectedCategory="goods" categories={categoryNames} allCategories={allCategories} />
                </SideFilterWrapper>
                <ProductWrapper className='product'>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap category={goodsCategories} products={products} />  
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

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

export default GoodsCate;
