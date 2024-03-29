import styled from 'styled-components';

const ProductInformation=({image,number,name_en,name_ko,size})=>{
    return(
        <ProductInformationContainer>
            <ProductInformationImgContainer>
                <ProductInformationImg src={image} alt='상품 이미지'></ProductInformationImg>
            </ProductInformationImgContainer>
            <ProductInformationTextContainer>
                <ProductInformationTextBold>{number}</ProductInformationTextBold>
                <ProductInformationTextRegular>{name_en}</ProductInformationTextRegular>
                <ProductInformationTextRegular>{name_ko}</ProductInformationTextRegular>
                <ProductInformationTextBold>{size}</ProductInformationTextBold>
            </ProductInformationTextContainer>
        </ProductInformationContainer>
    );
}

const ProductInformationContainer=styled.div`
    background-color: #ffffff;
    padding: 15px;
    display: flex;
    border-radius: 15px;
    margin-bottom: 30px;
    margin-top: 70px;
`
const ProductInformationImgContainer=styled.div`
    display: inline-block;
    margin-right: 15px;
`
const ProductInformationImg=styled.img`
    width: 110px;
    height: 110px;
    background-color: #dd7e6029;
    border-radius: 15px;
`

const ProductInformationTextContainer=styled.div`
    display: inline-block;
    flex: 1;    
`

const ProductInformationTextBold=styled.h3`
    margin: 0px 0px 5px 0px;
`

const ProductInformationTextRegular=styled.h5`
    margin: 0px 0px 5px 0px;
    font-weight: normal;
    overflow: hidden;
`

export default ProductInformation;