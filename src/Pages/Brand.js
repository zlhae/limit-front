import React, { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import SideFilter from '../Components/SideFilter';
import styled from 'styled-components';
import ProductListWrap from '../Components/Product';
import adidas_brand from '../Images/adidas_brand.jpeg';
import adidas from '../Images/adidas.jpg';

const Brand = () => {

    const allCategories = {
        아우터: ['자켓', '아노락', '코트', '패딩', '기타 아우터'],
        상의: ['반팔 티셔츠', '긴팔 티셔츠', '가디건', '셔츠', '후드', '후드 집업', '스웨트셔츠', '슬리브리스', '원피스', '니트', '기타 상의'],
        하의: ['바지', '반바지', '스커트', '레깅스', '기타 하의'],
        신발: ['스니커즈', '샌들/슬리퍼', '플랫', '로퍼', '더비/레이스업', '힐/펌프스', '부츠', '기타 신발'],
        가방: ['프리미엄가방', '미니백', '백팩', '숄더백', '토트백', '크로스백', '클러치', '더플백', '에코백', '캐리어', '기타 가방'],
        패션잡화: ['비니', '버킷햇', '볼캡', '기타 모자', '머플러', '스카프', '넥타이', '장갑', '양말', '기타 패션잡화']
    };

    return (
        <MainProduct className='main_product'>
            <ImageWrapper>
                <img src={adidas_brand} alt="Adidas Brand" />
                <LogoContainer>
                    <LogoImage>
                        <img src={adidas} alt="Adidas Logo" />
                    </LogoImage>
                    <BrandName>Adidas</BrandName>
                    <BrandNameKorean>아디다스</BrandNameKorean>
                </LogoContainer>
            </ImageWrapper>
            <ProductContainer className='product_container'>
                <SideFilterWrapper className='side_filter'>
                    <SideFilter allCategories={allCategories} />
                </SideFilterWrapper>
                <ProductWrapper className='product'>
                    <ProductNumber>
                        <h3>상품 154,329개</h3>
                    </ProductNumber>
                    <ProductListWrap />
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
}

const MainProduct = styled.div``;

const ImageWrapper = styled.div`
    position: relative;
    img {
        width: 100%;
        height: auto;
    }
`;

const LogoContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const LogoImage = styled.div`
    width: 15vw; /* 로고 크기를 뷰포트 너비의 10%로 설정 */
    height: 15vw; /* 로고 크기를 뷰포트 너비의 10%로 설정 */
    max-width: 170px; /* 최대 크기를 100px로 설정 */
    max-height: 170px; /* 최대 크기를 100px로 설정 */

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

const BrandName = styled.div`
    font-size: 1.5vw; /* 글자 크기를 뷰포트 너비의 2%로 설정 */
    font-weight: bold;
    margin-top: 3px;
    color: black;
    max-font-size: 13px; /* 최대 글자 크기 설정 */

    @media (max-width: 600px) {
        font-size: 3vw; 
    }
`;

const BrandNameKorean = styled.div`
    font-size: 1vw; 
    margin-top: 3px;
    color: black;
    max-font-size: 13px; /* 최대 글자 크기 설정 */

    @media (max-width: 600px) {
        font-size: 2vw; 
        margin-top: -2px;
    }
`;

const ProductContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;

    @media (max-width: 600px) {
        flex-direction: column;
        margin-top: 47px;
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

export default Brand;
