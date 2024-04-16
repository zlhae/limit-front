import styled from "styled-components";
import { useState } from "react";
import MenuIcon from "../Images/menu-button.svg";
import CancelIcon from "../Images/cancel-icon.svg";
import CsCenterContent from "./CsCenterContent";

const Event=(props)=>{
    const [showSideBar, setShowSideBar]=useState(false);

    const handleShowSideBar=()=>{
        setShowSideBar(!showSideBar);
    }
    
    const eventData=[
        {
            id: 0,
            title: "[2024.04.03] 이벤트 안내",
            content: "0 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        },
        {
            id: 1,
            title: "[2024.04.02] 이벤트 안내",
            content: "1 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        },
        {
            id: 2,
            title: "[2024.04.01] 이벤트 안내",
            content: "2 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        },
        {
            id: 3,
            title: "[2024.03.31] 이벤트 안내",
            content: "3 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        },{
            id: 4,
            title: "[2024.03.30] 이벤트 안내",
            content: "4 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        },
        {
            id: 5,
            title: "[2024.03.29] 이벤트 안내",
            content: "0 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자부터 시작되는 이벤트에 대해 공지하고자 합니다. 많은 관심 부탁드립니다."
        }
    ]

    return(
        <ContentContainer>
            {showSideBar&&<NavigationContainer>
                <NavigationTitle>고객센터</NavigationTitle>
                <SideBarClose src={CancelIcon} onClick={handleShowSideBar}></SideBarClose>
                <CategoryContainer>
                    <NavigationElement onClick={()=>props.handleMenu(0)}>공지사항</NavigationElement>
                    <NavigationElement onClick={()=>props.handleMenu(1)}>이벤트</NavigationElement>
                    <NavigationElement onClick={()=>props.handleMenu(2)}>서비스 안내</NavigationElement>
                </CategoryContainer>
                <CategoryContainer>
                    <NavigationElement onClick={()=>props.handleMenu(3)}>상품 등록 문의</NavigationElement>
                    <NavigationElement onClick={()=>props.handleMenu(4)}>기타 문의</NavigationElement>
                </CategoryContainer>
            </NavigationContainer>}
            <MenuImg src={MenuIcon} onClick={handleShowSideBar}></MenuImg>
            <ContentTitle>이벤트</ContentTitle>
            <CsCenterContent type="이벤트" contentData={eventData}></CsCenterContent>
        </ContentContainer>
    )
}

const ContentContainer=styled.div`
    flex: 2;
`

const NavigationContainer=styled.div`
    position: fixed;
    left: 10%;
    background-color: #f5f5f7;
    width: 125px;
    height: 500px;
`

const NavigationTitle=styled.h3`
    margin: 0px;
    margin-bottom: 20px;
    cursor: default;
    display: inline-block;
    margin-right: 15px;
`

const SideBarClose=styled.img`
    cursor: pointer;
    width: 15px;
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

const MenuImg=styled.img`
    width: 18px;
    margin-right: 15px;
    cursor: pointer;

    @media (min-width:600px){
        display: none;
    }
`

const ContentTitle=styled.h3`
    margin: 0px;
    margin-bottom: 20px;
    cursor: default;
    display: inline-block;
`

export default Event;