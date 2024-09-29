import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import SubHeader from '../Components/SubHeader';

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

const fetchProductDetail = async (id) => {
    const url = `https://api.lim-it.one/api/v1/products/${id}`;
    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data); // 데이터 확인
        return response.data;
    } catch (error) {
        console.error('상품 상세 데이터를 가져오는 중 오류 발생:', error);
        return null;
    }
};

const fetchProductPriceHistory = async (productId, period = 'P1Y') => {
    const url = `https://api.lim-it.one/api/v1/trades/transactions/prices?productId=${productId}&period=${period}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('상품 시세 데이터를 가져오는 중 오류 발생:', error);
        return { prices: [] };
    }
};

// 체결 내역 데이터를 가져오는 함수
const fetchTradeHistory = async (productId) => {
    const url = `https://api.lim-it.one/api/v1/trades/transactions/prices?productId=${productId}`;
    try {
        const response = await axios.get(url);
        console.log('체결 내역:', response.data); // 데이터가 제대로 오는지 확인
        return response.data.prices;
    } catch (error) {
        console.error('체결 내역 데이터를 가져오는 중 오류 발생:', error);
        return [];
    }
};



const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [tradeHistory, setTradeHistory] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState({ buyPrice: null, sellPrice: null });
    const [showModal, setShowModal] = useState(false);
    const [fullTradeHistory, setFullTradeHistory] = useState([]);

// 모달 열기 함수
const handleShowMoreTrades = async () => {
    const data = await fetchTradeHistory(productId);  // 상품 ID에 해당하는 전체 체결 내역 가져오기
    if (data.length > 0) {
        setFullTradeHistory(data); // 가져온 데이터를 상태로 저장
    }
    setShowModal(true);  // 모달 열기
};


