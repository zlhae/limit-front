import React, { useState } from 'react';
import Product from '../Components/Product';
import SubHeader from '../Components/SubHeader';
import SideFilterOuter from '../Components/SideFilter_outer';
import styled from 'styled-components';
import ProductListWrap from '../Components/Product';

const OuterCate = () => {

    return (
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilterOuter />
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
    width: 80%;
    margin: 0 auto;

    @media (max-width: 1100px) {
        width: 80%;
    }
    
`;

const SideFilterWrapper = styled.div`
    
`;

const ProductWrapper = styled.div`
    

    
    
`;

const ProductNumber = styled.h3`
    
`;

export default OuterCate;