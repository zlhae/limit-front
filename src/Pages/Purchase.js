import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductInformation from '../Components/ProductInformation';
import ImmediatePrice from '../Components/ImmediatePrice';
import DoBid from '../Components/DoBid';
import DoImmediate from '../Components/DoImmediate';

const Purchase=()=>{
    const navigate = useNavigate();
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search);
    const productId=queryParams.get("id");
    const productSizeId=queryParams.get("size");
    const productSizeName=location.state.size;
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
                size: productSizeName
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
            let productImmediatePrice={};
            response.data.options.map((item)=>{
                if(item.optionId==productSizeId){
                    productImmediatePrice={
                        purchase: item.bestPriceToBuy,
                        sale: item.bestPriceToSell
                    }
                }
            })
            setProductImmediatePriceData(productImmediatePrice);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        productInformationDataFetch();
        productImmediatePriceDataFetch();
    },[]);

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        if (!accessToken) {
            alert("로그인 이용 후 이용가능합니다.");
            navigate("/"); 
        }
    }, [navigate]);

    const showSubmitBox=()=>{
        switch(position){
            case 1:
                return(
                    <DoBid
                        type="purchase"
                        productId={productId}
                        productOptionId={productSizeId}
                        immediatePriceData={productImmediatePriceData.purchase}
                    ></DoBid>
                );
            case 2:
                return(
                    <DoImmediate
                        type="purchase"
                        productId={productId}
                        productOptionId={productSizeId}
                        immediatePriceData={productImmediatePriceData.purchase}
                    ></DoImmediate>
                );
            default:
                return;
        }
    }

    return(
        <PurchaseContainer>
            <ProductInformation
                productInformationData={productInformationData}
            ></ProductInformation>
            <ImmediatePrice
                purchase={productImmediatePriceData.purchase}
                sale={productImmediatePriceData.sale}   
            ></ImmediatePrice>
            <PurchaseToggleContainer>
                <PurchaseToggleElement
                    check={position===1?"checked":""}
                    onClick={(e)=>setPosition(1)}
                >
                    <PurchaseToggleText>구매 입찰</PurchaseToggleText>
                </PurchaseToggleElement>
                <PurchaseToggleElement
                    check={position===2?"checked":""}
                    onClick={(e)=>setPosition(2)}
                >
                <PurchaseToggleText>즉시 구매</PurchaseToggleText>
                </PurchaseToggleElement>
            </PurchaseToggleContainer>
            {showSubmitBox()}
        </PurchaseContainer>
    );
}

const PurchaseContainer=styled.div`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1100px){
        width: 80%;
    }

    @media (max-width:600px){
        width: 90%;
    }
`

const PurchaseToggleContainer=styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 100px;
    margin-bottom: 30px;
`

const PurchaseToggleElement=styled.div`
    text-align: center;
    padding: 15px;
    width: 50%;
    border-radius: 100px;
    background-color: ${props => props.check === "checked" ? "#ffc9394c" : "transparent"};
    cursor: pointer;
    transition: 0.5s;
`

const PurchaseToggleText=styled.h5`
    margin: 0px;
    cursor: pointer;
`

export default Purchase;