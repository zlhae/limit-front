import React from 'react';
import styled from 'styled-components';
import BannerImage from '../Images/banner1.png'; 
import BannerImageSub from '../Images/banner1_1.png'; 

const Banner = () => {
    return (
        <BannerContainer>
            <BannerImageBox>
                <img src={BannerImage} alt='True Religion T-shirts' className="largeScreenImage"/>
                <img src={BannerImageSub} alt='True Religion T-shirts' className="smallScreenImage"/>
            </BannerImageBox>
        </BannerContainer>
    );
};

const BannerContainer = styled.div`
    width: 100%; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    margin-top: -70px; 
`;

const BannerImageBox = styled.div`
    width: 100%; 
    overflow: hidden; 

    img {
        width: 100%;
        object-fit: center center; 
        object-position: center center; 
    }

    .largeScreenImage {
        display: block; 
    }

    .smallScreenImage {
        display: none; 
    }

    @media (max-width: 600px) {
        height: 100vw; 

        .largeScreenImage {
            display: none; 
        }

        .smallScreenImage {
            display: block; 
        }
    }

    @media (min-width: 601px) {
        height: 30vw; 
    }
`;

export default Banner;