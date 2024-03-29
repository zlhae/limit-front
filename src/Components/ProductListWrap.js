import React, { useState } from 'react';
import Product from './Product';
import styled from 'styled-components';

const ProductListWrap = () => {
    return (
        <ProductListContainer className='product_list_wrap'>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
            <div className='product_item'>
                <Product />
            </div>
        </ProductListContainer>
    );
}

const ProductListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
    margin-right: 100px;

    .product_item {
        flex-basis: calc(50% - 15px); 
    }

    @media screen and (min-width: 768px) {
        .product_item {
            flex-basis: calc(25% - 15px);
        }
    }
`;

export default ProductListWrap;
