import styled from 'styled-components';

const DoImmediate=({type, immediatePriceData})=>{
    return(
        <div>
            <ImmediateElement>
                <ImmediateTitle>즉시 {type==="purchase"?"구매":"판매"}가</ImmediateTitle>
                <ImmediateContext>{(type==="purchase"?immediatePriceData.purchase:immediatePriceData.sale).toLocaleString('ko-KR')}원</ImmediateContext>
            </ImmediateElement>
            <ImmediateSubmit type={type}>즉시 {type==="purchase"?"구매":"판매"}하기</ImmediateSubmit>
        </div>
    );
}

const ImmediateElement=styled.div`
    margin-bottom: 30px;
`

const ImmediateTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
`

const ImmediateContext=styled.h3`
    margin: 0px;
    text-align: right;
    border-bottom: 1px solid #979797;
`

const ImmediateSubmit=styled.button`
    width: 100%;
    border: none;
    background-color: ${props => props.type === "purchase" ? "#ffc9394c" : "#72b8df4c"};
    padding: 10px;
    font-weight: bold;
    border-radius: 10px;
`

export default DoImmediate;