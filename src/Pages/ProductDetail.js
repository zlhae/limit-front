import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import TestImage from '../Images/test01.png'; 
import TestImage2 from '../Images/test2.png'; 
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const product = {
        price: 293000,
        nameEng: 'Jordan 4 Retro Bred Reimagined',
        nameKor: '조던 4 레트로 브레드 리이매진드',
        modelNumber: 'FV5299-005',
        releaseDate: '2022/01/27',
        originalPrice: 240000,
        brandLogoUrl: TestImage,
        brandNameEng: 'Jordan',
        additionalImages: [TestImage, TestImage, TestImage, TestImage, TestImage],
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

    const navigate=useNavigate();

    const onClickPurchase=()=>{
        navigate('/purchase');
    }
    const onClickSale=()=>{
        navigate('/sale')
    }

    return (
        <Container>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer>
            <ProductDetails>
                <ProductImage src={TestImage} alt="Product Thumbnail" />
                <ProductInfo>
                    <h3>구매가</h3>
                    <Price>{product.price.toLocaleString()}원</Price>
                    <ProductName>{product.nameEng}</ProductName>
                    <ProductDescription>{product.nameKor}</ProductDescription>
                    <SizeSelector>
                        <option hidden>모든 사이즈</option>
                        <option>220 | 최고 희망 구매가: 293,000 | 최저 희망 판매가: 251,000</option>
                        {/* 사이즈 옵션을 추가 */}
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
                        <ActionButton1 onClick={(e)=>onClickPurchase()}>살래요</ActionButton1>
                        <ActionButton2 onClick={(e)=>onClickSale()}>팔래요</ActionButton2>
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
        width: 80%; 
        margin: 0 auto;
    }
`;

const ProductDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ProductImage = styled.img`
    width: 51%;
    height: 51%;
   
    border-radius: 10px;

    @media (max-width: 850px) {
        width: 51%;
        height: 51%;
    }
`;

const ProductInfo = styled.div`
    margin-top: 15px;
    width: 46%;
    margin-left: 3%;
    box-sizing: border-box;

    h3{
        font-size: 16px;
        font-weight: lighter;
        margin-top: -20px;
    }

    @media (max-width: 850px) {
        width: 46%;
        height: 46%;
    }
`;

const Price = styled.h2`
    font-size: 24px;
    margin-top: -15px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const ProductName = styled.h1`
    font-size: 16px;
    font-weight: lighter;
`;

const ProductDescription = styled.p`
    font-size: 15px;
    color: #555;
    margin-top: -10px;
`;

const SizeSelector = styled.select`
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    border: none; 
    width: 100%;
    height: 50px;
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
    width: 28%;
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
    padding: 10px;
    height: 60px;
    font-size: 16px;
    color: #fff;
    background-color: #FFC939;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ActionButton2 = styled.button`
    flex: 1;
    padding: 10px;
    height: 60px;
    font-size: 16px;
    color: #fff;
    background-color: #72B8DF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
