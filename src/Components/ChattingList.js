import styled from "styled-components"
import ChattingRoom from "./ChattingRoom"

const ChattingList=({chatListData, selectedChatRoom, setSelectedChatRoom})=>{
    const handleSelectedChatRoom=(id)=>{
        setSelectedChatRoom(id);
    }

    return(
        <ChattingListContainer>
            {chatListData && chatListData.map(item=>(
                <ChattingRoom
                    chatRoomData={item}
                    key={item.id}
                    selectedChatRoom={selectedChatRoom}
                    handleSelectedChatRoom={handleSelectedChatRoom}
                ></ChattingRoom>
            ))}
        </ChattingListContainer>
    )
}

const ChattingListContainer=styled.div`
    width: 30%;
    height: 100%;
    overflow-y: scroll;
`

export default ChattingList;