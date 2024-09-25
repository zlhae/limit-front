import styled from "styled-components";
import MenuIcon from "../Images/menu-button.svg";
import CsCenterContent from "./CsCenterContent";

const Notification=({handleShowMobileSideBar})=>{
    return(
        <ContentContainer>
            <MenuImg src={MenuIcon} onClick={(e)=>{e.stopPropagation(); handleShowMobileSideBar();}}></MenuImg>
            <ContentTitle>공지사항</ContentTitle>
            <CsCenterContent type="공지"></CsCenterContent>
        </ContentContainer>
    );
}

const ContentContainer=styled.div`
    flex: 2;
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

export default Notification;