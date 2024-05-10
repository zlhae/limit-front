import styled from 'styled-components';
import { useState } from 'react';
import ProductInformation from '../Components/ProductInformation';
import ImmediatePrice from '../Components/ImmediatePrice';
import DoBid from '../Components/DoBid';
import DoImmediate from '../Components/DoImmediate';
import MockDataImage from '../Images/product-mock-data.png';

const Purchase=()=>{
    const [position,setPosition]=useState(1);

    const productInformationData={
        image: MockDataImage,
        number: '1203A507-020',
        name_en: 'Asics x C.P. Company Gel-Quantum 360 VII Cement Grey',
        name_ko: '아식스 x C.P. 컴퍼니 젤 퀀텀 360 8 시멘트 그레이',
        size: 230
    }

    const immediatePriceData={
        purchase: 439000,
        sale: 250000
    }

    const showSubmitBox=()=>{
        switch(position){
            case 1:
                return(
                    <DoBid
                        type="purchase"
                    ></DoBid>
                );
            case 2:
                return(
                    <DoImmediate
                        type="purchase"
                        immediatePriceData={immediatePriceData}
                    ></DoImmediate>
                );
            default:
                return;
        }
    }

    return(
        <PurchaseContainer>
            <ProductInformation
                image={productInformationData.image}
                number={productInformationData.number}
                name_en={productInformationData.name_en}
                name_ko={productInformationData.name_ko}
                size={productInformationData.size}
            ></ProductInformation>
            <ImmediatePrice
                purchase={immediatePriceData.purchase}
                sale={immediatePriceData.sale}   
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