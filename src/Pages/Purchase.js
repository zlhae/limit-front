import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInformation from '../Components/ProductInformation';
import ImmediatePrice from '../Components/ImmediatePrice';
import DoBid from '../Components/DoBid';
import DoImmediate from '../Components/DoImmediate';

const Purchase = () => {
    const productId = 1;
    const [productInformationData, setProductInformationData] = useState({});
    const [productImmediatePriceData, setProductImmediatePriceData] = useState({});
    const [position, setPosition] = useState(1);

    const productInformationDataFetch = async () => {
        try {
            const response = await axios.get(`https://api.lim-it.one/api/v1/products/${productId}`);
            console.log('Product Info:', response.data); 
            const productInformation = {
                imageUrl: response.data.imageUrl.startsWith('http') ? response.data.imageUrl : `https://${response.data.imageUrl}`,
                modelNumber: response.data.modelNumber,
                name_eng: response.data.names.eng,
                name_kor: response.data.names.kor,
                size: 220
            };
            setProductInformationData(productInformation);
        } catch (error) {
            console.log('Error fetching product information:', error);
        }
    };

    const productImmediatePriceDataFetch = async () => {
        try {
            const response = await axios.get(`https://api.lim-it.one/api/v1/trades/orders?productId=${productId}`);
            console.log('Immediate Price Data:', response.data); 
            const productImmediatePrice = {
                purchase: response.data.bestPriceToBuy,
                sale: response.data.bestPriceToSell
            };
            setProductImmediatePriceData(productImmediatePrice);
        } catch (error) {
            console.log('Error fetching immediate price data:', error);
        }
    };

    useEffect(() => {
        productInformationDataFetch();
        productImmediatePriceDataFetch();
    }, []);

    const showSubmitBox = () => {
        switch (position) {
            case 1:
                return <DoBid type="purchase" />;
            case 2:
                return <DoImmediate type="purchase" immediatePriceData={productImmediatePriceData.purchase ? productImmediatePriceData.purchase : "null"} />;
            default:
                return;
        }
    };

    return (
        <PurchaseContainer>
            <ProductInformation productInformationData={productInformationData} />
            <ImmediatePrice
                purchase={productImmediatePriceData.purchase ? productImmediatePriceData.purchase : "null"}
                sale={productImmediatePriceData.sale ? productImmediatePriceData.sale : "null"}
            />
            <PurchaseToggleContainer>
                <PurchaseToggleElement check={position === 1 ? "checked" : ""} onClick={() => setPosition(1)}>
                    <PurchaseToggleText>구매 입찰</PurchaseToggleText>
                </PurchaseToggleElement>
                <PurchaseToggleElement check={position === 2 ? "checked" : ""} onClick={() => setPosition(2)}>
                    <PurchaseToggleText>즉시 구매</PurchaseToggleText>
                </PurchaseToggleElement>
            </PurchaseToggleContainer>
            {showSubmitBox()}
        </PurchaseContainer>
    );
};

const PurchaseContainer = styled.div`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1100px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const PurchaseToggleContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 100px;
    margin-bottom: 30px;
`;

const PurchaseToggleElement = styled.div`
    text-align: center;
    padding: 15px;
    width: 50%;
    border-radius: 100px;
    background-color: ${props => (props.check === "checked" ? "#ffc9394c" : "transparent")};
    cursor: pointer;
    transition: 0.5s;
`;

const PurchaseToggleText = styled.h5`
    margin: 0px;
    cursor: pointer;
`;

export default Purchase;
