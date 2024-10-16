import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
  
var stompClient =null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
      });
    const [customHeaders, setCustomHeaders] = useState({ // 헤더에 담을 정보, 토큰 등등..
        // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjAzMzUxODIsImV4cCI6MTc1NDg5NTE4Miwic3ViIjoiMyJ9.-NtQ3zwF92B3nezmLQhj5DkbvHltAPM2eo_mbjF5h1Q"
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjA2MTczOTIsImV4cCI6MTc1NTE3NzM5Miwic3ViIjoiMSJ9.zaGUNZaEA_9GWICoTKIaVuov9r3Ft-JeT6sxIfBPzPU"
    })
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect = () => {
        // let Sock = new SockJS('http://localhost:8080/ws/stomp');
        let Sock = new SockJS('https://api.lim-it.one/ws/stomp');
        stompClient = over(Sock);
        stompClient.connect(customHeaders, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});

        // 채팅방 메세지 받겠다고 전송
        // /topic/chat.{chatRoomId}
        // 어느 채팅방에 있는지 정보는 자신의 채팅방 목록 조회를 하고,
        // 그 id 리스트로 반복문 돌려야 할 것 같아요
        stompClient.subscribe('/topic/chat.1', onMessageReceived);
        stompClient.subscribe('/queue/error', onMessageReceived)

        var chatRequest = {
            content: "HELLO I'm " + userData.username
        };
        stompClient.send("/pub/chat/talk/1", null, JSON.stringify(chatRequest));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
    }

    const onError = (err) => {
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
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue} onKeyDownCapture={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                {/* <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                            <button type="button" className="send-button" onClick={sendPrivateValue} onKeyDownCapture={sendValue}>send</button>
                </div> */}
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom
