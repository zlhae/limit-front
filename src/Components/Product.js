import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import test1 from '../Images/1.webp';
import test2 from '../Images/2.webp';
import test3 from '../Images/3.webp';
import test4 from '../Images/4.webp';
import test5 from '../Images/5.webp';
import test6 from '../Images/6.webp';
import test7 from '../Images/7.webp';
import test8 from '../Images/8.webp';
import test9 from '../Images/9.webp';
import test10 from '../Images/10.webp';
import test11 from '../Images/11.webp';
import test12 from '../Images/12.webp';
import test13 from '../Images/13.webp';
import test14 from '../Images/14.webp';
import test15 from '../Images/15.webp';
import test16 from '../Images/16.webp';
import test17 from '../Images/17.webp';
import test18 from '../Images/18.webp';
import test19 from '../Images/19.webp';
import test20 from '../Images/20.webp';
import test21 from '../Images/21.webp';
import test22 from '../Images/22.webp';
import test23 from '../Images/23.webp';
import test24 from '../Images/24.webp';
import test25 from '../Images/25.webp';
import test26 from '../Images/26.webp';
import test27 from '../Images/27.webp';

const imageArray = [
    test1, test2, test3, test4, test5, test6, test7, test8, test9, test10,
    test11, test12, test13, test14, test15, test16, test17, test18, test19,
    test20, test21, test22, test23, test24, test25, test26, test27
];

const fetchProductData = async (brand, category = [], gender = '', page = 0, size = 20, sort = 'ASC') => {
    const categoryParam = category.map(cat => `category=${cat}`).join('&');
    const url = `https://api.lim-it.one/api/v1/products?brand=${brand}&gender=${gender}&${categoryParam}&page=${page}&size=${size}&sort=${sort}`;
    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data); // 데이터 확인
        return response.data;
    } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        return { content: [] };
    }
};

const Product = ({ productId, brand, category, gender, page, size, sort }) => {
    const [product, setProduct] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleProductClick = () => {
        navigate(`/productdetail`);
    };

    useEffect(() => {
        const getProductData = async () => {
            const data = await fetchProductData(brand, category, gender, page, size, sort);
            const productData = data.content.find(item => item.id === productId);
            console.log('Product Data:', productData); // 데이터 확인
            if (productData) {
                const formattedProductData = {
                    price: productId === 1 ? 293000 : productData.currentPrice,
                    nameEng: productId === 1 ? "Jordan1 x Travis Scott x Fragment Retro Low OG SP Military Blue" : productData.names.eng,
                    nameKor: productId === 1 ? "조던 1 x 트래비스 스캇 x 프라그먼트 레트로 로우 OG SP 밀리터리 블루" : productData.names.kor,
                    brandNameEng: productId === 1 ? " Nike" : productData.brandNames.eng,
                    imageUrl: productData.imageUrl
                };
                setProduct(formattedProductData);
            }
        };
        getProductData();
    }, [productId, brand, category, gender, page, size, sort]);

    if (!product) {
        //return <div>Loading...</div>;
        return <div></div>;
    }

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(product.price) + "원";
    const imageUrl = imageArray[productId - 1] || 'default_image_path';

    return (
        <ProductContainer onClick={handleProductClick}>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img 
                    src={imageUrl} 
                    alt='Product Thumbnail' 
                    onError={(e) => e.target.src = 'default_image_path'} 
                />
            </ThumbBox>
            <InfoBox>
                <BrandBookmark>
                    <Brand>
                        <h1>{product.brandNameEng}</h1>
                    </Brand>
                </BrandBookmark>
                <Name>
                    <h2>{product.nameEng}</h2>
                </Name>
                <KoreaName>
                    <h3>{product.nameKor}</h3>
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

const ProductListWrap = ({ brand = 'adidas', category = [2], gender = '', page = 0, size = 20, sort = 'ASC' }) => {
    return (
        <ProductListContainer>
            <ProductGroup>
                {Array.from({ length: 27 }, (_, i) => (
                    <Product 
                        key={i} 
                        productId={i + 1} 
                        brand={brand} 
                        category={category}
                        gender={gender}
                        page={page} 
                        size={size} 
                        sort={sort} 
                    />
                ))}
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
    cursor: pointer;
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
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); 
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
        background-color: rgba(221, 126, 96, 0.15); /* 배경색과 투명도 설정 */

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
