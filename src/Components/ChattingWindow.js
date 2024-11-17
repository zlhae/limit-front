import styled from "styled-components";
import PlusIcon from "../Images/plus_icon.svg";
import ArrowUPIcon from "../Images/arrow-up.svg";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const ChattingWindow=({selectedChatRoomData})=>{
    const chatRoomId=selectedChatRoomData?selectedChatRoomData.chatRoomId:null;
    const [bubbleContentList, setBubbleContentList]=useState([]);
    const [messageInput,setMessageInput]=useState("");
    const bubbleContainerRef = useRef(null);
    const userId = 1;

    useEffect(()=>{
        const accessToken = Cookies.get('accessToken');
        if(selectedChatRoomData) {
            axios
            .get(`https://api.lim-it.one/api/v1/chats/rooms/${chatRoomId}`,{
                params: {
                    page: 0,
                    size: 500,
                    sort: 'ASC'
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response)=>{
                setBubbleContentList(response.data.content);
                if(response.data.content){
                    let bubbleList=response.data.content;
                    bubbleList.reverse();
                    console.log(bubbleList);
                    setBubbleContentList(bubbleList);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[selectedChatRoomData])

    useEffect(() => {
        if (bubbleContainerRef.current) {
            bubbleContainerRef.current.scrollTop = bubbleContainerRef.current.scrollHeight;
        }
    }, [bubbleContentList]);

    useEffect(()=>{
        if(chatRoomId) {
            connect();
        }
        return()=>{
            disconnect();
        };
    },[chatRoomId]);

    const connect = () => {
        let Sock = new SockJS('https://api.lim-it.one/ws/stomp');
        stompClient = over(Sock);
        const accessToken = Cookies.get('accessToken');
        const myHeaders = {
            Authorization: `Bearer ${accessToken}`
        }
        stompClient.connect(myHeaders, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Connected to WebSocket!");
        stompClient.subscribe(`/topic/chat.${chatRoomId}`, onMessageReceived);
    };

    const onMessageReceived = (payload) => {
        let newMessage = JSON.parse(payload.body);
        if (!newMessage.writerId) {
            newMessage = { ...newMessage, writerId: userId };
        }
        setBubbleContentList((prevList) => [...prevList, newMessage]);
    };

    const onError = (err) => {
        console.error('WebSocket connection error:', err);
    };

    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    };

    const sendMessage = () => {
        if (messageInput.trim() && stompClient) {
            const chatRequest = { 
                content: messageInput
            };
            stompClient.send(`/pub/chat/talk/${chatRoomId}`, {}, JSON.stringify(chatRequest));
            setMessageInput("");
        }
    };

    return(
        <ChattingWindowContainer>
            <UserInformation>
                <ImgWrapper>
                    <ProfileImageInWindow src={selectedChatRoomData?.profileImgUrl}></ProfileImageInWindow>
                </ImgWrapper>
                <UserName>{selectedChatRoomData.name}</UserName>
            </UserInformation>

            <SpeechBubbleContainer ref={bubbleContainerRef}>
                {chatRoomId? (
                    bubbleContentList.length > 0 ? (
                        bubbleContentList.map((item) => (
                            item.writerId === userId ? (
                                <MeSpeechBubbleContainer key={item.id}>
                                    <MeSpeechBubble>{item.content}</MeSpeechBubble>
                                </MeSpeechBubbleContainer>
                            ) : (
                                <YouSpeechBubbleContainer key={item.id}>
                                    <YouProfileWrapper>
                                        <YouProfile src={selectedChatRoomData.profileImgUrl} />
                                    </YouProfileWrapper>
                                    <YouSpeechBubble>{item.content}</YouSpeechBubble>
                                </YouSpeechBubbleContainer>
                            )
                        ))
                    ) : (
                        <LoadingMessage>
                            첫 메시지를 보내보세요!
                        </LoadingMessage>
                    )
                ):(
                    <LoadingMessage>
                        채팅방을 선택해주세요
                    </LoadingMessage>
                )}
            </SpeechBubbleContainer>
            <InputWindowContainer>
                <AddPicturebutton src={PlusIcon}></AddPicturebutton>
                <InputWindow>
                    <MessageInput
                        type="text"
                        value={messageInput}
                        onChange={(e)=>setMessageInput(e.target.value)}
                        onKeyDown={(e)=>e.key==='Enter' && sendMessage()}
                    ></MessageInput>
                    <SendButton src={ArrowUPIcon} onClick={sendMessage}></SendButton>
                </InputWindow>
            </InputWindowContainer>
        </ChattingWindowContainer>
    );
}

const ChattingWindowContainer=styled.div`
    width: 70%;
    height: 100%;
`

const UserInformation=styled.div`
    background-color: #d9d9d9;
    width: 100%;
    height: 70px;
    padding: 15px 0px;
    display: flex;
    margin-bottom: 20px;
`

const ImgWrapper=styled.div`
    position: relative;
    width: 70px;
    height: 70px;
    margin: 0px 15px;
`

const ProfileImageInWindow=styled.img`
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
    cursor: pointer;
`

const UserName=styled.p`
    font-size: 18px;
    font-weight: bold;
    margin: auto 0;
`

const SpeechBubbleContainer=styled.div`
    width: 100%;
    height: calc(100% - 190px);
    box-sizing: border-box;
    overflow-y: scroll;
`

const MeSpeechBubbleContainer=styled.div`
    width: 100%;
    text-align: right;
`

const MeSpeechBubble=styled.div`
    background-color: #72b8df4c;
    max-width: 70%;
    padding: 10px;
    border-radius: 15px 0px 15px 15px;
    margin-top: 10px;
    display: inline-block;
    text-align: left;
`

const YouSpeechBubbleContainer=styled.div`
    display: flex;
    width: 100%;
`

const YouProfileWrapper=styled.div`
    position: relative;
    width: 35px;
    height: 35px;
    margin: 0px 10px;
`

const YouProfile=styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50,50);
    width: 100%;
    height: 100%;
    border-radius: 35px;
    object-fit: cover;
    margin: auto;
    cursor: pointer;
`

const YouSpeechBubble=styled.div`
    background-color: #d9d9d9;
    display: inline-block;
    max-width: 70%;
    padding: 10px;
    border-radius: 0px 15px 15px 15px;
    margin-top: 10px;
`

const LoadingMessage=styled.div`
    text-align: center;
    color: #d9d9d9;
`

const InputWindowContainer=styled.div`
    background-color: #ffffff;
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 20px;
`

const AddPicturebutton=styled.img`
    width: 30px;
    color: #d9d9d9;
    margin: 10px;
    cursor: pointer;
`

const InputWindow=styled.div`
    display: flex;
    width: calc(100% - 60px);
    box-sizing: border-box;
    height: 32px;
    margin: 10px 10px 10px 0px;
    background-color: #d9d9d9;
    border-radius: 15px;
`

const MessageInput=styled.input`
    height: 30px;
    width: calc(100% - 20px);
    padding-left: 20px;
    outline: none;
    box-sizing: border-box;
    border: 0;
    border-radius: 15px;
    background-color: #d9d9d9;
`

const SendButton=styled.img`
    width: 28px;
    margin-left: 10px;
    margin-right: 3px;
    color: #72B8DF;
    cursor: pointer;
`

export default ChattingWindow;