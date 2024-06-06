import React, { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import TestImage from '../Images/test01.png'; 
import TestImage2 from '../Images/test2.png'; 
import { useNavigate } from 'react-router-dom';
import test14 from '../Images/14.webp';
import test15 from '../Images/15.webp';
import test5 from '../Images/5.webp';
import test6 from '../Images/6.webp';
import test7 from '../Images/7.webp';
import jordan from '../Images/jordan.jpeg';

const ProductDetail = () => {
    const product = {
        price: 293000,
        nameEng: 'Jordan1 x Travis Scott x Fragment Retro Low OG SP Military Blue',
        nameKor: '조던 1 x 트래비스 스캇 x 프라그먼트 레트로 로우 OG SP 밀리터리 블루',
        modelNumber: 'DM7866-140',
        releaseDate: '2021/08/13',
        originalPrice: 240000,
        brandLogoUrl: jordan,
        brandNameEng: 'Jordan',
        additionalImages: [test14, test15, test5, test6, test7],
        usedProducts: [
            { imageUrl: TestImage, price: 310000, description: 'Supreme backpack black - 2455' },
            { imageUrl: TestImage, price: 310000, description: 'Supreme backpack black - 2455' },
            { imageUrl: TestImage, price: 310000, description: 'Supreme backpack black - 2455' },
            { imageUrl: TestImage, price: 310000, description: 'Supreme backpack black - 2455' },
        ],
        sizeInfo: [
            ['KR', 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275],
            ['US (M)', 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
            ['US (W)', 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
            ['UK', 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5],
            ['JP', 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28],
            ['EU', 35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5]
        ]
    };

    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState({ buyPrice: null, sellPrice: null });

    const onClickPurchase = () => {
        navigate('/purchase');
    }

    const onClickSale = () => {
        navigate('/sale');
    }

    const handleSizeChange = (event) => {
        const [_, buyPrice, sellPrice] = event.target.value.split('|').map(text => text.replace(/[^0-9]/g, ''));
        setSelectedPrice({
            buyPrice: buyPrice ? parseInt(buyPrice) : null,
            sellPrice: sellPrice ? parseInt(sellPrice) : null
        });
    }

    return (
        <Container>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer>
                <ProductDetails>
                    <ProductImage src={TestImage} alt="Product Thumbnail" />
                    <Divider></Divider>
                    <ProductInfo>
                        <h3>즉시 구매가</h3>
                        <Price>{product.price.toLocaleString()}원</Price>
                        <ProductName>{product.nameEng}</ProductName>
                        <ProductDescription>{product.nameKor}</ProductDescription>
                        <SizeSelector onChange={handleSizeChange}>
                            <option hidden>모든 사이즈</option>
                            <option>220 | 최고 희망 구매가: 293,000 | 최저 희망 판매가: 251,000</option>
                            <option>225 | 최고 희망 구매가: 357,000 | 최저 희망 판매가: 234,000</option>
                            <option>230 | 최고 희망 구매가: 345,000 | 최저 희망 판매가: 429,000</option>
                            <option>235 | 최고 희망 구매가: 323,000 | 최저 희망 판매가: 321,000</option>
                            <option>240 | 최고 희망 구매가: 487,000 | 최저 희망 판매가: 551,000</option>
                            <option>245 | 최고 희망 구매가: 310,000 | 최저 희망 판매가: 229,000</option>
                            <option>250 | 최고 희망 구매가: 399,000 | 최저 희망 판매가: 234,000</option>
                            <option>255 | 최고 희망 구매가: 345,000 | 최저 희망 판매가: 213,000</option>
                        </SizeSelector>
                        <OtherInfo>
                            <InfoItem>
                                <div><strong>모델 번호:</strong></div>
                                <div>{product.modelNumber}</div>
                            </InfoItem>
                            <InfoItem>
                                <div><strong>출시일:</strong></div>
                                <div>{product.releaseDate}</div>
                            </InfoItem>
                            <InfoItem>
                                <div><strong>정가:</strong></div>
                                <div>{product.originalPrice.toLocaleString()}원</div>
                            </InfoItem>
                        </OtherInfo>
                        <BrandInfo>
                            <BrandLogo src={product.brandLogoUrl} alt="Brand Logo" />
                            <BrandName>{product.brandNameEng}</BrandName>
                        </BrandInfo>
                        <ButtonContainer>
                            <ActionButton1 onClick={onClickPurchase}>
                                살래요
                                {selectedPrice.buyPrice && <ButtonPrice>{selectedPrice.buyPrice.toLocaleString()}원</ButtonPrice>}
                            </ActionButton1>
                            <ActionButton2 onClick={onClickSale}>
                                팔래요
                                {selectedPrice.sellPrice && <ButtonPrice>{selectedPrice.sellPrice.toLocaleString()}원</ButtonPrice>}
                            </ActionButton2>
                        </ButtonContainer>
                    </ProductInfo>
                </ProductDetails>
                <AdditionalImages>
                    {product.additionalImages.map((image, index) => (
                        <AdditionalImage key={index} src={image} alt={`Additional ${index}`} />
                    ))}
                </AdditionalImages>
                <DetailSection>
                    <h3>시세</h3>
                    <PriceGraph src={TestImage2} alt="Price Graph" />
                </DetailSection>
                <UsedProducts>
                    <h3>중고 상품 둘러보기</h3>
                    <UsedProductList>
                        {product.usedProducts.map((usedProduct, index) => (
                            <UsedProduct key={index}>
                                <UsedProductImage src={usedProduct.imageUrl} alt="Used Product" />
                                <div>{usedProduct.price.toLocaleString()}원</div>
                                <div>{usedProduct.description}</div>
                            </UsedProduct>
                        ))}
                    </UsedProductList>
                </UsedProducts>
                <SizeInfo>
                    <h3>사이즈 정보</h3>
                    <SizeTable>
                        <thead>
                            <tr>
                                {product.sizeInfo[0].map((size, index) => (
                                    <th key={index}>{size}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {product.sizeInfo.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((size, sizeIndex) => (
                                        <td key={sizeIndex}>{size}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </SizeTable>
                </SizeInfo>
            </ProductContainer>
        </Container>
    );
};

const Container = styled.div`
`;

const ProductContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    @media (max-width: 850px) {
        width: 90%; 
        margin: 0 auto;
    }
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: row; /* 행 방향 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    position: relative; /* 상대적 위치 설정 */
`;

const Divider = styled.div`
    height: 100%;
    position: absolute; /* 절대 위치 */
    left: 52.5%; /* 왼쪽에서 50% 위치 */
    top: 0; /* 위에서부터 시작 */
    bottom: 0; /* 아래까지 길게 */
    width: 1px; /* 선의 너비 */
    background-color: #ddd; /* 선의 색상 */
`;

const ProductImage = styled.img`
    width: 51%;
    border-radius: 10px;
`;

const ProductInfo = styled.div`
    width: 46%;
    margin-left: 3%;
    box-sizing: border-box;

    h3 {
        font-size: 16px;
        font-weight: lighter;
        margin-top: -20px;
    }

    @media (max-width: 850px) {
        width: 46%;
    }
`;

const Price = styled.h2`
    font-size: 24px;
    margin-top: -10px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const ProductName = styled.h1`
    font-size: 16px;
    font-weight: lighter;
`;

const ProductDescription = styled.p`
    font-size: 16px;
    color: #555;
    margin-top: -10px;
`;

const SizeSelector = styled.select`
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    border: none; 
    width: 100%;
    height: 60px;
    font-weight: bold;
`;

const OtherInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const InfoItem = styled.div`
    margin: 10px 0; 
    padding: 10px; 
    font-size: 14px;
    color: #333;
    background-color: white;
    border-radius: 5px; 
    width: 27%;
    text-align: center;
    margin-top: -20px;

    strong {
        font-weight: lighter;
        color: #6B6B6B;
    }
`;

const BrandInfo = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 5px; 
    text-align: center;
    margin-top: -10px;
    width: 100%;
    height: 60px;
    font-weight: bold;
`;

const BrandLogo = styled.img`
    padding: 10px;
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const BrandName = styled.div`
    font-size: 15px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ActionButton1 = styled.button`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 60px;
    font-size: 16px;
    color: #fff;
    background-color: #FFC939;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5%; // 오른쪽 마진 추가
`;

const ActionButton2 = styled.button`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 60px;
    font-size: 16px;
    color: #fff;
    background-color: #72B8DF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ButtonText = styled.span`
    font-size: 16px;
    font-weight: bold;
`;

const ButtonPrice = styled.span`
    font-size: 12px;
    color: #fff;
    margin-top: 5px;
`;

const AdditionalImages = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
`;

const AdditionalImage = styled.img`
    width: 18%;
    height: auto;
    border-radius: 10px;
    background-color: rgba(221, 126, 96, 0.15); /* 배경색과 투명도 설정 */
`;

const DetailSection = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }
`;

const PriceGraph = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const UsedProducts = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }
`;

const UsedProductList = styled.div`
    display: flex;
    justify-content: space-between;
`;

const UsedProduct = styled.div`
    width: 200px;
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
`;

const UsedProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const SizeInfo = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }

    @media (max-width: 850px) {
        font-size: 15px;
    }
`;

const SizeTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    th {
        background-color: #f2f2f2;
    }
`;

export default ProductDetail;