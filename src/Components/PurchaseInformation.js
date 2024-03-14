import './PurchaseInformation.css';

const PurchaseInformation=()=>{
    return(
        <div className='product-information'>
            <div className='image'>
                <img src='images/product-mock-data.png'></img>
            </div>
            <div className='text'>
                <h3>1203A507-020</h3>
                <h5>Asics x C.P. Company Gel-Quantum 360 VII Cement Grey</h5>
                <h5>아식스 x C.P. 컴퍼니 젤 퀀텀 360 8 시멘트 그레이</h5>
                <h3>230</h3>
            </div>
        </div>
    );
}

export default PurchaseInformation;