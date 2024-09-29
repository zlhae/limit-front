import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 상품 데이터를 가져오는 함수
const fetchProductData = async (brand = '', category = [], gender = '', page = 0, size = 829, sort = 'ASC') => {
    let categoryParam = '';
    if (category.length > 0) {
        categoryParam = category.map(cat => `category=${cat}`).join('&');
    }

    const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&gender=${gender}&page=${page}&size=${size}&sort=${sort}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data); // 데이터 확인용
        return response.data;
    } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        return { content: [] };  // 오류 시 빈 데이터 반환
    }
};

// 찜한 상품을 localStorage에서 가져오는 함수
const getSavedBookmarks = () => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
};

// 찜한 상품을 localStorage에 저장하는 함수
const saveBookmarks = (bookmarks) => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));
};

// 개별 상품 컴포넌트
const Product = ({ product }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);  // 찜 상태
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    // localStorage에서 찜 상태 불러오기
    useEffect(() => {
        const bookmarkedItems = getSavedBookmarks();
        if (bookmarkedItems.includes(product.id)) {
            setIsBookmarked(true);
        }
    }, [product.id]);

    // 찜 상태 변경 핸들러
    const handleBookmarkClick = (e) => {
        e.stopPropagation(); // 부모 클릭 이벤트 방지
        const bookmarkedItems = getSavedBookmarks();
        let updatedBookmarks;

        if (isBookmarked) {
            // 이미 찜한 상태라면 찜 취소
            updatedBookmarks = bookmarkedItems.filter(id => id !== product.id);
        } else {
            // 찜하지 않은 상태라면 찜 추가
            updatedBookmarks = [...bookmarkedItems, product.id];
        }

        saveBookmarks(updatedBookmarks); // 업데이트된 찜 목록을 localStorage에 저장
        setIsBookmarked(!isBookmarked);  // 찜 상태 업데이트
    };

    // 상품 클릭 시 상세 페이지로 이동
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
                    onError={(e) => e.target.src = LoadingImage}  // 이미지 로드 실패 시 대체 이미지 표시
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

// 전체 상품 리스트를 보여주는 컴포넌트
const ProductListWrap = ({ brand = '', category = [], gender = '', page = 0, size = 829, sort = 'ASC' }) => {
    const [products, setProducts] = useState([]);

    // 상품 데이터를 불러오는 useEffect
    useEffect(() => {
        const getProductData = async () => {
            const data = await fetchProductData(brand, category, gender, page, size, sort);
            setProducts(data.content);  // API 응답에서 상품 데이터 저장
        };

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

// 스타일 컴포넌트들
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
