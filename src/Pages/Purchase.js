import './Purchase.css';
import { useState } from 'react';
import PurchaseInformation from '../Components/PurchaseInformation';
import ImmediatePrice from '../Components/ImmediatePrice';
import SubmitBox from '../Components/SubmitBox';

const Purchase=()=>{
    const [isLeft,setIsLeft]=useState(true);

    const onClickLeft=()=>{
        setIsLeft(true);
    }
    const onClickRight=()=>{
        setIsLeft(false);
    }

    return(
        <div className="purchase-container">
            <PurchaseInformation></PurchaseInformation>
            <ImmediatePrice></ImmediatePrice>
            <div className='toggle-container'>
                <div
                    className={`purchase-bid${isLeft?"-checked":""}`}
                    onClick={onClickLeft}
                >
                    <h5>구매 입찰</h5>
                </div>
                <div
                    className={`purchase-immediate${isLeft?"":"-checked"}`}
                    onClick={onClickRight}
                >
                    <h5>즉시 구매</h5>
                </div>
            </div>
            <SubmitBox
                type={"purchase"}
                isLeft={isLeft}
            ></SubmitBox>
        </div>
    );
}

export default Purchase;