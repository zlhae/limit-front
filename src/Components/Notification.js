import { useState } from "react";
import styled from "styled-components";
import MenuIcon from "../Images/menu-button.svg";
import CsCenterSideBar from "./CsCenterSideBar";

const Notification=()=>{
    const [showSideBar, setShowSideBar]=useState(false);
    const [showNotification, setShowNotification]=useState(null);

    const notificationData=[
        {
            id: 0,
            title: "[2024.04.03] 서비스 점검 안내",
            content: "0 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 1,
            title: "[2024.04.02] 서비스 점검 안내",
            content: "1 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 2,
            title: "[2024.04.01] 서비스 점검 안내",
            content: "2 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 3,
            title: "[2024.03.31] 서비스 점검 안내",
            content: "3 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 4,
            title: "[2024.03.30] 서비스 점검 안내",
            content: "4 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 5,
            title: "[2024.03.29] 서비스 점검 안내",
            content: "5 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 6,
            title: "[2024.03.28] 서비스 점검 안내",
            content: "6 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 7,
            title: "[2024.03.27] 서비스 점검 안내",
            content: "7 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 8,
            title: "[2024.03.26] 서비스 점검 안내",
            content: "8 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        }
    ]

    const handleShowSideBar=()=>{
        setShowSideBar(!showSideBar);
    }
    const handleShowNotification=(id)=>{
        setShowNotification(id===showNotification?null:id);
    }

    return(
        <ContentContainer>
            {showSideBar&&<NavigationContainer>
                <CategoryContainer>
                    <NavigationElement>공지사항</NavigationElement>
                    <NavigationElement>이벤트</NavigationElement>
                    <NavigationElement>서비스 안내</NavigationElement>
                </CategoryContainer>
                <CategoryContainer>
                    <NavigationElement>상품 등록 문의</NavigationElement>
                    <NavigationElement>기타 문의</NavigationElement>
                </CategoryContainer>
                <SideBarClose onClick={handleShowSideBar}>닫기</SideBarClose>
            </NavigationContainer>}
            <MenuImg src={MenuIcon} onClick={handleShowSideBar}></MenuImg>
            <ContentTitle>공지사항</ContentTitle>
            <NotificationContainer>
                {notificationData.map(item=>
                    <div key={item}>
                        <NotificationElement>
                            <div>
                                <NotificationTag>공지</NotificationTag>
                                <NotificationTitle>{item.title}</NotificationTitle>
                            </div>
                            <NotificationButton onClick={(e)=>handleShowNotification(item.id)}>{showNotification===item.id?"닫기":"보기"}</NotificationButton>
                        </NotificationElement>
                        {showNotification===item.id&&<NotificationContentContainer>
                            <NotificationContent>{item.content}</NotificationContent>
                        </NotificationContentContainer>}
                    </div>
                )}
            </NotificationContainer>
        </ContentContainer>
    );
}

const ContentContainer=styled.div`
    flex: 2;
`

const NavigationContainer=styled.div`
    position: fixed;
    left: 10%;
    background-color: #f5f5f7;
    width: 100px;
    height: 500px;
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

const SideBarClose=styled.h5`
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

const NotificationContainer=styled.div`
    height: 450px;
    overflow-y: scroll;
`

const NotificationElement=styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    @media (max-width:450px){
        padding: 10px;
    }
`

const NotificationTag=styled.h5`
    margin: 0px;
    display: inline-block;
    color: #979797;
    margin-right: 20px;
    cursor: default;

    @media (max-width:450px){
        margin-right: 10px;
    }
`

const NotificationTitle=styled.h5`
    margin: 0px;
    display: inline-block;
    font-weight: normal;
    cursor: default;
`

const NotificationButton=styled.button`
    border: 0;
    padding: 5px 10px;
    display: block;
    background-color: #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
`

const NotificationContentContainer=styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid #979797;
`

const NotificationContent=styled.h5`
    margin: 0px;
    font-weight: normal;
`

export default Notification;