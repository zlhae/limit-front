import './Sale.css';
import { useState } from 'react';
import ProductInformation from "../Components/ProductInformation"
import ImmediatePrice from '../Components/ImmediatePrice';
import DoBid from '../Components/DoBid';
import DoImmediate from '../Components/DoImmediate';
import SaleSecondhand from '../Components/SaleSecondhand';

const Sale=()=>{
    const [position,setPosition]=useState(1);

    const productInformationData={
        image: 'images/product-mock-data.png',
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
                        type="sale"
                    ></DoBid>
                );
            case 2:
                return(
                    <DoImmediate
                        type="sale"
                        immediatePriceData={immediatePriceData}
                    ></DoImmediate>
                );
            case 3:
                return(
                    <SaleSecondhand
                        type="sale"
                    ></SaleSecondhand>
                )
            default:
                return;
        }
    }

    return(
        <div className="sale-container">
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
            <div className='sale-toggle-container'>
                <div
                    className={`sale-bid${position===1?"-checked":""}`}
                    onClick={(e)=>setPosition(1)}
                >
                    <h5>판매 입찰</h5>
                </div>
                <div
                    className={`sale-immediate${position===2?"-checked":""}`}
                    onClick={(e)=>setPosition(2)}
                >
                    <h5>즉시 판매</h5>
                </div>
                <div
                    className={`sale-secondhand${position===3?"-checked":""}`}
                    onClick={(e)=>setPosition(3)}
                >
                    <h5>중고 상품 등록</h5>
                </div>
            </div>
            {showSubmitBox()}
        </div>
    );
}

export default Sale;