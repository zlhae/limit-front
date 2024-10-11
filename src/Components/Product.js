import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import LoadingImage from '../Images/Loading.svg';

// 모든 찜한 상품을 서버에서 가져오는 함수
const fetchAllBookmarks = async () => {
    try {
        const token = localStorage.getItem('accessToken');
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
        const token = localStorage.getItem('accessToken');
        // 항상 PUT 요청을 사용하고, 요청 본문에 찜 상태를 전달
        const data = { wish: shouldBookmark };

        const response = await axios({
            method: 'PUT', // PUT 요청 사용
            url: `https://api.lim-it.one/api/v1/products/${productId}/wishes`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data
        });
        console.log('서버 응답:', response.data);
        return response.status === 200;
    } catch (error) {
        if (error.response) {
            // 서버가 응답을 반환한 경우
            console.error('서버 오류:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
        } else {
            // 서버가 응답하지 않은 경우
            console.error('요청 오류:', error.message);
        }
        return false;
    }
};


// 상품 컴포넌트
const Product = ({ product, bookmarkedProducts, updateBookmarks }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageSrc, setImageSrc] = useState(`https://${product.imageUrl}`);

    // 찜한 목록에 있는지 확인하여 상태 설정
    useEffect(() => {
        const isProductBookmarked = bookmarkedProducts.some(bookmarked => bookmarked.productId === product.id);
        setIsBookmarked(isProductBookmarked);
    }, [product.id, bookmarkedProducts]);

    // 찜 버튼 클릭 시 UI와 서버 동기화
    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        if (isUpdating) return; // 이미 업데이트 중이면 무시

        setIsUpdating(true); // 업데이트 중으로 설정
        const shouldBookmark = !isBookmarked;

        console.log('현재 찜 상태:', isBookmarked);
        console.log('변경할 찜 상태:', shouldBookmark);

        const success = await updateBookmarkStatus(product.id, shouldBookmark);
        if (success) {
            console.log('찜 상태 업데이트 성공');
            setIsBookmarked(shouldBookmark); // UI 상태 업데이트
            updateBookmarks(); // 찜 목록 업데이트
        } else {
            console.error('찜 상태 업데이트 실패');
        }
        setIsUpdating(false); // 업데이트 완료
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

// 상품 목록 컴포넌트
const ProductListWrap = ({ brand = '', category = [], gender = '', page = 0, size = 829, sort = 'ASC' }) => {
    const [products, setProducts] = useState([]);
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);

    // 모든 찜한 상품을 불러옵니다
    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        const bookmarks = await fetchAllBookmarks();
        setBookmarkedProducts(bookmarks);
    };

    // 상품 데이터를 불러옵니다
    useEffect(() => {
        const fetchProductData = async (brandId, category = [], gender = '', page = 0, size = 1000, sort = 'ASC') => {
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

        const getProductData = async () => {
            const data = await fetchProductData(brand, category, gender, page, size, sort);
            setProducts(data.content);
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
                            bookmarkedProducts={bookmarkedProducts} // 찜한 상품 목록 전달
                            updateBookmarks={loadBookmarks} // 찜 목록 업데이트 함수 전달
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