// 모달 닫기 함수
const handleCloseModal = () => {
    setShowModal(false);
};

    useEffect(() => {
        const getProductDetail = async () => {
            const data = await fetchProductDetail(productId);
            if (data) {
                setProduct(data);
                setTradeHistory(data.tradeHistory || []);
                setChartData({
                    labels: (data.tradeHistory || []).map(item => item.date),
                    datasets: [{
                        label: 'Price',
                        data: (data.tradeHistory || []).map(item => item.price),
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }]
                });
            }
        };
        getProductDetail();
    }, [productId]);

    useEffect(() => {
        const getProductPriceHistory = async () => {
            const data = await fetchProductPriceHistory(productId, 'P1Y');
            if (data.prices.length > 0) {
                setChartData({
                    labels: data.prices.map(price => price.tradeTime),  // 거래 날짜
                    datasets: [{
                        label: 'Price',
                        data: data.prices.map(price => price.price),  // 가격 데이터
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }]
                });
            } else {
                console.log('시세 데이터가 없습니다.');
            }
        };
        getProductPriceHistory();
    }, [productId]);
    

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
                    drawBorder: false,
                    drawOnChartArea: false,
                    drawTicks: false
                },
                ticks: {
                    display: true
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

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className='sub_header'>
                <SubHeader />
            </div>
            <ProductContainer>
                <ProductDetails>
                    <ProductImageContainer>
                        <ProductImage src={`https://${product.imageUrl}`} alt="Product Thumbnail" />
                    </ProductImageContainer>
                    <AdditionalImagesMobile>
                        {(product.additionalImages || []).map((image, index) => (
                            <AdditionalImage key={index} src={`https://${image}`} alt={`Additional ${index}`} />
                        ))}
                    </AdditionalImagesMobile>
                    <Divider></Divider>
                    <ProductInfo>
                        <h3>즉시 구매가</h3>
                        <Price>{product.currentPrice.toLocaleString()}원</Price>
                        <ProductName>{product.names.eng}</ProductName>
                        <ProductDescription>{product.names.kor}</ProductDescription>
                        <SizeSelector onChange={handleSizeChange}>
                            <option hidden>모든 사이즈</option>
                            {(product.sizeInfo || []).map((size, index) => (
                                <option key={index}>{`${size.size} | 최고 희망 구매가: ${size.buyPrice.toLocaleString()} | 최저 희망 판매가: ${size.sellPrice.toLocaleString()}`}</option>
                            ))}
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
                                <div>{product.releasePrice?.toLocaleString()}원</div>
                            </InfoItem>                         
                        </OtherInfo>
                        <BrandInfo>
                            <BrandLogo src={`https://${product.brandLogoUrl}`} alt="Brand Logo" />
                            <BrandName>{product.brandNames.eng}</BrandName>
                        </BrandInfo>
                        <DividerMobile></DividerMobile>
                        <ButtonContainer>
                            <ActionButton1 onClick={onClickPurchase}>
                                구매
                                {selectedPrice.buyPrice && <ButtonPrice>{selectedPrice.buyPrice.toLocaleString()}원</ButtonPrice>}
                            </ActionButton1>
                            <ActionButton2 onClick={onClickSale}>
                                판매
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
                    {(product.additionalImages || []).map((image, index) => (
                        <AdditionalImage key={index} src={`https://${image}`} alt={`Additional ${index}`} />
                    ))}
                </AdditionalImages>
                <DividerMobile1></DividerMobile1>
                <SizeInfo>
                    <h3>사이즈 정보</h3>
                    <SizeTableWrapper>
                        <SizeTable>
                            <thead>
                                <tr>
                                    {(product.sizeInfo || [])[0]?.map((size, index) => (
                                        <th key={index}>{size}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(product.sizeInfo || []).slice(1).map((row, rowIndex) => (
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
                <DividerMobile2></DividerMobile2>
                <SameproductWrapper>
                    <h3>중고 상품 둘러보기</h3>
                </SameproductWrapper>
            </ProductContainer>
            <FixedButtonContainer>
                <ActionButton1 onClick={onClickPurchase}>
                    구매
                    {selectedPrice.buyPrice && <ButtonPrice>{selectedPrice.buyPrice.toLocaleString()}원</ButtonPrice>}
                </ActionButton1>
                <ActionButton2 onClick={onClickSale}>
                    판매
                    {selectedPrice.sellPrice && <ButtonPrice>{selectedPrice.sellPrice.toLocaleString()}원</ButtonPrice>}
                </ActionButton2>
            </FixedButtonContainer>
            {showModal && (
    <Modal>
        <ModalContent>
            <CloseButton onClick={handleCloseModal}>X</CloseButton>
            <h3>전체 체결 내역</h3>
            <ScrollableContent>
                {fullTradeHistory.length > 0 ? (
                    fullTradeHistory.map((trade, index) => (
                        <TradeItem key={index}>
                            <div>{trade.tradeTime}</div>  {/* 거래 날짜 */}
                            <div>{trade.price.toLocaleString()}원</div>  {/* 가격 */}
                        </TradeItem>
                    ))
                ) : (
                    <p>체결 내역이 없습니다.</p>
                )}
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
    top: 15px;
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

const DividerMobile = styled.div`
    display: none;
    height: 1px;
    width: 100%;
    background-color: #ddd;
    margin: 20px 0;

    @media (max-width: 600px) {
        display: block;
    }
`;

const DividerMobile2 = styled.div`
    display: none;
    height: 1px;
    width: 90%;
    background-color: #ddd;
    margin: 0 auto;
    margin-top: 20px;

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
        font-size: 17px;
        font-weight: lighter;
        margin-top: -20px;

        @media (max-width: 650px) {
            font-size: 15px;
        }
    }

    @media (max-width: 650px) {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 40px;
    }
`;

const SameproductWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    h3 {
        font-size: 18px;
    }

    @media (max-width: 650px) {
       margin-left: 5%;
       h3 {
        font-size: 15px;
       } 
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
    margin-top: 1%;

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

    td {
        min-width: 60px;
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
