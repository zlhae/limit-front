import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInformation from "../Components/ProductInformation"
import ImmediatePrice from '../Components/ImmediatePrice';
import DoBid from '../Components/DoBid';
import DoImmediate from '../Components/DoImmediate';

const Sale=()=>{
    const productId=1;
    const productOptionId=1;
    const [productInformationData, setProductInformationData]=useState({});
    const [productImmediatePriceData, setProductImmediatePriceData]=useState({});
    const [position,setPosition]=useState(1);

    const productInformationDataFetch=()=>{
        axios
        .get(`https://api.lim-it.one/api/v1/products/${productId}`)
        .then((response)=>{
            const productInformation={
                imageUrl: response.data.imageUrl.startsWith('http') ? response.data.imageUrl : `https://${response.data.imageUrl}`,
                modelNumber: response.data.modelNumber,
                name_eng: response.data.names.eng,
                name_kor: response.data.names.kor,
                size: 230
            };
            setProductInformationData(productInformation);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const productImmediatePriceDataFetch=()=>{
        axios
        .get(`https://api.lim-it.one/api/v1/trades/orders?productId=${productId}`)
        .then((response)=>{
            const productImmediatePrice={
                purchase: response.data.bestPriceToBuy,
                sale: response.data.bestPriceToSell
            }
            setProductImmediatePriceData(productImmediatePrice);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        productInformationDataFetch();
        productImmediatePriceDataFetch();
    },[productInformationData]);

    const showSubmitBox=()=>{
        switch(position){
            case 1:
                return(
                    <DoBid
                        type="sale"
                        productId={productId}
                        productOptionId={productOptionId}
                        immediatePriceData={productImmediatePriceData.sale?productImmediatePriceData.sale:"null"}
                    ></DoBid>
                );
            case 2:
                return(
                    <DoImmediate
                        type="sale"
                        productId={productId}
                        productOptionId={productOptionId}
                        immediatePriceData={productImmediatePriceData.sale?productImmediatePriceData.sale:"null"}
                    ></DoImmediate>
                );
            default:
                return;
        }
    }

    return(
        <SaleContainer>
            <ProductInformation
                productInformationData={productInformationData}
            ></ProductInformation>
            <ImmediatePrice
                purchase={productImmediatePriceData.purchase?productImmediatePriceData.purchase: "null"}
                sale={productImmediatePriceData.sale?productImmediatePriceData.sale: "null"}   
            ></ImmediatePrice>
            <SaleToggleContainer>
                <SaleToggleElement
                    check={position===1?"checked":""}
                    onClick={(e)=>setPosition(1)}
                >
                    <SaleToggleText>판매 입찰</SaleToggleText>
                </SaleToggleElement>
                <SaleToggleElement
                    check={position===2?"checked":""}
                    onClick={(e)=>setPosition(2)}
                >
                    <SaleToggleText>즉시 판매</SaleToggleText>
                </SaleToggleElement>
            </SaleToggleContainer>
            {showSubmitBox()}
        </SaleContainer>
    );
}

const SaleContainer=styled.div`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1100px){
        width: 80%;
    }

    @media (max-width: 600px){
        width: 90%;
    }
`

const SaleToggleContainer=styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 100px;
    margin-bottom: 30px;
`

const SaleToggleElement=styled.div`
    text-align: center;
    padding: 15px;
    width: 33.3%;
    border-radius: 100px;
    background-color: ${props => props.check === "checked" ? "#72b8df4c" : "transparent"};
    cursor: pointer;
    transition: 0.5s;
`

const SaleToggleText=styled.h5`
    margin: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    @media (max-width: 400px){
        font-size : 0.75em;
    }
`

export default Sale;