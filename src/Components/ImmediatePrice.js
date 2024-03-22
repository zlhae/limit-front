import './ImmediatePrice.css';

const ImmediatePrice=({purchase, sale})=>{
    return(
        <div className='immediate-price'>
            <div className='purchase'>
                <h5>즉시 구매가</h5>
                <h3>{purchase.toLocaleString('ko-KR')}원</h3>
            </div>
            <div className='sale'>
                <h5>즉시 판매가</h5>
                <h3>{sale.toLocaleString('ko-KR')}원</h3>
            </div>
        </div>
    );
}

export default ImmediatePrice;