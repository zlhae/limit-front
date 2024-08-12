import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DoImmediate=({type, productId, productOptionId, immediatePriceData})=>{
    const navigate=useNavigate();
    const onClickDummy=()=>{
        Swal.fire({
            icon: "success",
            title: `즉시${type==="purchase"?"구매":"판매"}가 완료되었습니다.`,
        })
        navigate("/")
    }

    return(
        <div>
            <ImmediateElement>
                <ImmediateTitle>즉시 {type==="purchase"?"구매":"판매"}가</ImmediateTitle>
                <ImmediateContext>{immediatePriceData}원</ImmediateContext>
            </ImmediateElement>
            <ImmediateSubmit type={type} onClick={onClickDummy}>즉시 {type==="purchase"?"구매":"판매"}하기</ImmediateSubmit>
        </div>
    );
}

const ImmediateElement=styled.div`
    margin-bottom: 30px;
`

const ImmediateTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
    cursor: default;
`

const ImmediateContext=styled.h3`
    margin: 0px;
    text-align: right;
    border-bottom: 1px solid #979797;
    cursor: default;
`

const ImmediateSubmit=styled.button`
    width: 100%;
    border: none;
    background-color: ${props => props.type === "purchase" ? "#ffc9394c" : "#72b8df4c"};
    padding: 10px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
`

export default DoImmediate;