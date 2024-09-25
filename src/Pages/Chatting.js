import styled from "styled-components";
import SubHeader from "../Components/SubHeader";
import ChattingList from "../Components/ChattingList";
import ChattingWindow from "../Components/ChattingWindow";

import TestProfileImg1 from "../Images/test_profile_img1.png"
import TestProfileImg2 from "../Images/test_profile_img2.png"
import TestProfileImg3 from "../Images/test_profile_img3.jpg"
import TestProfileImg4 from "../Images/test_profile_img4.png"
import TestProfileImg5 from "../Images/test_profile_img5.png"
import TestProfileImg6 from "../Images/test_profile_img6.png"
import TestProfileImg7 from "../Images/test_profile_img7.png"
import TestProfileImg8 from "../Images/test_profile_img8.png"

const Chatting=()=>{
    const chattingListData=[
        {
            id: 0,
            profile_img: TestProfileImg1,
            user_name: "치이카와",
            content: "안녕하세요! 거래하고 싶어 연락 드립니다!"
        },
        {
            id: 1,
            profile_img: TestProfileImg2,
            user_name: "하치와레",
            content: "넵! 그럼 배송하고 연락드리겠습니다!"
        },
        {
            id: 2,
            profile_img: TestProfileImg3,
            user_name: "우사기",
            content: "배송 방식은 어떤 거 원하실까요? 편의점 택배는 3000원 우체국 택배는 4000원입니다."
        },
        {
            id: 3,
            profile_img: TestProfileImg4,
            user_name: "쿠리만쥬",
            content: "안녕하세요! 거래하고 싶어 연락 드립니다!"
        },
        {
            id: 4,
            profile_img: TestProfileImg5,
            user_name: "모몽가",
            content: "넵! 그럼 배송하고 연락드리겠습니다!"
        },
        {
            id: 5,
            profile_img: TestProfileImg6,
            user_name: "시사",
            content: "배송 방식은 어떤 거 원하실까요? 편의점 택배는 3000원 우체국 택배는 4000원입니다."
        },
        {
            id: 6,
            profile_img: TestProfileImg7,
            user_name: "카니",
            content: "안녕하세요! 거래하고 싶어 연락 드립니다!"
        },
        {
            id: 7,
            profile_img: TestProfileImg8,
            user_name: "랏코",
            content: "넵! 그럼 배송하고 연락드리겠습니다!"
        },
    ]

    return(
        <div>
            <SubHeader></SubHeader>
            <ChattingComponent>
                <ChattingList chattingListData={chattingListData}></ChattingList>
                <ChattingWindow></ChattingWindow>
            </ChattingComponent>
        </div>
    )
}

const ChattingComponent=styled.div`
    display: flex;
    margin: 0 10%;
    margin-top: -70px;
    height: calc(100vh - 130px);
    box-sizing: border-box;
`

export default Chatting;