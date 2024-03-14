import './SubmitBox.css';

const SubmitBox=({type, isLeft})=>{
    if(isLeft){
        return(
            <div className={`${type}-submit-box`}>
                <div className={`${type}-bid-price`}>
                    <h5>구매 희망가</h5>
                    <div className={`${type}-bid-price-input`}>
                        <input type='text'></input>
                        <h3>원</h3>
                    </div>
                </div>
                <div className={`${type}-bid-period`}>
                    <h5>입찰 마감기한</h5>
                    <div className={`${type}-bid-period-detail`}>
                        <p>입찰 마감기한은 30일입니다.</p>
                        <p>30일이 지날 경우에는 입찰이 종료되며 그 이후에도 입찰을 원하신다면 다시 입찰을 등록하셔야 합니다.</p>
                        <p>종료된 입찰은 마이페이지에서 삭제 가능합니다.</p>
                    </div>
                </div>
                <button id={`${type}-bid-submit`}>구매 입찰하기</button>
            </div>
        )
    }
    else{
        return(
            <div className={`${type}-submit-box`}>
                <div className={`${type}-immediate-price`}>
                    <h5>즉시 구매가</h5>
                    <h3>439,000원</h3>
                </div>
                <button id={`${type}-immediate-submit`}>즉시 구매하기</button>
            </div>
        )
    }
}

export default SubmitBox;