// 수정할 것 : 요즘 많이 거래된 상품 순으로 정렬

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import { getSavedBookmarks, saveBookmarks } from '../Utils/Bookmarks';
import ArrowLeftIcon from '../Images/arrow-left.svg';
import ArrowRightIcon from '../Images/arrow-right.svg'; 
import LoadingImage from '../Images/Loading.svg';

const MainProduct = ({ product, index }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);
    const navigate = useNavigate();

    useEffect(() => {
        const savedBookmarks = getSavedBookmarks();
        setIsBookmarked(savedBookmarks.includes(product.id));
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

        setIsBookmarked(!isBookmarked);
        saveBookmarks(updatedBookmarks); 
    };

    const handleProductClick = () => {
        navigate(`/productdetail/${product.id}`);
    };

    const handleImageError = () => {
        setImageSrc(LoadingImage);
    };

    return (
        <ProductContainer onClick={handleProductClick}>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon
                        filled={isBookmarked}
                        onClick={handleBookmarkClick} 
                    />
                </BookmarkWrapper>
                <img 
                    src={imageSrc} 
                    alt={`Product Thumbnail ${index}`} 
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
                    <h3>{product.currentPrice.toLocaleString()}원</h3>
                </Price>
            </InfoBox>
        </ProductContainer>
    );
};

const MainProductListWrap = () => {
    const productListRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const fetchRecentProducts = async () => {
        try {
            const response = await axios.get('https://api.lim-it.one/api/v1/products', {
                params: {
                    sort: 'releaseDate,desc',
                    size: 30,
                },
            });
            setProducts(response.data.content);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    const checkScrollButtons = () => {
        const { current } = productListRef;
        if (current) {
            const maxScrollLeft = current.scrollWidth - current.clientWidth;
            setCanScrollLeft(current.scrollLeft > 0);
            setCanScrollRight(current.scrollLeft < maxScrollLeft);
        }
    };

    useEffect(() => {
        fetchRecentProducts(); 
    }, []);

    useEffect(() => {
        const { current } = productListRef;
        if (current) {
            current.addEventListener('scroll', checkScrollButtons);
        }
        return () => {
            if (current) {
                current.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, []);

    const scrollProducts = (direction) => {
        if (productListRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            productListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScrollButtons, 200);
        }
    };

    return (
        <ProductListWrap>
            {canScrollLeft && <ArrowButton direction="left" onClick={() => scrollProducts('left')} />}
            <ProductListContainer ref={productListRef}>
                <ProductGroup>
                    {products.map((product, index) => (
                        <MainProduct key={product.id} product={product} index={index} />
                    ))}
                </ProductGroup>
            </ProductListContainer>
            {canScrollRight && <ArrowButton direction="right" onClick={() => scrollProducts('right')} />}
        </ProductListWrap>
    );
};

const ProductContainer = styled.div`
    width: 225px;  
    max-width: 225px;
    cursor: pointer;


    @media (max-width: 600px) {
        width: 150px;
        max-width: 150x;
    }
`;

const ThumbBox = styled.div`
    position: relative;

    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        background-color: rgba(114, 184, 223, 0.15);
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
        margin-top: -3px;

        @media (max-width: 600px) {
            font-size: 14px;
        }
    }
`;

const Name = styled.div`

    h2 {
        font-size: 13px;
        font-weight: 500;
        margin-top: -10px;
        overflow: hidden;
        white-space: nowrap; 
        text-overflow: ellipsis; 
        display: block; 
        
        @media (max-width: 600px) {
            font-size: 12px;
        }
    }
`;

const KoreaName = styled.div`

    h3 {
        font-size: 12px;
        font-weight: lighter;
        margin-top: -10px;
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
    margin-top: -5px;
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
        margin-top: 10px;

        @media (max-width: 600px) {
            font-size: 14px;
        }
    }
`;

const ProductListWrap = styled.div`
    width: 80%;
    margin: 0 auto;
    position: relative;

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 33.3%;
    transform: translateY(-50%);
    z-index: 10;
    background: url(${(props) => (props.direction === 'left' ? ArrowLeftIcon : ArrowRightIcon)}) no-repeat center center;
    background-size: contain;
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s;
    ${(props) => (props.direction === 'left' ? 'left: -25px;' : 'right: -25px;')}

    &:hover {
        opacity: 1;
    }

    @media (max-width: 600px) {
        width: 40px;
        height: 40px;
        ${(props) => (props.direction === 'left' ? 'left: -20px;' : 'right: -20px;')}
    }
`;

const ProductListContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ProductGroup = styled.div`
    display: flex;
    gap: 15px;
    
    @media (max-width: 600px) {
        gap: 10px;
    }
`;

export default MainProductListWrap;
