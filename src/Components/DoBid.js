import './DoBid.css';
import { useState } from 'react';

const DoBid=({type})=>{
    const [bidPrice, setBidPrice]=useState("");
    
    return(
        <div className={`${type}-submit-box`}>
            <div id={`${type}-component`} className={`${type}-bid-price`}>
                <h5 id={`${type}-title`}>{type==="purchase"?"구매":"판매"} 희망가</h5>
                <div className={`${type}-bid-price-input`}>
                    <input type='number' onChange={(e)=>{setBidPrice(Number(e.target.value))}}></input>
                    <h3>원</h3>
                </div>
            </div>
            <div id={`${type}-component`} className={`${type}-bid-period`}>
                <h5 id={`${type}-title`}>입찰 마감기한</h5>
                <div className={`${type}-bid-period-detail`}>
                    <p>입찰 마감기한은 30일입니다.</p>
                    <p>30일이 지날 경우에는 입찰이 종료되며 그 이후에도 입찰을 원하신다면 다시 입찰을 등록하셔야 합니다.</p>
                    <p>종료된 입찰은 마이페이지에서 삭제 가능합니다.</p>
                </div>
            </div>
            <button id={`${type}-bid-submit`}>{type==="purchase"?"구매":"판매"} 입찰하기</button>
        </div>
        
    );
}

export default DoBid;