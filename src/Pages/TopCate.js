import React, { useState } from 'react';
import Product from '../Components/Product';
import SubHeader from '../Components/SubHeader';
import SideFilterTop from '../Components/SideFilter_top';
import styled from 'styled-components';
import ProductListWrap from '../Components/Product';

const TopCate = () => {

    return (
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilterTop />
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

export default TopCate;