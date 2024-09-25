import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PopularBrand = () => {
    const [brands, setBrands] = useState([]); // 브랜드 데이터를 저장할 상태
    const [error, setError] = useState(null); // 오류 상태 추가

    // API 호출하여 브랜드 데이터를 가져오는 함수
    const fetchBrands = async () => {
        try {
            const response = await axios.get('https://api.lim-it.one/api/v1/brands', {
                headers: {
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjcxNjc4NDAsImV4cCI6MTc2MTcyNzg0MCwic3ViIjoiMzIifQ.9Gh-fEJ-LjV6sWuWV0HTBGrlbQDQc_P3iOoMIMKBvo4',  // 올바른 인증 토큰을 넣어주세요
                    'accept': '*/*'
                }
            });
            console.log('API 응답:', response.data); // 응답 데이터 확인
            setBrands(response.data); // API 응답 데이터를 상태에 저장
        } catch (error) {
            console.error('브랜드 데이터를 가져오는 중 오류 발생:', error.message);
            setError(error.message); // 에러 메시지 상태에 저장
        }
    };

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        fetchBrands();
    }, []);

    return (
        <TotalContainer>
            {error ? (
                <p>브랜드 데이터를 가져오는 중 오류 발생: {error}</p> // 에러 메시지 표시
            ) : (
                <BrandThumbBox>
                    {brands.length > 0 ? (
                        brands.slice(0, 10).map((brand) => (
                            <BrandContainer key={brand.id}>
                                <ImgWrapper>
                                    {brand.logoUrl ? (
                                        <StyledImage 
                                            src={brand.logoUrl.startsWith('http') ? brand.logoUrl : `https://${brand.logoUrl}`} 
                                            alt={`${brand.nameEng} logo`} 
                                            onError={(e) => e.target.src = 'default-image-path.jpg'} // 이미지 로드 실패 시 대체 이미지 설정
                                        />
                                    ) : (
                                        <NoImageText>{brand.nameKor} / {brand.nameEng}</NoImageText> // 이미지 없을 때 한국/영어 이름 표시
                                    )}
                                </ImgWrapper>
                                <BrandName>
                                    <EnglishName>{brand.nameEng}</EnglishName>
                                    <KoreanName>{brand.nameKor}</KoreanName>
                                </BrandName>
                            </BrandContainer>
                        ))
                    ) : (
                        <p>브랜드 데이터를 불러오는 중입니다...</p> // 로딩 상태 메시지
                    )}
                </BrandThumbBox>
            )}
        </TotalContainer>
    );
};

const NoImageText = styled.div`
`;

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