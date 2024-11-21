import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from "../Images/Loading.svg"

// 찜한 상품 조회 함수
const fetchAllBookmarks = async () => {
    try {
        const token = Cookies.get('accessToken');
        if (!token) {
            console.error('Access token이 없습니다.');
            return [];
        }

        const response = await axios.get('https://api.lim-it.one/api/v1/products/wishes', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('찜 목록을 가져오는 중 오류 발생:', error.message);
        return [];
    }
};

export default function Interest_Product() {
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                setLoading(true); // 로딩 시작
                const bookmarks = await fetchAllBookmarks();
                setBookmarkedProducts(bookmarks); // 데이터 저장
            } catch (error) {
                console.error('데이터 로드 중 오류 발생:', error.message);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        loadBookmarks();
    }, []);

    if (loading) {
        return (
            <Container>
                <p>로딩 중...</p>
            </Container>
        );
    }

    return (
        <Container>
            <Title>관심 상품 목록</Title>
            <ProductList>
                {bookmarkedProducts.length > 0 ? (
                    bookmarkedProducts.map((product) => (
                        <ProductCard key={product.productId}>
                            <ProductImage
                                src={`https://${product.imageUrl}`}
                                alt={product.engProductName}
                                onError={(e) => (e.target.src = Loading)} // 이미지 로드 실패 시 대체 이미지
                            />
                            <ProductInfo>
                                <h2>{product.engBrandName}</h2>
                                <p>{product.engProductName}</p>
                            </ProductInfo>
                        </ProductCard>
                    ))
                ) : (
                    <p>찜한 상품이 없습니다.</p>
                )}
            </ProductList>
        </Container>
    );
}

// 스타일링 컴포넌트
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 17.5px;
    font-weight: bold;
    margin-bottom: 20px;

    @media (max-width: 800px) {
        display: none;
    }
`;

const ProductList = styled.div`
    display: flex;
    width: 100%;
    height: 500px;
    padding: 15px;
    background-color: white;
    border-radius: 15px;
    flex-wrap: wrap;
    gap: 16px;
`;

const ProductCard = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: column;
    width: 150px;
    height: 50%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    align-items: center;
    text-align: center;
    background: #f9f9f9;

    @media (max-width: 600px) {
        width: 150px;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const ProductInfo = styled.div`
    h2 {
        font-size: 16px;
        font-weight: bold;
        margin: 5px 0;
    }

    p {
        font-size: 14px;
        color: #666;
    }
`;
