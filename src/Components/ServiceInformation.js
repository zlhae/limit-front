import styled from "styled-components";
import MenuIcon from "../Images/menu-button.svg";
import CsCenterContent from "./CsCenterContent";

const ServiceInformation=({handleShowMobileSideBar})=>{
    const serviceInformationData=[
        {
            id: 0,
            title: "[2024.04.03] 서비스 안내",
            content: "0 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 1,
            title: "[2024.04.02] 서비스 안내",
            content: "1 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 2,
            title: "[2024.04.01] 서비스 안내",
            content: "2 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 3,
            title: "[2024.03.31] 서비스 안내",
            content: "3 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 4,
            title: "[2024.03.30] 서비스 안내",
            content: "4 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 5,
            title: "[2024.03.29] 서비스 안내",
            content: "5 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 6,
            title: "[2024.03.28] 서비스 안내",
            content: "6 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 7,
            title: "[2024.03.27] 서비스 안내",
            content: "7 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        },
        {
            id: 8,
            title: "[2024.03.26] 서비스 안내",
            content: "8 안녕하세요. limit 고객센터 담당자 홍길동입니다. 해당 일자 서비스 점검에 대해 안내합니다. 점검 대상 게시판은 메인화면입니다. 감사합니다."
        }
    ]

    return(
        <ContentContainer>
            <MenuImg src={MenuIcon} onClick={(e)=>{e.stopPropagation(); handleShowMobileSideBar();}}></MenuImg>
            <ContentTitle>서비스 안내</ContentTitle>
            <CsCenterContent type="공지" contentData={serviceInformationData}></CsCenterContent>
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

export default ServiceInformation;