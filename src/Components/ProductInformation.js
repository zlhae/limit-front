import styled from 'styled-components';

const ProductInformation=({productInformationData})=>{
    return(
        <ProductInformationContainer>
            <ProductInformationImgContainer>
                <ProductInformationImg src={productInformationData.imageUrl} alt='상품 이미지'></ProductInformationImg>
            </ProductInformationImgContainer>
            <ProductInformationTextContainer>
                <ProductInformationTextBold>{productInformationData.modelNumber}</ProductInformationTextBold>
                <ProductInformationTextRegular>{productInformationData.name_eng}</ProductInformationTextRegular>
                <ProductInformationTextRegular>{productInformationData.name_kor}</ProductInformationTextRegular>
                <ProductInformationTextBold>{productInformationData.size}</ProductInformationTextBold>
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
    display: block;
    width: 110px;
    height: 110px;
    background-color: #f5f5f7;
    border-radius: 15px;
`

const ProductInformationTextContainer=styled.div`
    display: inline-block;
    flex: 1;
    min-width: 150px;
`

const ProductInformationTextBold=styled.h3`
    margin: 0px 0px 5px 0px;
    cursor: default;
`

const ProductInformationTextRegular=styled.h5`
    margin: 0px 0px 5px 0px;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
`

export default ProductInformation;