import React, { useState } from 'react';
import styled from 'styled-components';
import BrandImage from '../Images/brand.png';
import "./PopularBrand.css";


const PopularBrand = () => {

    return (
        <div className='totalContainer'>
            <div className='brand_thumb_box'>
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
                <img src={BrandImage} alt='Brand Thumbnail' />
            </div>
        </div>
    );
}


export default PopularBrand;