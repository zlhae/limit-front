import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';

const Product = ({ searchResults }) => {
    const navigate = useNavigate(); 
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('https://api.lim-it.one/api/v1/products/wishes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setBookmarkedProducts(response.data);
        } catch (error) {
            console.error('찜 목록을 가져오는 중 오류 발생:', error);
        }
    };

    const updateBookmarks = async (productId, shouldBookmark) => {
        try {
            const token = localStorage.getItem('accessToken');
            const data = { wish: shouldBookmark };
            const response = await axios({
                method: 'PUT',
                url: `https://api.lim-it.one/api/v1/products/${productId}/wishes`,
                headers: { 'Authorization': `Bearer ${token}` },
                data: data
            });
            if (response.status === 200) {
                loadBookmarks(); 
            }
        } catch (error) {
            console.error('찜 상태를 업데이트하는 중 오류 발생:', error);
        }
    };

    const handleProductClick = (id) => {
        navigate(`/productdetail/${id}`);
    };

    return (
        <ProductListContainer>
            <ProductGroup>
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <SingleProduct 
                            key={product.id} 
                            product={product} 
                            handleProductClick={handleProductClick} 
                            bookmarkedProducts={bookmarkedProducts} 
                            updateBookmarks={updateBookmarks}
                        />
                    ))
                ) : (
                    <NoResults>검색 결과가 없습니다.</NoResults>
                )}
            </ProductGroup>
        </ProductListContainer>
    );
};

const SingleProduct = ({ product, handleProductClick, bookmarkedProducts, updateBookmarks }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);
    

    // 찜한 목록에 있는지 확인하여 상태 설정
    useEffect(() => {
        if (bookmarkedProducts && Array.isArray(bookmarkedProducts)) {
            const isProductBookmarked = bookmarkedProducts.some(bookmarked => bookmarked.productId === product.id);
            setIsBookmarked(isProductBookmarked);
        }
    }, [product.id, bookmarkedProducts]);

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        if (isUpdating) return;

        setIsUpdating(true);
        const shouldBookmark = !isBookmarked;
        await updateBookmarks(product.id, shouldBookmark);
        setIsUpdating(false);
    };

    const handleImageError = () => {
        setImageSrc(LoadingImage);
    };

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(product.currentPrice) + "원";

    return (
        <ProductContainer onClick={() => handleProductClick(product.id)}>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img 
                    src={imageSrc} 
                    alt='Product Thumbnail' 
                    onError={handleImageError} 
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


const NoResults = styled.p`
    font-size: 15px;
    color: black;
`;

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
        background-color: rgba(221, 126, 96, 0.15); 

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

export default Product;