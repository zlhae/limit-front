import React, { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import MainProduct from '../Components/MainProduct';
import styled from 'styled-components';
import MainProductListWrap from '../Components/MainProduct';

const Main = () => {

    return (
        <div className='main_container'>
            <SubHeader></SubHeader>
                <MainTitle1>
                        <h3> 요즘 많이 거래된 상품 </h3>
                </MainTitle1>
            <MainProductListWrap></MainProductListWrap>
            <MainTitle2>
                        <h3> 인기 브랜드 </h3>
                </MainTitle2>
        </div>
    );
}

const MainTitle1 = styled.h3`
    margin-left: 10%;
    font-size: 17px;
`;

const MainTitle2 = styled.h3`
    margin-left: 10%;
    font-size: 17px;
`;



export default Main;
