import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import TestImage from '../Images/test01.png';
import ProductDetail from '../Pages/ProductDetail';


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
                    price: productData.currentPrice,
                    nameEng: productData.names.eng,
                    nameKor: productData.names.kor,
                    brandNameEng: productData.brandNames.eng,
                    imageUrl: productData.imageUrl
                };
                setProduct(formattedProductData);
            }
        };
        getProductData();
    }, [productId, brand, category, gender, page, size, sort]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(product.price) + "원";

    return (
        <ProductContainer onClick={handleProductClick}>

            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img 
                    src={TestImage} 
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
                {Array.from({ length: 20 }, (_, i) => (
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
