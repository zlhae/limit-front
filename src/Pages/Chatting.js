import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import SubHeader from "../Components/SubHeader";
import ChattingList from "../Components/ChattingList";
import ChattingWindow from "../Components/ChattingWindow";
import { useNavigate } from "react-router-dom";

const Chatting=()=>{
    const navigate = useNavigate();
    const [chatListData, setChatListData]=useState();
    const [selectedChatRoom, setSelectedChatRoom]=useState(null);
    const [selectedChatRoomData,setSelectedChatRoomData]=useState({});

    useEffect(()=>{
        const accessToken = Cookies.get('accessToken');
        axios
            .get('https://api.lim-it.one/api/v1/chats/rooms',{
                params: {
                    page: 0,
                    size: 20,
                    sort: 'ASC'
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response)=>{
                setChatListData(response.data.content);
            })
            .catch((error)=>{
                console.log(error);
            })
    },[])

    useEffect(()=>{
        chatListData && chatListData.map((item)=>{
            if(item.chatRoomId===selectedChatRoom){
                setSelectedChatRoomData(item);
            }
        })
    },[selectedChatRoom])

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        if (!accessToken) {
            alert("로그인 이용 후 이용가능합니다.");
            navigate("/"); 
        }
    }, [navigate]);

    return(
        <div>
            <SubHeader></SubHeader>
            <ChattingComponent>
                <ChattingList
                    chatListData={chatListData}
                    selectedChatRoom={selectedChatRoom}
                    setSelectedChatRoom={setSelectedChatRoom}
                ></ChattingList>
                
                <ChattingWindow
                    selectedChatRoomData={selectedChatRoomData}
                ></ChattingWindow>
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