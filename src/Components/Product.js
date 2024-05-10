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
            <InfoBox>
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
            </InfoBox>
        </ProductContainer>
    );
}

const ProductListWrap = () => {
    return (
        <ProductListContainer>
            <ProductGroup>
                {Array.from({ length: 17 }, (_, i) => <Product key={i} />)}
            </ProductGroup>
        </ProductListContainer>
    );
}

const ProductListContainer = styled.div` /* ProductListWrap */
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
        width: 80%; 
        margin: 0 auto;
    }
`;

const ProductContainer = styled.div` /* 1개 Product */
    width: 100%; 

    @media (max-width: 600px) {
        width: 100%;  
    }
`;

const ProductGroup = styled.div` /* ProductListWrap 나열 */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16%, 1fr)); 
    gap: 20px;
    width: 100%;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); 
        gap: 15px;
        margin-top: -15px;
    }
`;

const ThumbBox = styled.div` /* 상품 이미지 */
    position: relative;
    
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;

        @media (min-width: 1024px) {
            width: 100%;  
        }
`;

const BookmarkWrapper = styled.span` /* 북마크 */
    position: absolute;
    bottom: 7px; 
    right: 10px;
`;

const BrandBookmark = styled.div` /* 브랜드 위치 */
    justify-content: space-between;
    padding: 0;
`;

const Brand = styled.div` /* 브랜드 */
    h1 {
        font-size: 15px;
        font-weight: bold;
        margin-top: -5px;

        @media (max-width: 600px) {
            font-size: 14px; 
        }
    }
`;

const Name = styled.div` /* 영어 이름 */
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin-top: -5px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
`;

const KoreaName = styled.div` /* 한글 이름 */
    h3 {
        font-size: 12px;
        font-weight: lighter;
        margin-top: -5px;
        color: #6D6D6D;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 

        @media (max-width: 600px) {
            font-size: 11px; 
        }
    }
`;

const InfoBox = styled.div` /* 브랜드, 영어 이름, 한글 이름, 택배, 직거래, 가격 위치 */
    margin-top: 10px;
`;

const Tag = styled.div` /* 택배, 직거래 위치 */
    display: flex;
    margin-top: 5px;
`;

const TagText = styled.span` /* 택배, 직거래 */
    background-color: #ededed;
    padding: 4px 8px;
    font-size: 12px;
    margin-right: 5px;
`;

const Price = styled.div` /* 가격 */
    h3 {
        font-size: 15px;
        margin-top: 8px;

        @media (max-width: 600px) {
            font-size: 14px; 
        }
    }
`;

export default ProductListWrap;