import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';
import Cookies from 'js-cookie';

const fetchAllBookmarks = async () => {
    try {
        const token = Cookies.get("accessToken");
        const response = await axios.get('https://api.lim-it.one/api/v1/products/wishes', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('찜 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};

const updateBookmarkStatus = async (productId, shouldBookmark) => {
    try {
        const token = Cookies.get("accessToken");
        const data = { wish: shouldBookmark };

        const response = await axios({
            method: 'PUT', 
            url: `https://api.lim-it.one/api/v1/products/${productId}/wishes`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data
        });
        console.log('서버 응답:', response.data);
        return response.status === 200;
    } catch (error) {
        if (error.response) {
            console.error('서버 오류:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
        } else {
            console.error('요청 오류:', error.message);
        }
        return false;
    }
};


const Product = ({ product, bookmarkedProducts, updateBookmarks }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    useEffect(() => {
        const isProductBookmarked = bookmarkedProducts.some(bookmarked => bookmarked.productId === product.id);
        setIsBookmarked(isProductBookmarked);
    }, [product.id, bookmarkedProducts]);

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        if (isUpdating) return; 

        setIsUpdating(true); 
        const shouldBookmark = !isBookmarked;

        console.log('현재 찜 상태:', isBookmarked);
        console.log('변경할 찜 상태:', shouldBookmark);

        const success = await updateBookmarkStatus(product.id, shouldBookmark);
        if (success) {
            console.log('찜 상태 업데이트 성공');
            setIsBookmarked(shouldBookmark); 
            updateBookmarks(); 
        } else {
            console.error('찜 상태 업데이트 실패');
        }
        setIsUpdating(false); 
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

const ProductListWrap = ({ brand = '', category = [], gender = '', sort = 'ASC' }) => {
    const [products, setProducts] = useState([]);
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [size, setSize] = useState(window.innerWidth <= 600 ? 18 : 20);

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth <= 600 ? 18 : 20);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        const bookmarks = await fetchAllBookmarks();
        setBookmarkedProducts(bookmarks);
    };

    const fetchProductData = async (pageNum) => {
        setIsLoading(true);
        const categoryParam = category.length > 0 ? category.map(cat => `category=${cat}`).join('&') : '';
        const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&gender=${gender}&page=${pageNum}&size=${size}&sort=${sort}`;

        try {
            const response = await axios.get(url);
            const newProducts = response.data.content;

            setProducts(prev => [...prev, ...newProducts]);
            setHasMore(newProducts.length === size);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setPage(0);
        setProducts([]);
        setHasMore(true);
        fetchProductData(0);
    }, [brand, category, gender, sort]);

    const loadMoreProducts = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchProductData(nextPage);
            return nextPage;
        });
    };

    return (
        <ProductListContainer>
            <ProductGroup>
                {products.map(product => (
                    <Product 
                        key={product.id} 
                        product={product}
                        bookmarkedProducts={bookmarkedProducts}
                        updateBookmarks={loadBookmarks}
                    />
                ))}
            </ProductGroup>
            {hasMore && !isLoading && (
                <LoadMoreButtonWrapper>
                    <LoadMoreButton onClick={loadMoreProducts}>더 보기</LoadMoreButton>
                </LoadMoreButtonWrapper>
            )}
            {isLoading && <p>로딩 중...</p>}
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
        background-color: rgba(221, 126, 96, 0.15);
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
    flex-direction: column;
    align-items: center;

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

const LoadMoreButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
`;

const LoadMoreButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 10px;
    border: 0.5px solid #d9d9d9; 
    background-color: #f0f0f0; 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #d9d9d9; 
    }
`;

export default ProductListWrap;
