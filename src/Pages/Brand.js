import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SideFilter from '../Components/SideFilter';
import ProductListWrap from '../Components/BrandProduct';

const Brand = () => {
    const allCategories = {
        아우터: ['자켓', '아노락', '코트', '패딩', '기타 아우터'],
        상의: ['반팔 티셔츠', '긴팔 티셔츠', '가디건', '셔츠', '후드', '후드 집업', '스웨트셔츠', '슬리브리스', '원피스', '니트', '기타 상의'],
        하의: ['바지', '반바지', '스커트', '레깅스', '기타 하의'],
        신발: ['스니커즈', '샌들/슬리퍼', '플랫', '로퍼', '더비/레이스업', '힐/펌프스', '부츠', '기타 신발'],
        가방: ['프리미엄가방', '미니백', '백팩', '숄더백', '토트백', '크로스백', '클러치', '더플백', '에코백', '캐리어', '기타 가방'],
        패션잡화: ['비니', '버킷햇', '볼캡', '기타 모자', '머플러', '스카프', '넥타이', '장갑', '양말', '기타 패션잡화']
    };

    const { brandId } = useParams();   
    const [brandData, setBrandData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchBrandData = async () => {    
        try {
            const response = await axios.get(`https://api.lim-it.one/api/v1/brands`);
            const brand = response.data.find((b) => b.id === parseInt(brandId));
            if (brand) {
                setBrandData(brand); 
            } else {
                setError('해당 브랜드를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('브랜드 데이터를 가져오는 중 오류 발생:', error);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://api.lim-it.one/api/v1/products?brandId=${brandId}`);
            setProducts(response.data.content);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchBrandData();
        fetchProducts(); 
    }, [brandId]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <MainProduct>
            <ImageWrapper>
                <img src={`https://${brandData.imageUrl}`} alt={`${brandData.nameEng} 배경 이미지`} />
                <LogoContainer>
                    <LogoImage>
                        <img src={`https://${brandData.logoUrl}`} alt={`${brandData.nameEng} 로고`} />
                    </LogoImage>
                    <BrandInfo>
                        <BrandName>{brandData.nameEng}</BrandName>
                        <BrandNameKorean>{brandData.nameKor}</BrandNameKorean>
                    </BrandInfo>
                </LogoContainer>
            </ImageWrapper>
            <ProductContainer>
                <SideFilterWrapper>
                    <SideFilter allCategories={allCategories} />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductNumber>
                        <h3>상품 {products.length}개</h3> 
                    </ProductNumber>
                    <ProductListWrap brandId={brandId} products={products} setProducts={setProducts} /> 
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

const MainProduct = styled.div`'
`;

const ImageWrapper = styled.div`
    position: relative;

    img {
        width: 100%;
        height: auto;
    }
`;

const LogoContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 10%;

    @media (max-width: 600px) {
        display: none;
    }
`;

const LogoImage = styled.div`
    width: 8vw; 
    height: 8vw; 
    max-width: 100px; 
    max-height: 100px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

const BrandInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5vw;
    margin-left: 20px;

    @media (max-width: 720px) {
        margin-top: 0.8vw;
    }
`;

const BrandName = styled.div`
    font-size: 25px;
    font-weight: bold; 
    color: black;

    @media (max-width: 720px) {
        font-size: 20px;
    }
`;

const BrandNameKorean = styled.div`
    font-size: 15px; 
    margin-top: 2px;
    color: #6d6d6d;
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

