import styled from "styled-components"

const ChattingRoom=({chatRoomData, selectedChatRoom, handleSelectedChatRoom})=>{
    return(
        <ChattingRoomContainer
            $check={selectedChatRoom===chatRoomData.chatRoomId?true:false}
            onClick={(e)=>{handleSelectedChatRoom(chatRoomData.chatRoomId)}}
        >
            <ImgWrapper>
                <ProfileImageInList src={chatRoomData.profileImgUrl}></ProfileImageInList>
            </ImgWrapper>
            <ChattingPreview>
                <UserNameInList>{chatRoomData.name}</UserNameInList>
                <ContentInPreview>{chatRoomData.lastChatMessage}</ContentInPreview>
            </ChattingPreview>
        </ChattingRoomContainer>
    )
}

const ChattingRoomContainer=styled.div`
    display: flex;
    width: 100%;
    background-color: ${props => props.$check === true ? "#d9d9d9" : "transparent"};
    border-bottom: 1px solid black;
    cursor: pointer;
`

const ImgWrapper=styled.div`
    position: relative;
    width: 70px;
    height: 70px;
    margin: 15px;
`

const ProfileImageInList=styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50,50);
    width: 100%;
    height: 100%;
    border-radius: 35px;
    border: 1px solid black;
    object-fit: cover;
    margin: auto;
`

const ChattingPreview=styled.div`
    width: calc(100% - 115px);
    box-sizing: border-box;
    margin: auto;
    margin-right: 15px;
`

const UserNameInList=styled.p`
    margin: 0;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: bold;
`

const ContentInPreview=styled.p`
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default ChattingRoom;