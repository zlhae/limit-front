import React, { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import SameProductListWrap from '../Components/SameProduct'; // 경로를 실제 파일 위치로 수정하세요

const MoreProduct = () => {
    const [showNearby, setShowNearby] = useState(false);

    const handleCheckboxChange = (event) => {
        setShowNearby(event.target.checked);
    };

    return (
        <Container>
            <SubHeader />
            <FilterContainer>
                <label>
                    <input 
                        type="checkbox" 
                        name="filter" 
                        value="nearby" 
                        checked={showNearby} 
                        onChange={handleCheckboxChange} 
                    />
                    내 주변 상품만 보기
                </label>
            </FilterContainer>
            <ProductListContainer>
                <SameProductListWrap showAll={true} showNearby={showNearby} />
            </ProductListContainer>
        </Container>
    );
};

const Container = styled.div`
  
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const ProductListContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default MoreProduct;
