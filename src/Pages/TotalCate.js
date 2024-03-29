import React, { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import ProductListWrap from '../Components/ProductListWrap';
import PlusMinusButton from '../Components/PlusMinusButton';
import SideFilter from '../Components/SideFilter';
import styled from 'styled-components';

const TotalCate = () => {
    /*const [isLeft,setIsLeft]=useState(true);

    const onClickLeft=()=>{
        setIsLeft(true);
    }
    const onClickRight=()=>{
        setIsLeft(false);
    }*/

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
                        <h3>상품 23,882</h3>
                    </ProductNumber>
                    <ProductListWrap />
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
}

const MainProduct = styled.div`
    
`;

const ProductContainer = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: flex-start;
`;

const SideFilterWrapper = styled.div`
    margin-right: 60px;
`;

const ProductWrapper = styled.div`
    
`;

const ProductNumber = styled.h3`
    font-size: 16px;
    font-weight: lighter;
`;

export default TotalCate;
