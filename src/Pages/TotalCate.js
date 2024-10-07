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

         const fetchProducts = async (categories) => {
             try {
                 const filteredCategories = categories.length > 0 ? categories : totalCategories;
     
                 const categoryParam = filteredCategories.map(cat => `categoryId=${cat}`).join('&');
                 const url = `https://api.lim-it.one/api/v1/products?${categoryParam}`;
     
                 const response = await axios.get(url);
     
                 setProducts(response.data.content);
                 setTotalProducts(response.data.content.length);
             } catch (error) {
                 console.error('상품 데이터를 가져오는 중 오류 발생:', error);
             }
         };
     
         useEffect(() => {
             fetchProducts([]); 
         }, []);
     
         const handleCategoryChange = (categoryId, isChecked) => {
             if (isChecked) {
                 setSelectedCategories((prev) => [...prev, categoryId]); 
             } else {
                 setSelectedCategories((prev) => prev.filter((id) => id !== categoryId)); 
             }
         };
     
         useEffect(() => {
             fetchProducts(selectedCategories);
         }, [selectedCategories]);
     
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
                         <ProductListWrap category={selectedCategories.length > 0 ? selectedCategories : totalCategories} products={products} />  
                     </ProductWrapper>
                 </ProductContainer>
             </MainProduct>
         );
     };

const MainProduct = styled.div`
`;

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

export default TotalCate;
