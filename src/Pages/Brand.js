import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SideFilter from '../Components/SideFilter';
import ProductListWrap from '../Components/BrandProduct';

const Brand = () => {
    const { brandId } = useParams();
    const [brandData, setBrandData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
  
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

    const totalCategories = Object.keys(categoryNameMap).map(Number);

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
            const categoryParam = selectedCategories.length
                ? selectedCategories.map((cat) => `categoryId=${cat}`).join('&')
                : '';
            const genderParam = selectedGenders.length
                ? selectedGenders.map((gen) => `gender=${gen}`).join('&')
                : '';
            const url = `https://api.lim-it.one/api/v1/products?brandId=${brandId}&${categoryParam}&${genderParam}`;
            const response = await axios.get(url);
            setProducts(response.data.content);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    const handleCategoryChange = (categoryId, isChecked) => {
        setSelectedCategories((prev) =>
            isChecked ? [...prev, categoryId] : prev.filter((cat) => cat !== categoryId)
        );
    };

    const handleGenderChange = (gender, isChecked) => {
        setSelectedGenders((prev) =>
            isChecked ? [...prev, gender] : prev.filter((g) => g !== gender)
        );
    };

    useEffect(() => {
        fetchBrandData();
    }, [brandId]);

    useEffect(() => {
        fetchProducts();
    }, [brandId, selectedCategories, selectedGenders]);

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
                    <SideFilter
                        categories={Object.values(categoryNameMap)}
                        allCategories={totalCategories}
                        onCategoryChange={handleCategoryChange}
                        onGenderChange={handleGenderChange}
                    />
                </SideFilterWrapper>
                <ProductWrapper>
                    <ProductListWrap
                        brandId={brandId}
                        products={products}
                        setProducts={setProducts}
                    />
                </ProductWrapper>
            </ProductContainer>
        </MainProduct>
    );
};

const MainProduct = styled.div``;

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
