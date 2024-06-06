import React from 'react';
import styled from 'styled-components';
import BrandImage from '../Images/brand.png';
import adidas from '../Images/adidas.jpg'
import arcteryx from '../Images/arcteryx.jpg'
import celine from '../Images/celine.jpg'
import chanel from '../Images/chanel.jpg'
import diesel from '../Images/diesel.jpg'
import hellosunrise from '../Images/hellosunrise.jpg'
import mischief from '../Images/mischief.jpg'
import nike from '../Images/nike.jpg'
import sansangear from '../Images/sansangear.jpg'
import supreme from '../Images/supreme.jpg'

const PopularBrand = () => {
    //const images = Array.from({ length: 10 }, (_, index) => ({
        //img: BrandImage,
        //englishName: `Brand ${index + 1}`,
        //koreanName: `브랜드 ${index + 1}`
    //}));

    const images = [
        { img: adidas, englishName: 'Adidas', koreanName: '아디다스' },
        { img: arcteryx, englishName: 'Arc’teryx', koreanName: '아크테릭스' },
        { img: celine, englishName: 'Celine', koreanName: '셀린느' },
        { img: chanel, englishName: 'Chanel', koreanName: '샤넬' },
        { img: diesel, englishName: 'Diesel', koreanName: '디젤' },
        { img: hellosunrise, englishName: 'Hello Sunrise', koreanName: '헬로선라이즈' },
        { img: mischief, englishName: 'Mischief', koreanName: '미스치프' },
        { img: nike, englishName: 'Nike', koreanName: '나이키' },
        { img: sansangear, englishName: 'Sansan Gear', koreanName: '산산기어' },
        { img: supreme, englishName: 'Supreme', koreanName: '슈프림' }
    ];
    

    return (
        <TotalContainer>
            <BrandThumbBox>
                {images.map((brand, index) => (
                    <BrandContainer key={index}>
                        <ImgWrapper>
                        <StyledImage src={brand.img} alt={`Brand Thumbnail ${index + 1}`} />
                        </ImgWrapper>
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
    gap: 30px;
    width: 100%;


    @media (max-width: 600px) {
        gap: 15px;
    }
`;

const ImgWrapper=styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    margin: 15px;
    
`

const BrandContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledImage = styled.img`
    
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50,50);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    margin: auto;
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