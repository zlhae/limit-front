import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import Banner from '../Components/Banner';
import MainProductListWrap from '../Components/MainProduct';
import PopularBrand from '../Components/PopularBrand';
import RecentProductListWrap from '../Components/RecentProduct';
import NeighboringListWrap from '../Components/NeighboringProduct';

const Main = () => {

    return (
        <Container>
            <SubHeader></SubHeader>
            <Banner></Banner>
                <Section>
                    <MainTitle><h3> 요즘 많이 거래된 상품 </h3></MainTitle>
                    <MainProductListWrap></MainProductListWrap>
                </Section>
                <Section>
                    <MainTitle><h3> 인기 브랜드 </h3></MainTitle>
                    <PopularBrand></PopularBrand>
                </Section>
                <Section>
                    <MainTitle><h3> 최근 등록된 상품 </h3></MainTitle>
                    <RecentProductListWrap></RecentProductListWrap>
                </Section>
                <Section>
                    <MainTitle><h3> 내 주변 상품 </h3></MainTitle>
                    <NeighboringListWrap></NeighboringListWrap>
                </Section>
        </Container>
    );
}

const Container = styled.div`
    
`;

const Section = styled.div`
    margin-bottom: 60px; 

    @media (max-width: 600px) {
        margin-bottom: 40px;
    }
`;

const MainTitle = styled.h3`
    margin-left: 10%;
    font-size: 17px;
    margin-bottom: 30px;

    @media (max-width: 600px) {
        margin-left: 5%;
        font-size: 15px;
    }
`;

export default Main;