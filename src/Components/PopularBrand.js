import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styled from 'styled-components';
import { getAccessToken } from '../Utils/authService';

const PopularBrand = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const token = getAccessToken();
            const response = await axios.get('https://api.lim-it.one/api/v1/brands', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBrands(response.data);
            setLoading(false);
        } catch (error) {
            console.error('브랜드 데이터를 가져오는 중 오류 발생:', error.message);
            setError('데이터를 불러오는 중 문제가 발생했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleBrandClick = (brandId) => {
        navigate(`/brand/${brandId}`);
    };

    return (
        <TotalContainer>
            {loading ? (
                <p>브랜드 데이터를 불러오는 중입니다...</p>
            ) : error ? (
                <p>오류 발생: {error}</p>
            ) : (
                <BrandThumbBox>
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <BrandContainer key={brand.id} onClick={() => handleBrandClick(brand.id)}> 
                                <ImgWrapper>
                                    {brand.logoUrl ? (
                                        <StyledImage 
                                            src={brand.logoUrl.startsWith('http') ? brand.logoUrl : `https://${brand.logoUrl}`} 
                                            alt={`${brand.nameEng} logo`} 
                                            onError={(e) => e.target.src = 'default-image-path.jpg'}
                                        />
                                    ) : (
                                        <NoImageText>{brand.nameKor} / {brand.nameEng}</NoImageText>
                                    )}
                                </ImgWrapper>
                                <BrandName>
                                    <EnglishName>{brand.nameEng}</EnglishName>
                                    <KoreanName>{brand.nameKor}</KoreanName>
                                </BrandName>
                            </BrandContainer>
                        ))
                    ) : (
                        <p>브랜드 데이터가 없습니다.</p>
                    )}
                </BrandThumbBox>
            )}
        </TotalContainer>
    );
};

const NoImageText = styled.div`
`;

const TotalContainer = styled.div`
    width: 80%;
    margin: 0 auto;

    @media (max-width: 600px) {
        width: 90%;
        margin-left: 5%;
    }
`;

const BrandThumbBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    width: 100%;

    @media (max-width: 840px) {
        gap: 15px;
    }

    @media (max-width: 720px) {
        gap: 15px;
    }

    @media (max-width: 600px) {
        gap: 10px;
    }
`;

const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
`;

const BrandContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

const StyledImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;

    @media (max-width: 960px) {
        width: 100%;  
        height: auto; 
        object-fit: contain; 
    }

    @media (max-width: 600px) {
        width: 100%;  
        height: auto; 
        object-fit: contain; 
    }
`;

const BrandName = styled.div`
    text-align: center;
    margin-top: 10px;

    @media (max-width: 960px) {
        margin-top: -15px;
    }

    @media (max-width: 840px) {
        margin-top: -20px;
    }

    @media (max-width: 720px) {
        margin-top: -45px;
    }

    @media (max-width: 600px) {
        margin-top: -55px;
    }

    @media (max-width: 480px) {
        margin-top: -70px;
    }

    @media (max-width: 380px) {
        margin-top: -80px;
    }
`;

const EnglishName = styled.div`
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

const KoreanName = styled.div`
    font-size: 13px;
    color: #6D6D6D;

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

export default PopularBrand;
