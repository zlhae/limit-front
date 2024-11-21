import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const DoBid=({type, productId, productOptionId, immediatePriceData})=>{
    const navigate=useNavigate();

    const [bidPrice, setBidPrice]=useState(0);
    const [showBidPrice, setShowBidPrice]=useState("");
    const [canBidPrice, setCanBidPrice]=useState(null);
    const [canMeet, setCanMeet]=useState(null);

    useEffect(()=>{
        setBidPrice(showBidPrice.split(',').reduce((curr,acc)=>curr+acc,""));
        if(type==='purchase' && immediatePriceData && bidPrice>immediatePriceData){
            setCanBidPrice(false);
        }
        else{
            setCanBidPrice(true);
        }
    },[showBidPrice])

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        if (!accessToken) {
            alert("로그인 이용 후 이용가능합니다.");
            navigate("/"); 
        }
    }, [navigate]);

    const inputPriceFormat=(str)=>{
        const comma=(str)=>{
            str=String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
        };
        const uncomma=(str)=>{
            str=String(str);
            return str.replace(/[^\d]+/g,"");
        };
        return comma(uncomma(str));
    }

    const onClickBid=()=>{ 
        if(canBidPrice===true && canMeet!==null){
            if(showBidPrice===""){
                Swal.fire({
                    icon: "error",
                    title: "입찰에 실패하였습니다.",
                    text: "즉시 구매가를 입력해주세요."
                })
            }
            else{
                axios
                .post('https://api.lim-it.one/api/v1/trades/orders',{
                    productId: productId,
                    productOptionId: productOptionId,
                    price: bidPrice,
                    canMeet: canMeet,
                    type: type==="purchase"?"구매":"판매"
                },{
                    headers:{
                        Authorization: `Bearer ${Cookies.get('accessToken')}`
                    }
                })
                .then(()=>{
                    Swal.fire({
                        icon: "success",
                        title: "입찰이 완료되었습니다.",
                    })
                    navigate("/chatting")
                })
                .catch(()=>{
                    Swal.fire({
                        icon: "error",
                        text: "입찰이 완료되지 않았습니다. 다시 시도해주세요.",
                    });
                })
            }
        }
        else if(canBidPrice===false){
            Swal.fire({
                icon: "error",
                title: "입찰에 실패하였습니다.",
                text: "즉시 구매가보다 높은 값으로 입찰할 수 없습니다."
            })
        }
        else if(canMeet===null){
            Swal.fire({
                icon: "error",
                title: "입찰에 실패하였습니다.",
                text: "직거래 가능 여부를 선택해주세요."
            })
        }
    }

    return(
        <div>
            <BidPriceContainer>
                <PurchaseSaleTitle>{type==="purchase"?"구매":"판매"} 희망가</PurchaseSaleTitle>
                <BidPriceInputContainer>
                    <BidPriceInput
                        type='text'
                        value={showBidPrice}
                        onChange={(e)=>{setShowBidPrice(inputPriceFormat(e.target.value))}}></BidPriceInput>
                    <BidPriceWon>원</BidPriceWon>
                </BidPriceInputContainer>
            </BidPriceContainer>
            {!canBidPrice&&<CanBidPrice>{immediatePriceData}원보다 높은 가격은 입력할 수 없습니다.</CanBidPrice>}
            <BidCanMeetContainer>
                <CanMeetTitle>직거래 가능 여부</CanMeetTitle>
                <CanMeetRadioContainer>
                    <CanMeetRadio>
                        <CanMeetInput
                            type='radio'
                            value={true}
                            id='true'
                            name='can-meet-radio'
                            onClick={(e)=>{setCanMeet(true)}}
                        ></CanMeetInput>
                        <CanMeetLabel htmlFor='true'>가능</CanMeetLabel>
                    </CanMeetRadio>
                    <CanMeetRadio>
                        <CanMeetInput
                            type='radio'
                            value={false}
                            id='false'
                            name='can-meet-radio'
                            onClick={(e)=>{setCanMeet(false)}}
                        ></CanMeetInput>
                        <CanMeetLabel htmlFor='false'>불가능</CanMeetLabel>
                    </CanMeetRadio>
                </CanMeetRadioContainer>
            </BidCanMeetContainer>
            <BidPeriodContainer>
                <PurchaseSaleTitle>입찰 마감기한</PurchaseSaleTitle>
                <BidPeriodDetail>입찰 마감기한은 30일입니다.</BidPeriodDetail>
                <BidPeriodDetail>30일이 지날 경우에는 입찰이 종료되며 그 이후에도 입찰을 원하신다면 다시 입찰을 등록하셔야 합니다.</BidPeriodDetail>
                <BidPeriodDetail>종료된 입찰은 마이페이지에서 삭제 가능합니다.</BidPeriodDetail>
            </BidPeriodContainer>
            <BidSumbit onClick={onClickBid} type={type}>{type==="purchase"?"구매":"판매"} 입찰하기</BidSumbit>
        </div>
        
    );
}


const BidPriceContainer=styled.div`
    height: 45px;
    padding-bottom: 5px;
    border-bottom: 1px solid #979797;
    margin-bottom: 30px;
`

const PurchaseSaleTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
    cursor: default;
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

const CanBidPrice=styled.p`
    margin-top: -20px;
    font-size: 15px;
    color: red;
`

const BidCanMeetContainer=styled.div`
    height: 45px;
    padding-bottom: 5px;
    margin-bottom: 30px;  
`

const CanMeetTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
    cursor: default;
    display: inline-block;
    margin-right: 15px;
`

const CanMeetRadioContainer=styled.div`
    display: inline-block;
`

const CanMeetRadio=styled.div`
    display: inline-block;
    width: 50px;
    margin-left: 15px;
`

const CanMeetInput=styled.input`
    display: none;
    &:checked+label{
        color: #000000;
        border: 1px solid #000000;
    }
`

const CanMeetLabel=styled.label`
    display: inline-block;
    padding: 10px 0px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    font-size: 0.83em;
    background-color: #ffffff;
    color: #979797;
    border: 1px dashed #979797;
    cursor: pointer;
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