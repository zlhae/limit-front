import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter'; 
import ProductListWrap from '../Components/Product';

const TotalCate = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const [page, setPage] = useState(0); // 현재 페이지 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터 여부

    const categoryNameMap = {
        2: '자켓',
        3: '아노락',
        4: '코트',
        5: '패딩',
        7: '스니커즈',
        8: '부츠',
        9: '샌들/슬리퍼',
        11: '반팔 티셔츠',
        12: '긴팔 티셔츠',
        13: '셔츠',
        14: '후드',
        15: '후드 집업',
        16: '스웨트셔츠',
        17: '슬리브리스',
        18: '원피스',
        19: '니트',
        21: '바지',
        22: '반바지',
        23: '스커트',
        24: '레깅스',
        26: '미니백',
        27: '백팩',
        28: '숄더백',
        29: '토트백',
        30: '크로스백',
        31: '더플백',
        33: '비니',
        34: '베레모',
        35: '볼캡',
        36: '스냅백',
        37: '기타 모자',
        38: '장갑',
    };

    const totalCategories = 
        [2, 3, 4, 5,
         7, 8, 9, 
         11, 12, 13, 14, 15, 16, 17, 18, 19, 
         21, 22, 23, 24,
         26, 27, 28, 29, 30, 31, 
         33, 34, 35, 36, 37, 38];

    const categoryNames = totalCategories.map((id) => categoryNameMap[id]);

    // 상품 데이터를 페이징 방식으로 가져오는 함수
    const fetchProducts = async (categories, pageNum = 0) => {
        if (isLoading) return; // 로딩 중이면 추가 요청 방지
        setIsLoading(true); // 로딩 상태 시작

        try {
            const filteredCategories = categories.length > 0 ? categories : totalCategories;

            const categoryParam = filteredCategories.map(cat => `categoryId=${cat}`).join('&');
            const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&size=50&page=${pageNum}`;

            const response = await axios.get(url);

            const newProducts = response.data.content;

            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            setTotalProducts(response.data.totalElements); // 전체 상품 수 설정
            setHasMore(newProducts.length === 50); // 더 가져올 데이터가 있는지 확인
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    };

    // 페이지 로드 시 첫 상품 로드
    useEffect(() => {
        fetchProducts(selectedCategories, page);
    }, []);

    // 선택된 카테고리 필터 변경 시 상품 로드
    useEffect(() => {
        setProducts([]); // 카테고리 변경 시 기존 상품 초기화
        setPage(0); // 페이지 번호 초기화
        fetchProducts(selectedCategories, 0); // 첫 페이지부터 다시 로드
    }, [selectedCategories]);

    // 더 많은 상품을 가져오는 함수
    const loadMoreProducts = () => {
        if (hasMore) {
            const nextPage = page + 1;
            setPage(nextPage); // 페이지 증가
            fetchProducts(selectedCategories, nextPage); // 다음 페이지 로드
        }
    };

    const handleCategoryChange = (categoryId, isChecked) => {
        if (isChecked) {
            setSelectedCategories((prev) => [...prev, categoryId]); 
        } else {
            setSelectedCategories((prev) => prev.filter((id) => id !== categoryId)); 
        }
    };

    return (
        <MainProduct>
            <SubHeader />
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter 
                        categories={categoryNames}
                        allCategories={totalCategories}
                        onCategoryChange={handleCategoryChange} 
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {totalProducts}개</h3>
                    </ProductNumber>
                    <ProductListWrap 
                        category={selectedCategories.length > 0 ? selectedCategories : totalCategories} 
                        products={products} 
                    />  
                    {hasMore && !isLoading && (
                        <LoadMoreButton onClick={loadMoreProducts}>
                            더 보기
                        </LoadMoreButton>
                    )}
                    {isLoading && <LoadingMessage>상품을 불러오는 중...</LoadingMessage>}
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

const MainProduct = styled.div``;

const ProductContainer = styled.div`
    margin-top: -20px;
    display: flex;
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const SideFilterWrapper = styled.div`
    margin-left: 10%; 
    width: 210px;

    @media (max-width: 600px) {
        width: 100%; 
        margin-left: 0; 
        order: -1; 
    }
`;

const ProductWrapper = styled.div`
    flex-grow: 1;
    margin-right: 10%; 
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
        margin: 0 auto;
        width: 100%; 
    }
`;

const ProductNumber = styled.h3`
    margin-top: 30px;
    font-size: 12px;
    color: #656565;
    
    @media (max-width: 600px) {
        margin-left: 5%;
        font-size: 10px;
        color: #656565;
        margin-bottom: 25px;
    }
`;

const LoadMoreButton = styled.button`
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const LoadingMessage = styled.p`
    text-align: center;
    margin-top: 20px;
    color: #333;
`;

export default TotalCate;
