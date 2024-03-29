import styled from 'styled-components';

const ImmediatePrice=({purchase, sale})=>{
    return(
        <ImmediatePriceContainer>
            <PurchaseSaleContaienr type={"purchase"}>
                <PriceTitle>즉시 구매가</PriceTitle>
                <PriceContext>{purchase.toLocaleString('ko-KR')}원</PriceContext>
            </PurchaseSaleContaienr>
            <PurchaseSaleContaienr type={"sale"}>
                <PriceTitle>즉시 판매가</PriceTitle>
                <PriceContext>{sale.toLocaleString('ko-KR')}원</PriceContext>
            </PurchaseSaleContaienr>
        </ImmediatePriceContainer>
    );
}

const ImmediatePriceContainer=styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const PurchaseSaleContaienr=styled.div`
    background-color: #ffffff;
    text-align: center;
    padding: 15px;
    border-radius: 15px;
    width: 50%;
    margin-right: ${props => props.type==="purchase" ? "15px" : "0px"};
    margin-left: ${props => props.type==="purchase" ? "0px" : "15px"};
`

const PriceTitle=styled.h5`
    margin: 0px;
    font-weight: normal;
`

const PriceContext=styled.h3`
    margin: 0px;
`

export default ImmediatePrice;