import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';
import ArrowLeftIcon from '../Images/arrow-left.svg';
import ArrowRightIcon from '../Images/arrow-right.svg';
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
        return response.status === 200;
    } catch (error) {
        console.error('찜 상태 업데이트 중 오류 발생:', error);
        return false;
    }
};

const RecentProduct = ({ product, bookmarkedProducts, updateBookmarks, index }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    useEffect(() => {
        const isProductBookmarked = Array.isArray(bookmarkedProducts) && 
            bookmarkedProducts.some(bookmarked => bookmarked.productId === product.id);
        setIsBookmarked(isProductBookmarked);
    }, [product.id, bookmarkedProducts]);

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        if (isUpdating) return;

        setIsUpdating(true);
        const shouldBookmark = !isBookmarked;

        const success = await updateBookmarkStatus(product.id, shouldBookmark);
        if (success) {
            setIsBookmarked(shouldBookmark);
            updateBookmarks();
        }
        setIsUpdating(false);
    };

    const handleProductClick = () => {
        navigate(`/productdetail/${product.id}`);
    };

    const handleImageError = () => {
        setImageSrc(LoadingImage);
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

const RecentProductListWrap = () => {
    const productListRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        loadBookmarks();
        fetchRecentProducts();
    }, []);

    const loadBookmarks = async () => {
        const bookmarks = await fetchAllBookmarks();
        setBookmarkedProducts(bookmarks);
    };

    // 배열을 섞는 함수
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// fetchRecentProducts 함수 수정
const fetchRecentProducts = async () => {
    try {
        const response = await axios.get('https://api.lim-it.one/api/v1/products', {
            params: { sort: 'releaseDate,desc', size: 30 }
        });
        const shuffledProducts = shuffleArray(response.data.content); // 상품 배열 섞기
        setProducts(shuffledProducts); // 상태에 무작위 데이터 설정
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
                        <RecentProduct 
                            key={product.id} 
                            product={product} 
                            index={index} 
                            bookmarkedProducts={bookmarkedProducts} 
                            updateBookmarks={loadBookmarks} // updateBookmarks 함수 전달
                        />
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

export default RecentProductListWrap;
