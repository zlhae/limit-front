import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import Product from "./Product";

const fetchAllBookmarks = async () => {
    try {
        const token = Cookies.get("accessToken");
        const response = await axios.get('https://api.lim-it.one/api/v1/products/wishes', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('찜 목록을 가져오는 중 오류 발생 :', error);
        return [];
    }
};

export default function Interest_Product() {
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            const bookmarks = await fetchAllBookmarks();
            setBookmarkedProducts(bookmarks);
        };

        loadBookmarks();
    }, []);
    return (
        <Container>
            <Title>관심 상품 목록</Title>
            <ProductList>
                {bookmarkedProducts.length > 0 ? (
                    bookmarkedProducts.map(product => (
                        <Product 
                            key = {product.id} 
                            product = {product} 
                            bookmarkedProducts = {bookmarkedProducts} 
                            updateBookmarks={() => setBookmarkedProducts(bookmarkedProducts)} 
                        />
                    ))
                ) : (
                    <p>찜한 상품이 없습니다.</p>
                )}
            </ProductList>
        </Container>
    );
}

const Container = styled.div` // 최상위 부모컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 17.5px;
    font-weight: bold;

    @media (max-width: 800px) {
        display: none;
    }
`;

const ProductList = styled.div` 
    display: flex;
    flex-wrap: wrap;
    gap: 16px; 
`;