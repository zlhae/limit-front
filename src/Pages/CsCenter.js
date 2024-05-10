import styled from 'styled-components';
import { useState } from 'react';
import SubHeader from '../Components/SubHeader';
import Notification from '../Components/Notification';
import Event from '../Components/Event';
import ServiceInformation from '../Components/ServiceInformation';
import ProductRegistrationInquiry from '../Components/ProductRegistrationInquiry';
import OtherInquiry from '../Components/OtherInquiry';

const CsCenter=()=>{
    const [menu, setMenu]=useState(0);

    const handleMenu=(menu)=>{
        setMenu(menu);
    }

    const showContent=()=>{
        switch(menu){
            case 0: return(<Notification handleMenu={handleMenu}></Notification>);
            case 1: return(<Event handleMenu={handleMenu}></Event>)
            case 2: return(<ServiceInformation handleMenu={handleMenu}></ServiceInformation>)
            case 3: return(<ProductRegistrationInquiry handleMenu={handleMenu}></ProductRegistrationInquiry>)
            case 4: return(<OtherInquiry handleMenu={handleMenu}></OtherInquiry>)
            default: return(<Notification handleMenu={handleMenu}></Notification>);
        }
    }

    return(
        <div>
            <SubHeader></SubHeader>
            <CsCenterContainer>
                <NavigationContainer>
                    <NavigationTitle>고객센터</NavigationTitle>
                    <CategoryContainer>
                        <NavigationElement onClick={(e)=>{handleMenu(0)}}>공지사항</NavigationElement>
                        <NavigationElement onClick={(e)=>{handleMenu(1)}}>이벤트</NavigationElement>
                        <NavigationElement onClick={(e)=>{handleMenu(2)}}>서비스 안내</NavigationElement>
                    </CategoryContainer>
                    <CategoryContainer>
                        <NavigationElement onClick={(e)=>{handleMenu(3)}}>상품 등록 문의</NavigationElement>
                        <NavigationElement onClick={(e)=>{handleMenu(4)}}>기타 문의</NavigationElement>
                    </CategoryContainer>
                </NavigationContainer>
                {showContent()}
            </CsCenterContainer>
        </div>
    )
}

const CsCenterContainer=styled.div`
    margin: 0px 10%;
    margin-top: 70px;
    display: flex;

    @media (max-width: 600px){
        margin: 0px 5%;
    }
`

const NavigationContainer=styled.div`
    width: 90px;
    margin-right: 50px;

    @media (max-width:600px){
        display: none;
    }
`

const NavigationTitle=styled.h3`
    margin: 0px;
    margin-bottom: 20px;
    cursor: default;
`

const CategoryContainer=styled.div`
    margin-bottom: 15px;
`

const NavigationElement=styled.h5`
    margin: 0px;
    margin-bottom: 10px;
    font-weight: normal;
    cursor: pointer;
`

export default CsCenter;