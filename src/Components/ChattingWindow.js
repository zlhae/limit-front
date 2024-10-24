import styled from "styled-components";
import PlusIcon from "../Images/plus_icon.svg";
import ArrowUPIcon from "../Images/arrow-up.svg";
import React, { useState, useEffect } from "react";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

var stompClient=null;
const ChattingWindow=({selectedChattingRoomData})=>{
    const [privateChats, setPrivateChats]=useState(new Map());
    const [publicChats, setPublicChats]=useState([]);
    const [tab, setTab]=useState("CHATROOM");
    const [userData, setUserData]=useState({
        username: '',
        connected: false,
    });
    const [customHeaders, setCustomeHeaders]=useState({
        Authorization: `Bearer ${Cookies.get("accessToken") || ''}`
    })
    const [messageInput, setMessageInput] = useState("");

    useEffect(()=>{
        console.log(userData);
    }, [userData]);

    const connect=()=>{
        let Sock=new SockJS('https://api.lim-it.one/ws/stomp');
        stompClient=over(Sock);
        stompClient.connect(customHeaders, onConnected, onError);
    }

    const onConnected=()=>{
        setUserData({...userData, "connected": true});

        stompClient.subscribe('/topic/chat.1', onMessageReceived);
        stompClient.subscribe('/queue/error', onMessageReceived);

        var chatRequest={
            content: "HELLO I'm "+userData.username
        }
        stompClient.send("/pub/chat/talk/1", null, JSON.stringify(chatRequest));
    }

    const onMessageReceived=(payload)=>{
        var payloadData=JSON.parse(payload.body);
        console.log(payloadData);
    }

    const onError=(err)=>{
        console.log(err);
    }

    const handleMessage =(event)=>{
        var messageContent = messageInput;
        messageContent = "asdf!!!test1"; // 이건 html text input 받으면 되는데 몰라서 못 받겠어요
        if (messageContent && stompClient) { // 메세지 입력했고, stomp 연결된 경우
            var chatRequest = {
                content: messageInput + userData.username + ": sent message!",
            };

            // 메세지 전송, /pub/chat/talk/{chatRoomId}
            stompClient.send("/pub/chat/talk/1", null, JSON.stringify(chatRequest));
        }
    }

    const sendValue=()=>{
        if (stompClient) {
            var chatRequest = {
                content: messageInput + userData.username,
            };

            stompClient.send("/pub/chat/talk/1", null, JSON.stringify(chatRequest));
            setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }

    return(
        <ChattingWindowContainer>
            <UserInformation>
                <ImgWrapper>
                    <ProfileImageInWindow src={selectedChattingRoomData.profile_img}></ProfileImageInWindow>
                </ImgWrapper>
                <UserName>{selectedChattingRoomData.user_name}</UserName>
            </UserInformation>
            <SpeechBubbleContainer>
                <MeSpeechBubbleContainer>
                    <MeSpeechBubble>안녕하세요! 거래하고 싶어 연락 드립니다!</MeSpeechBubble>
                </MeSpeechBubbleContainer>   
                <YouSpeechBubbleContainer>                    
                    <YouProfileWrapper>
                        <YouProfile src={selectedChattingRoomData.profile_img}></YouProfile>
                    </YouProfileWrapper>    
                    <YouSpeechBubble>네 가능하십니다.</YouSpeechBubble>
                </YouSpeechBubbleContainer>
                <YouSpeechBubbleContainer>                    
                    <YouProfileWrapper>
                        <YouProfile src={selectedChattingRoomData.profile_img}></YouProfile>
                    </YouProfileWrapper>    
                    <YouSpeechBubble>배송 방식은 어떤 거 원하실까요? 편의점 택배는 3000원 우체국 택배는 4000원입니다.</YouSpeechBubble>
                </YouSpeechBubbleContainer>
                <YouSpeechBubbleContainer>                    
                    <YouProfileWrapper>
                        <YouProfile src={selectedChattingRoomData.profile_img}></YouProfile>
                    </YouProfileWrapper>    
                    <YouSpeechBubble>원하시는 배송 방법의 금액을 포함하여 총 000000원 농협 000 0000 000000으로 입금해주시고 배송지 정보 남겨주세요.</YouSpeechBubble>
                </YouSpeechBubbleContainer>
                <MeSpeechBubbleContainer>
                    <MeSpeechBubble>편의점 택배로 부탁드립니다!</MeSpeechBubble>
                </MeSpeechBubbleContainer>
                <MeSpeechBubbleContainer>
                    <MeSpeechBubble>주소는 ㅇㅇ시 ㅇ구 ㅇㅇ동 ㅇㅇㅇ아파트 ㅇㅇㅇ동 ㅇㅇㅇ호로 부탁드려요!</MeSpeechBubble>
                </MeSpeechBubbleContainer>
                <YouSpeechBubbleContainer>                    
                    <YouProfileWrapper>
                        <YouProfile src={selectedChattingRoomData.profile_img}></YouProfile>
                    </YouProfileWrapper>    
                    <YouSpeechBubble>넵! 발송 후 연락드리겠습니다 좋은 하루 되세요</YouSpeechBubble>
                </YouSpeechBubbleContainer>
            </SpeechBubbleContainer>
            <InputWindowContainer>
                <AddPicturebutton src={PlusIcon}></AddPicturebutton>
                <InputWindow>
                    <MessageInput type="text"></MessageInput>
                    <SendButton src={ArrowUPIcon}></SendButton>
                </InputWindow>
            </InputWindowContainer>
        </ChattingWindowContainer>
    )
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