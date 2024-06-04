import React from 'react';
import styled from 'styled-components';
import BrandImage from '../Images/brand.png';

const PopularBrand = () => {
    const images = Array.from({ length: 10 }, (_, index) => ({
        img: BrandImage,
        englishName: `Brand ${index + 1}`,
        koreanName: `브랜드 ${index + 1}`
    }));

    return (
        <TotalContainer>
            <BrandThumbBox>
                {images.map((brand, index) => (
                    <BrandContainer key={index}>
                        <StyledImage src={brand.img} alt={`Brand Thumbnail ${index + 1}`} />
                        <BrandName>
                            <EnglishName>{brand.englishName}</EnglishName>
                            <KoreanName>{brand.koreanName}</KoreanName>
                        </BrandName>
                    </BrandContainer>
                ))}
            </BrandThumbBox>
        </TotalContainer>
    );
}

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
    gap: 35px;
    width: 100%;

    @media (max-width: 600px) {
        gap: 15px;
    }
`;

const BrandContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
`;

const BrandName = styled.div`
    text-align: center;
    margin-top: 5px;
`;

const EnglishName = styled.div`
    font-size: 15px;

    @media (max-width: 600px) {
        font-size: 13px;
    }
`;

const KoreanName = styled.div`
    font-size: 12px;
    color: #979797;

    @media (max-width: 600px) {
        display: none;
    }
`;

export default PopularBrand;