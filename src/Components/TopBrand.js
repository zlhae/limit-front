import React, { useState } from 'react';
import styled from 'styled-components';
import TestImage from '../Images/test01.png';

const TopBrand = () => {

    return (
        <div className='top_brand_container'>
            <div className='top_brand_wrapper'>
            <img src={TestImage} alt='Product Thumbnail' />
            </div>
        </div>
    );   
}   
    
export default TopBrand;