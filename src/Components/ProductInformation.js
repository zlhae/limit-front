import './ProductInformation.css';

const ProductInformation=({image,number,name_en,name_ko,size})=>{
    return(
        <div className='product-information'>
            <div className='image'>
                <img src={image} alt='상품 이미지'></img>
            </div>
            <div className='text'>
                <h3>{number}</h3>
                <h5>{name_en}</h5>
                <h5>{name_ko}</h5>
                <h3>{size}</h3>
            </div>
        </div>
    );
}

export default ProductInformation;