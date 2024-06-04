import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import TestImage from '../Images/test01.png';
import axios from 'axios';

// 상품 정보를 받아오는 함수
const fetchProductData = async (productId) => {
    try {
        const response = await axios.get(`https://api.lim-it.one/api/v1/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

// 각각의 상품을 표시하는 컴포넌트
const Product = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 북마크 상태 변경
    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    // 상품 데이터 불러오기
    useEffect(() => {
        const getProductData = async () => {
            const data = await fetchProductData(productId);
            setProduct(data);
        };
        getProductData();
    }, [productId]);

    // 데이터 로딩 중이면 로딩 인디케이터 표시
    if (!product) {
        return <div>Loading...</div>;
    }

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(product.currentPrice) + "원";

    return (
        <ProductContainer>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                {/* 실제 이미지 URL로 변경 
                <img src={product.imageUrl || 'default_image_path'} alt='Product Thumbnail' /> */}
                <img src={TestImage} alt='Product Thumbnail' />
            </ThumbBox>
            <InfoBox>
                <BrandBookmark>
                    <Brand>
                        <h1>{product.brandNames.eng}</h1>
                    </Brand>
                </BrandBookmark>
                <Name>
                    <h2>{product.names.eng}</h2>
                </Name>
                <KoreaName>
                    <h3>{product.names.kor}</h3>
                </KoreaName>
                <Tag>
                    <TagText>택배</TagText>
                    <TagText>직거래</TagText>
                </Tag>
                <Price>
                    <h3>{formattedPrice}</h3>
                </Price>
            </InfoBox>
        </ProductContainer>
    );
};

const ProductListWrap = () => {
    return (
        <ProductListContainer>
            <ProductGroup>
                {/* 임시로 productId를 1~17로 설정, 실제는 동적으로 설정 필요 */}
                {Array.from({ length: 17 }, (_, i) => <Product key={i} productId={i + 1} />)}
            </ProductGroup>
        </ProductListContainer>
    );
};

const ProductListContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 600px) {
        width: 90%; 
        margin: 0 auto;
    }
`;

const ProductContainer = styled.div`
    width: 100%; 
    @media (max-width: 600px) {
        width: 100%;  
    }
`;

const ProductGroup = styled.div`
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

const ThumbBox = styled.div`
    position: relative;
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        @media (min-width: 1024px) {
            width: 100%;  
        }
`;

const BookmarkWrapper = styled.span`
    position: absolute;
    bottom: 7px; 
    right: 10px;
`;

const BrandBookmark = styled.div`
    justify-content: space-between;
    padding: 0;
`;

const Brand = styled.div`
    h1 {
        font-size: 15px;
        font-weight: bold;
        margin-top: -5px;
        @media (max-width: 600px) {
            font-size: 14px; 
        }
    }
`;

const Name = styled.div`
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

const KoreaName = styled.div`
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

const InfoBox = styled.div`
    margin-top: 10px;
`;

const Tag = styled.div`
    display: flex;
    margin-top: 5px;
`;

const TagText = styled.span`
    background-color: #ededed;
    padding: 4px 8px;
    font-size: 12px;
    margin-right: 5px;
`;

const Price = styled.div`
    h3 {
        font-size: 15px;
        margin-top: 8px;
        @media (max-width: 600px) {
            font-size: 14px; 
        }
    }
`;

export default ProductListWrap;