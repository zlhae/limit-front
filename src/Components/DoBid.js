import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DoBid=({type})=>{
    const [bidPrice, setBidPrice]=useState("");

    const [dummyShow, setDummyShow]=useState(false);
    useEffect(()=>{
        if(bidPrice>=293000 && type==='purchase'){
            setDummyShow(true);
        }
        else{
            setDummyShow(false);
        }
    },[bidPrice])
    const navigate=useNavigate();
    const onClickDummy=()=>{
        if(dummyShow===false){
            Swal.fire({
                icon: "success",
                title: "입찰이 완료되었습니다.",
            })
            navigate("/")
        }
        else{
            Swal.fire({
                icon: "error",
                title: "입찰에 실패하였습니다.",
            })
        }
    }

    return(
        <div>
            <BidPriceContainer>
                <PurchaseSaleTitle>{type==="purchase"?"구매":"판매"} 희망가</PurchaseSaleTitle>
                <BidPriceInputContainer>
                    <BidPriceInput type='number' onChange={(e)=>{setBidPrice(Number(e.target.value))}}></BidPriceInput>
                    <BidPriceWon>원</BidPriceWon>
                </BidPriceInputContainer>
            </BidPriceContainer>
            {dummyShow&&<DummyP>293,000원보다 높은 가격은 입력할 수 없습니다.</DummyP>}
            <BidPeriodContainer>
                <PurchaseSaleTitle>입찰 마감기한</PurchaseSaleTitle>
                <BidPeriodDetail>입찰 마감기한은 30일입니다.</BidPeriodDetail>
                <BidPeriodDetail>30일이 지날 경우에는 입찰이 종료되며 그 이후에도 입찰을 원하신다면 다시 입찰을 등록하셔야 합니다.</BidPeriodDetail>
                <BidPeriodDetail>종료된 입찰은 마이페이지에서 삭제 가능합니다.</BidPeriodDetail>
            </BidPeriodContainer>
            <BidSumbit onClick={onClickDummy} type={type}>{type==="purchase"?"구매":"판매"} 입찰하기</BidSumbit>
        </div>
        
    );
}

const DummyP=styled.p`
    margin-top: -20px;
    font-size: 15px;
    color: red;
`

const PurchaseSaleTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
    cursor: default;
`

const BidPriceContainer=styled.div`
    height: 45px;
    padding-bottom: 5px;
    border-bottom: 1px solid #979797;
    margin-bottom: 30px;
`

const BidPriceInputContainer=styled.div`
    float: right;
`

const BidPriceInput=styled.input`
    border: 0;
    outline: none;
    font-size: 1.17em;
    text-align: right;
    font-weight: bold;
    background-color: transparent;
    &::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    &::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
`

const BidPriceWon=styled.h3`
    margin: 0px;
    display: inline-block;
    cursor: default;
`

const BidPeriodContainer=styled.div`
    margin-bottom: 30px
`

const BidPeriodDetail=styled.p`
    margin: 0px;
    font-size: 0.83em;
    color: #979797;
    cursor: default;
`

const BidSumbit=styled.button`
    width: 100%;
    border: none;
    background-color: ${props => props.type === "purchase" ? "#ffc9394c" : "#72b8df4c"};
    padding: 10px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
`

export default DoBid;