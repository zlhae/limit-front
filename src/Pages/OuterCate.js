import React, { useState } from 'react';
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
                        <h3>상품 23,329개</h3>
                    </ProductNumber>
                    <ProductListWrap></ProductListWrap>
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
}

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
        margin-left: 10%;
        font-size: 10px;
        color: #656565;
        margin-bottom: 25px;
    }
`;

export default OuterCate;