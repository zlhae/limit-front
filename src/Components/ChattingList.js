import styled from "styled-components"
import { useState } from "react"
import ChattingRoom from "./ChattingRoom"

const ChattingList=({chattingListData})=>{
    const [selectedChattingRoom, setSelectedChattingRoom]=useState(null);

    const handleSelectedChattingRoom=(id)=>{
        setSelectedChattingRoom(id);
    }

    return(
        <ChattingListContainer>
            {chattingListData.map(item=>(
                <ChattingRoom
                    chattingRoomData={item}
                    key={item.id}
                    selectedChattingRoom={selectedChattingRoom}
                    handleSelectedChattingRoom={handleSelectedChattingRoom}
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