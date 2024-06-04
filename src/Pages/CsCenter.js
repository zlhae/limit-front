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

    const [showMobileSideBar, setShowMobileSideBar]=useState(false);

    const handleShowMobileSideBar=()=>{
        setShowMobileSideBar(!showMobileSideBar);
    }

    const showContent=()=>{
        switch(menu){
            case 0: return(<Notification handleShowMobileSideBar={handleShowMobileSideBar}></Notification>);
            case 1: return(<Event handleShowMobileSideBar={handleShowMobileSideBar}></Event>)
            case 2: return(<ServiceInformation handleShowMobileSideBar={handleShowMobileSideBar}></ServiceInformation>)
            case 3: return(<ProductRegistrationInquiry handleShowMobileSideBar={handleShowMobileSideBar}></ProductRegistrationInquiry>)
            case 4: return(<OtherInquiry handleShowMobileSideBar={handleShowMobileSideBar}></OtherInquiry>)
            default: return(<Notification handleShowMobileSideBar={handleShowMobileSideBar}></Notification>);
        }
    }

    return(
        <div onClick={()=>{setShowMobileSideBar(false)}}>
            <SubHeader></SubHeader>
            <CsCenterContainer>
                <NavigationContainer $showMobileSideBar={showMobileSideBar}>
                    <NavigationTitle>고객센터</NavigationTitle>
                    <CategoryContainer>
                        <NavigationElement
                            onClick={(e)=>{handleMenu(0)}}
                            selected={menu===0}
                        >공지사항</NavigationElement>
                        <NavigationElement
                            onClick={(e)=>{handleMenu(1)}}
                            selected={menu===1}
                        >이벤트</NavigationElement>
                        <NavigationElement
                            onClick={(e)=>{handleMenu(2)}}
                            selected={menu===2}
                        >서비스 안내</NavigationElement>
                    </CategoryContainer>
                    <CategoryContainer>
                        <NavigationElement
                            onClick={(e)=>{handleMenu(3)}}
                            selected={menu===3}
                        >상품 등록 문의</NavigationElement>
                        <NavigationElement
                            onClick={(e)=>{handleMenu(4)}}
                            selected={menu===4}
                        >기타 문의</NavigationElement>
                    </CategoryContainer>
                </NavigationContainer>
                {showContent()}
            </CsCenterContainer>
        </div>
    )
}

const CsCenterContainer=styled.div`
    margin: 0px 10%;
    display: flex;

    @media (max-width: 600px){
        margin: 0px 5%;
        margin-top: -40px;
    }
`

const NavigationContainer=styled.div`
    width: 90px;
    margin-right: 50px;

    @media (max-width:600px){
        position: fixed;
        top: 0;
        width: 125px;
        height: 100%;
        padding-top: 10%;
        z-index: 100;
        transition: left 0.1s ease-in-out;
        background-color: #f5f5f7;
        left: ${(props)=> props.$showMobileSideBar ? "5%" : "-100%"};
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
    color: ${(props) => (props.selected ? "#B1B1B2" : "black")}; 
    text-decoration: ${(props) => (props.selected ? "underline" : "none")}; 
`

export default CsCenter;