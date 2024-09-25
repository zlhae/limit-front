import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import ad1 from '../Images/ad1.webp'; 
import ad2 from '../Images/ad2.webp'; 
import BannerArrow from '../Images/BannerArrow.svg';
import MainProductListWrap from '../Components/MainProduct';
import PopularBrand from '../Components/PopularBrand';
import RecentProductListWrap from '../Components/RecentProduct';

const Main = () => {
    const navigate = useNavigate();
    const imageList = [ad1, ad2];
    const [currentImage, setCurrentImage] = useState(ad1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNextImage();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToNextImage = () => {
        const nextIndex = (currentIndex + 1) % imageList.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(imageList[nextIndex]);
    };

    const goToPrevImage = () => {
        const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
        setCurrentIndex(prevIndex);
        setCurrentImage(imageList[prevIndex]);
    };

    const handleBannerClick = () => {
        if (currentIndex === 0) {
            navigate('/ad1-page'); 
        } else {
            navigate('/ad2-page'); 
        }
    };

    return (
        <Container>
            <SubHeader></SubHeader>
            <BannerContainer>
                <ArrowButton className="left" onClick={goToPrevImage}>
                    <img src={BannerArrow} alt="Left Arrow" className="leftArrow"/>
                </ArrowButton>
                <BannerImageBox onClick={handleBannerClick}>
                    <img src={currentImage} alt='Banner Image' className="bannerImage" />
                </BannerImageBox>
                <ArrowButton className="right" onClick={goToNextImage}>
                    <img src={BannerArrow} alt="Right Arrow" className="rightArrow"/>
                </ArrowButton>
            </BannerContainer>
            <Section>
                <MainTitle>
                    <h1> Recently Traded Products </h1>
                    <h3> 요즘 많이 거래된 상품 </h3>
                    </MainTitle>
                <MainProductListWrap></MainProductListWrap>
            </Section>
            <Section>
                <MainTitle>
                    <h1> Popular Brands </h1>
                    <h3> 인기 브랜드 </h3>
                    </MainTitle>
                <PopularBrand></PopularBrand>
            </Section>
            <Section>
                <MainTitle>
                    <h1> Recently Listed Products </h1>
                    <h3> 최근 등록된 상품 </h3>
                    </MainTitle>
                <RecentProductListWrap></RecentProductListWrap>
            </Section>
        </Container>
    );
};

const Container = styled.div``;

const BannerContainer = styled.div`
    width: 100%; 
    display: flex; 
    justify-content: center;
    align-items: center; 
    margin-top: -70px; 
    position: relative; 
    height: 35vw; 
    margin-bottom: 50px;
`;

const BannerImageBox = styled.div`
    width: 100%; 
    height: 100%;
    display: flex; 
    justify-content: center; 
    align-items: center; 

    img {
        width: 100%;
        height: 100%; 
        object-fit: cover; 
        cursor: pointer;
    }
`;

const ArrowButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 10;

    &.left {
        left: 20px;
        transform: translateY(-50%) rotate(180deg); 
    }

    &.right {
        right: 20px;
    }

    img {
        width: 25px; 
        height: auto;
    }

    @media (max-width: 600px) {
        img {
            width: 20px; 
            height: auto;
        }
    }
`;

const Section = styled.div`
    margin-bottom: 50px; 

    @media (max-width: 600px) {
        margin-bottom: 40px;
    }
`;

const MainTitle = styled.div`

    h1 {
        margin-left: 10%;
        font-size: 20px;
        margin-bottom: -10px;

        @media (max-width: 600px) {
            margin-left: 5%;
            font-size: 17px;
        }
    }

    h3 {
        margin-left: 10%;
        font-size: 15px;
        margin-bottom: 30px;
        font-weight: 100;
        color: gray;

        @media (max-width: 600px) {
            margin-left: 5%;
            font-size: 14px;
        }
    }
`;

export default Main;
