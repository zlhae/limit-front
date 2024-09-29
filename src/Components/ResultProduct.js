import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import { getSavedBookmarks, saveBookmarks, isProductBookmarked } from '../Utils/Bookmarks'; 
import LoadingImage from '../Images/Loading.svg';

const Product = ({ searchResults }) => {
    const navigate = useNavigate(); 

    const handleProductClick = (id) => {
        navigate(`/productdetail/${id}`);
    };

    return (
        <ProductListContainer>
            <ProductGroup>
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <SingleProduct key={product.id} product={product} handleProductClick={handleProductClick} />
                    ))
                ) : (
                    <NoResults>검색 결과가 없습니다.</NoResults>
                )}
            </ProductGroup>
        </ProductListContainer>
    );
};

const SingleProduct = ({ product, handleProductClick }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    useEffect(() => {
        setIsBookmarked(isProductBookmarked(product.id)); 
    }, [product.id]);

    const handleBookmarkClick = (e) => {
        e.stopPropagation(); 
        const savedBookmarks = getSavedBookmarks();
        let updatedBookmarks = [...savedBookmarks];

        if (isBookmarked) {
            updatedBookmarks = updatedBookmarks.filter(id => id !== product.id); 
        } else {
            updatedBookmarks.push(product.id);
        }

        saveBookmarks(updatedBookmarks);
        setIsBookmarked(!isBookmarked);
    };

    const handleImageError = () => {
        setImageSrc(LoadingImage);
    };

    return (
        <ProductContainer onClick={() => handleProductClick(product.id)}>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon
                        filled={isBookmarked}
                        onClick={handleBookmarkClick}
                    />
                </BookmarkWrapper>
                <img
                    src={imageSrc}
                    alt="Product Thumbnail"
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
                    <h3>{new Intl.NumberFormat('ko-KR').format(product.currentPrice)}원</h3>
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
