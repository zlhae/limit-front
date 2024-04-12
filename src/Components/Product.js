import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import TestImage from '../Images/test01.png';

const Product = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <ProductContainer>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img src={TestImage} alt='Product Thumbnail' />
            </ThumbBox>
            <div className='info_box'>
                <BrandBookmark>
                    <Brand>
                        <h1>Asics</h1>
                    </Brand>
                </BrandBookmark>
                <Name>
                    <h2>Asics Unlimited Gel-Kayano 14 Carrier Grey Black</h2>
                </Name>
                <KoreaName>
                    <h3>아식스 언리미티드 젤 카야노 14 캐리어 그레이 블랙</h3>
                </KoreaName>
                <Tag>
                    <TagText>택배</TagText>
                    <TagText>직거래</TagText>
                </Tag>
                <Price>
                    <h3>310,000원</h3>
                </Price>
            </div>
        </ProductContainer>
    );
}

const ProductListWrap = () => {
    return (
        <ProductListContainer className='product_list_wrap'>
            <ProductGroup>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </ProductGroup>
        </ProductListContainer>
    );
}

const ProductListContainer = styled.div`

    flex-wrap: wrap;
`;

const ProductContainer = styled.div`
    flex: 2;
    width: 16%;
`;

const ProductGroup = styled.div`

    margin-left: 45px;
    gap: 25px;
    display: flex;
    flex-wrap: wrap;
    
    @media (max-width: 1100px) {
        gap: 10px;
        margin-left: 45px;
    }

`;

const ThumbBox = styled.div`
    flex: 2;
    position: relative;
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
`;

const BrandBookmark = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Brand = styled.div`
    h1 {
        font-size: 14px;
        font-weight: bold;
        margin-top: -3px;
    }
`;

const BookmarkWrapper = styled.span`
    position: absolute;
    bottom: 5px; 
    right: 7px;
`;

const Name = styled.div`
    h2 {
        font-size: 13px;
        font-weight: 500;
        width: 100%;
        margin-top: -7px;
    }
`;

const KoreaName = styled.div`
    h3 {
        font-size: 11px;
        font-weight: lighter;
        width: 100%;
        color: #6D6D6D;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
        margin-top: -3px;
    }
`;

const Tag = styled.div`
    display: inline-block;
`;

const TagText = styled.span`
    background-color: #d9d9d9;
    padding: 4px 8px;
    font-size: 12px;

    &:not(:last-child) {
        margin-right: 5px;
    }

    @media (max-width: 1100px) {
        font-size: 10px;
        padding: 4px 4px;
    }
`;

const Price = styled.div`
    h3 {
        font-size: 14px;
    }
`;

export default ProductListWrap;