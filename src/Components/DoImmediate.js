import './DoImmediate.css';

const DoImmediate=({type, immediatePriceData})=>{
    return(
        <div className={`${type}-submit-box`}>
            <div id={`${type}-component`} className={`${type}-immediate-price`}>
                <h5 id={`${type}-title`}>즉시 {type==="purchase"?"구매":"판매"}가</h5>
                <h3>{(type==="purchase"?immediatePriceData.purchase:immediatePriceData.sale).toLocaleString('ko-KR')}원</h3>
            </div>
            <button id={`${type}-immediate-submit`}>즉시 {type==="purchase"?"구매":"판매"}하기</button>
        </div>
    );
}

export default DoImmediate;