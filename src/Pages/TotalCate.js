import React, { useState } from 'react';
import Product from '../Components/Product';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter';
import styled from 'styled-components';
import ProductListWrap from '../Components/Product';

const TotalCate = () => {

    return (
        <MainProduct className='main_product'>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilter />
                </SideFilterWrapper>
                <ProductWrapper className='product'>
                    <ProductNumber>            
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
display; flex;
justify-content: flex-end;
    
`;

const SideFilterWrapper = styled.div`
   margin-left: 10%;
`;

const ProductWrapper = styled.div`
   margin-left: 10%;
`;

const ProductNumber = styled.h3`
    
`;

export default TotalCate;