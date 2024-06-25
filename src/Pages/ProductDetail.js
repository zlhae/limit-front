import React, { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';
import TestImage from '../Images/test01.png';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ProductDetail = () => {
    const product = {
        price: 293000,
        nameEng: 'Jordan1 x Travis Scott x Fragment Retro Low OG SP Military Blue',
        nameKor: '조던 1 x 트래비스 스캇 x 프라그먼트 레트로 로우 OG SP 밀리터리 블루',
        modelNumber: 'DM7866-140',
        releaseDate: '2021/08/13',
        originalPrice: 240000,
        brandLogoUrl: 'https://via.placeholder.com/50',
        brandNameEng: 'Jordan',
        additionalImages: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
        usedProducts: [
            { imageUrl: 'https://via.placeholder.com/100', price: 310000, description: 'Supreme backpack black - 2455' },
            { imageUrl: 'https://via.placeholder.com/100', price: 310000, description: 'Supreme backpack black - 2455' },
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

    const tradeHistory = [
        { size: 300, price: 104000, date: '24/06/17' },
        { size: 255, price: 236000, date: '24/06/17' },
        { size: 265, price: 238000, date: '24/06/17' },
        { size: 290, price: 175000, date: '24/06/17' },
        { size: 280, price: 199000, date: '24/06/17' },
        { size: 260, price: 230000, date: '24/06/17' },
        { size: 260, price: 207000, date: '24/06/17' },
        { size: 260, price: 204000, date: '24/06/17' },
        { size: 275, price: 194000, date: '24/06/17' },
        { size: 295, price: 180000, date: '24/06/17' },
        { size: 280, price: 199000, date: '24/06/17' },
        { size: 275, price: 193000, date: '24/06/17' },
        { size: 280, price: 198000, date: '24/06/17' },
        { size: 275, price: 229000, date: '24/06/17' },
        { size: 300, price: 194000, date: '24/04/17' },
        { size: 255, price: 236000, date: '24/02/17' },
        { size: 265, price: 238000, date: '24/01/17' },
        { size: 290, price: 175000, date: '24/01/16' },
        { size: 280, price: 199000, date: '24/01/10' },
        { size: 260, price: 230000, date: '23/12/17' },
        { size: 260, price: 207000, date: '23/02/17' },
    ];

    const [chartData, setChartData] = useState({
        labels: tradeHistory.map(item => item.date),
        datasets: [{
            label: 'Price',
            data: tradeHistory.map(item => item.price),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
        }]
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw.toLocaleString()}원`;
                    }
                }
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: true,
                grid: {
                    
                    drawBorder: false, // Y축 선 숨기기
                    drawOnChartArea: false, // Y축 격자선 숨기기
                    drawTicks: false // Y축의 눈금 표시 숨기기
                },
                ticks: {
                    display: true // Y축 값 표시
                    
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2,
                
            },
            point: {
                radius: 0
            }
        }
    };

    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState({ buyPrice: null, sellPrice: null });
    const [showModal, setShowModal] = useState(false);

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

    const handleTimeRangeChange = (range) => {
        // range에 따라 chartData 업데이트
        // 여기서는 예제로 동일한 데이터를 사용
        setChartData({
            labels: tradeHistory.map(item => item.date),
            datasets: [{
                label: 'Price',
                data: tradeHistory.map(item => item.price),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        });
    }

    return (
        <Container>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer>
                <ProductDetails>
                    <ProductImageContainer>
                        <ProductImage src={TestImage} alt="Product Thumbnail" />
                    </ProductImageContainer>
                    <AdditionalImagesMobile>
                        {product.additionalImages.map((image, index) => (
                            <AdditionalImage key={index} src={image} alt={`Additional ${index}`} />
                        ))}
                    </AdditionalImagesMobile>
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
                                <div><strong>발매가:</strong></div>
                                <div>{product.originalPrice.toLocaleString()}원</div>
                            </InfoItem>
                        </OtherInfo>
                        <BrandInfo>
                            <BrandLogo src={product.brandLogoUrl} alt="Brand Logo" />
                            <BrandName>{product.brandNameEng}</BrandName>
                        </BrandInfo>
                        <DividerMobile></DividerMobile> {/* 추가된 코드 */}
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
                        
                        <DetailSection>
                            <h3>시세</h3>
                            <ButtonGroup>
                                <TimeButton onClick={() => handleTimeRangeChange('1M')}>1개월</TimeButton>
                                <TimeButton onClick={() => handleTimeRangeChange('3M')}>3개월</TimeButton>
                                <TimeButton onClick={() => handleTimeRangeChange('6M')}>6개월</TimeButton>
                                <TimeButton onClick={() => handleTimeRangeChange('1Y')}>1년</TimeButton>
                                <TimeButton onClick={() => handleTimeRangeChange('ALL')}>전체</TimeButton>
                            </ButtonGroup>
                            <Line data={chartData} options={chartOptions} />
                        </DetailSection>
                        <TradeHistory>
                            <h3>체결 내역</h3>
                            {tradeHistory.slice(0, 5).map((trade, index) => (
                                <TradeItem key={index}>
                                    <div>{trade.size}</div>
                                    <div>{trade.price.toLocaleString()}원</div>
                                    <div>{trade.date}</div>
                                    {trade.fastDelivery && <div>빠른배송</div>}
                                </TradeItem>
                            ))}
                            <ShowMoreButton onClick={() => setShowModal(true)}>
                                체결 내역 더보기
                            </ShowMoreButton>
                        </TradeHistory>
                    </ProductInfo>
                </ProductDetails>
                <AdditionalImages>
                    {product.additionalImages.map((image, index) => (
                        <AdditionalImage key={index} src={image} alt={`Additional ${index}`} />
                    ))}
                </AdditionalImages>
                <DividerMobile1></DividerMobile1>
                <SizeInfo>
                    <h3>사이즈 정보</h3>
                    <SizeTableWrapper>
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
                    </SizeTableWrapper>
                </SizeInfo>
            </ProductContainer>
            <FixedButtonContainer>
                <ActionButton1 onClick={onClickPurchase}>
                    살래요
                    {selectedPrice.buyPrice && <ButtonPrice>{selectedPrice.buyPrice.toLocaleString()}원</ButtonPrice>}
                </ActionButton1>
                <ActionButton2 onClick={onClickSale}>
                    팔래요
                    {selectedPrice.sellPrice && <ButtonPrice>{selectedPrice.sellPrice.toLocaleString()}원</ButtonPrice>}
                </ActionButton2>
            </FixedButtonContainer>
            {showModal && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
                        <h3>전체 체결 내역</h3>
                        <ScrollableContent>
                            {tradeHistory.map((trade, index) => (
                                <TradeItem key={index}>
                                    <div>{trade.size}</div>
                                    <div>{trade.price.toLocaleString()}원</div>
                                    <div>{trade.date}</div>
                                    {trade.fastDelivery && <div>빠른배송</div>}
                                </TradeItem>
                            ))}
                        </ScrollableContent>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

const Container = styled.div`

`;

const ProductContainer = styled.div`
    width: 80%;
    margin: 0 auto;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const ProductImageContainer = styled.div`
    width: 51%;
    position: sticky;
    top: 0;
   
    box-sizing: border-box;

    @media (max-width: 600px) {
        width: 100%;
        position: static;
    }
`;

const Divider = styled.div`
    height: 100%;
    position: absolute;
    left: 52.5%;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #ddd;

    @media (max-width: 600px) {
        display: none;
    }
`;

const DividerMobile = styled.div`  // 추가된 코드
    display: none;
    height: 1px;
    width: 100%;
    background-color: #ddd;
    margin: 20px 0;

    @media (max-width: 600px) {
        display: block;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    border-radius: 10px;

    @media (max-width: 650px) {
        width: 100%;
        margin-top: -14.4%;
        border-radius: 0;
    }
`;

const AdditionalImagesMobile = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: flex;
        flex-wrap: nowrap;
        margin: 10px 0;   
        margin-left: 3%;
        overflow-x: auto;
        -ms-overflow-style: none;  
        scrollbar-width: none;
    }

    & > * {
        flex: 0 0 auto;
        margin-right: 10px;
    }

    &::-webkit-scrollbar {
        display: none; 
    }
`;

const ProductInfo = styled.div`
    width: 46%;
    margin-left: 3%;
    margin-top: 1.5%;
    box-sizing: border-box;

    h3 {
        font-size: 15px;
        font-weight: lighter;
        margin-top: -20px;

        @media (max-width: 650px) {
            font-size: 13px;
        }
    }

    @media (max-width: 650px) {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 40px;
    }
`;

const Price = styled.h2`
    font-size: 24px;
    margin-top: -15px;

    @media (max-width: 850px) {
        font-size: 21px;
    }
`;

const ProductName = styled.h1`
    font-size: 16px;
    font-weight: lighter;
    margin-top: -10px;
`;

const ProductDescription = styled.p`
    font-size: 14px;
    color: #6b6b6b;
    margin-top: -10px;

    @media (max-width: 650px) {
        font-size: 14px;
    }
`;

const SizeSelector = styled.select`
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 60px;
    font-weight: bold;

    @media (max-width: 600px) {
        height: 55px;
        border: 1px solid #e0e0e0;
    }
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    strong {
        font-weight: lighter;
        color: #6B6B6B;

        @media (max-width: 600px) {
            margin-top: -5px;
        }
    }

    @media (max-width: 600px) {
        margin-top: -30px;
        border: 1px solid #e0e0e0;
        height: 30px;
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

    @media (max-width: 600px) {
        height: 55px;
        margin-top: -20px;
        border: 1px solid #e0e0e0;
        width: 99.5%;
    }
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

    @media (max-width: 650px) {
        display: none;
    }
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
    margin-right: 5%;
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

const FixedButtonContainer = styled.div`
    display: none;

    @media (max-width: 650px) {
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        padding: 10px 20px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }
`;

const AdditionalImages = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0;
    

    @media (max-width: 600px) {
        display: none;
    }
`;

const AdditionalImage = styled.img`
    width: 8%;
    height: auto;
    border-radius: 0;
    background-color: rgba(221, 126, 96, 0.15);
    margin-right: 1%;

    @media (max-width: 600px) {
        width: 14%;
        margin-right: 10px;
        border-radius: 0;
    
    }
`;

const DetailSection = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }

    @media (max-width: 600px) {
        width: 100%;
        
        margin-top: 40px;

        h3 {
            font-size: 16px;
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

const TimeButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

const TradeHistory = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }

    @media (max-width: 600px) {
        margin: 40px 0;
        h3 {
            font-size: 15px;
        }
    }
`;

const TradeItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const ShowMoreButton = styled.button`
    padding: 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #ccc;
    }
`;

const DividerMobile1 = styled.div` 
    display: none;
    height: 1px;
    width: 90%;
    background-color: #ddd;
    margin: 0 auto;

    @media (max-width: 600px) {
        display: block;
        margin-top: -20px;
    }
`;

const SizeInfo = styled.div`
    margin: 20px 0;
    h3 {
        font-size: 18px;
        color: #000;
    }

    @media (max-width: 600px) {
        width: 90%;
        margin: 0 auto;

        h3 {
            font-size: 15px;
            margin-top: 20px;
        }
    }
`;

const SizeTableWrapper = styled.div`
    overflow-x: auto;
`;

const SizeTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    th, td {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        border-left: none; /* 세로 테두리 제거 */
        border-right: none; /* 세로 테두리 제거 */
    }
    th {
        background-color: #f2f2f2;
    }

    th:first-child, td:first-child {
        position: -webkit-sticky;
        position: sticky;
        left: 0;
        background-color: #f2f2f2; 
        z-index: 1; 
        border-left: none; 
    }

    @media (max-width: 600px) {
        font-size: 13px;
        td {
            min-width: 60px;
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const ScrollableContent = styled.div`
    max-height: 400px;
    overflow-y: auto;
`;

export default ProductDetail;