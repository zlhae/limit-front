import React, { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import MainProduct from '../Components/MainProduct';
import styled from 'styled-components';
import MainProductListWrap from '../Components/MainProduct';
import PopularBrand from '../Components/PopularBrand';

const Main = () => {

    return (
        <Container>
            <SubHeader></SubHeader>
                <MainTitle1>
                        <h3> 요즘 많이 거래된 상품 </h3>
                </MainTitle1>
                <MainProductListWrap></MainProductListWrap>
                <MainTitle2>
                    <h3> 인기 브랜드 </h3>
                </MainTitle2>
                <PopularBrand></PopularBrand>
        </Container>
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

const Container = styled.div` // 전체 요소 컨테이너
    
`;

export default Main;