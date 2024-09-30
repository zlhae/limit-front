import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';

const fetchProductData = async (brand = '', category = [], gender = '', page = 0, size = 829, sort = 'ASC') => {
    let categoryParam = '';
    if (category.length > 0) {
        categoryParam = category.map(cat => `category=${cat}`).join('&');
    }

    const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&gender=${gender}&page=${page}&size=${size}&sort=${sort}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        return { content: [] };  
    }
};

const getSavedBookmarks = () => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
};

const saveBookmarks = (bookmarks) => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));
};

const Product = ({ product }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);  
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    useEffect(() => {
        const bookmarkedItems = getSavedBookmarks();
        if (bookmarkedItems.includes(product.id)) {
            setIsBookmarked(true);
        }
    }, [product.id]);

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        const bookmarkedItems = getSavedBookmarks();
        let updatedBookmarks;

        if (isBookmarked) {
            updatedBookmarks = bookmarkedItems.filter(id => id !== product.id);
        } else {
            updatedBookmarks = [...bookmarkedItems, product.id];
        }

        saveBookmarks(updatedBookmarks);
        setIsBookmarked(!isBookmarked); 
    };

    const handleProductClick = () => {
        navigate(`/productdetail/${product.id}`);
    };

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(product.currentPrice) + "원";

    return (
        <ProductContainer onClick={handleProductClick}>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img 
                    src={imageSrc} 
                    alt='Product Thumbnail' 
                    onError={(e) => e.target.src = LoadingImage} 
                />
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

const ProductListWrap = ({ brand = '', category = [], gender = '', page = 0, size = 829, sort = 'ASC' }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            const data = await fetchProductData(brand, category, gender, page, size, sort);
            setProducts(data.content);
        };
    
        // API 호출이 의존성 배열에 맞게 한 번만 실행되도록 보장
        getProductData();
    }, [brand, category, gender, page, size, sort]); 
    

    return (
        <ProductListContainer>
            <ProductGroup>
                {products.length > 0 ? (
                    products.map(product => (
                        <Product 
                            key={product.id} 
                            product={product}
                        />
                    ))
                ) : (
                    <p>상품이 없습니다.</p>
                )}
            </ProductGroup>
        </ProductListContainer>
    );
};

const ProductContainer = styled.div`
    width: 100%; 
    cursor: pointer;

    @media (max-width: 600px) {
        width: 100%;  
    }
`;

const ThumbBox = styled.div`
    position: relative;

    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        background-color: rgba(221, 126, 96, 0.15); /* 배경색과 투명도 설정 */
    }
`;

const BookmarkWrapper = styled.span`
    position: absolute;
    bottom: 7px; 
    right: 10px;
`;

const InfoBox = styled.div`
    margin-top: 10px;
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

const ProductListContainer = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
        width: 90%; 
        margin: 0 auto;
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


export default ProductListWrap;
