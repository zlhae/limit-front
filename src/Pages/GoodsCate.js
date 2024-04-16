import React, { useState } from 'react';
import Product from '../Components/Product';
import SubHeader from '../Components/SubHeader';
import SideFilterGoods from '../Components/SideFilter_goods';
import styled from 'styled-components';
import ProductListWrap from '../Components/Product';

const GoodsCate = () => {

    return (
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilterGoods />
                </SideFilterWrapper>
                <ProductWrapper className='product'>
                    <ProductNumber>
                        <h3> 상품 23,334개</h3>
                    </ProductNumber>
                    <ProductListWrap></ProductListWrap>
                    <ProductListWrap></ProductListWrap>
                    <ProductListWrap></ProductListWrap>
                </ProductWrapper>
            </ProductContainer>
            <test></test>
        </MainProduct>
    );
}

const MainProduct = styled.div`
    
`;

const ProductContainer = styled.div`
    display: flex; 
    
`;

const SideFilterWrapper = styled.div`
    margin-left: 10%;
`;

const ProductWrapper = styled.div`
    flex: 2;
    margin-bottom: 10px;
    margin-right: 20px;

    
    
`;

const ProductNumber = styled.h3`
    
`;

export default GoodsCate;