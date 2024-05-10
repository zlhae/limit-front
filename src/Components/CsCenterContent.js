import styled from "styled-components"
import { useState } from "react";

const CsCenterContent=({type, contentData})=>{
    const [showContent, setShowContent]=useState(null);
    const handleShowContent=(id)=>{
        setShowContent(id===showContent?null:id);
    }

    return(
        <NotificationContainer>
            {contentData.map(item=>
                <div key={item.id}>
                    <NotificationElement>
                        <div>
                            <NotificationTag>{type}</NotificationTag>
                            <NotificationTitle>{item.title}</NotificationTitle>
                        </div>
                        <NotificationButton onClick={(e)=>handleShowContent(item.id)}>{showContent===item.id?"닫기":"보기"}</NotificationButton>
                    </NotificationElement>
                    {showContent===item.id&&<NotificationContentContainer>
                        <NotificationContent>{item.content}</NotificationContent>
                    </NotificationContentContainer>}
                </div>
            )}
        </NotificationContainer>
    )
}

const NotificationContainer=styled.div`
    height: 425px;
    overflow-y: scroll;
`

const NotificationElement=styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    @media (max-width:450px){
        padding: 10px;
    }
`

const NotificationTag=styled.h5`
    margin: 0px;
    display: inline-block;
    color: #979797;
    margin-right: 20px;
    cursor: default;

    @media (max-width:450px){
        margin-right: 10px;
    }
`

const NotificationTitle=styled.h5`
    margin: 0px;
    display: inline-block;
    font-weight: normal;
    cursor: default;
`

const NotificationButton=styled.button`
    border: 0;
    padding: 5px 10px;
    display: block;
    background-color: #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
`

const NotificationContentContainer=styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid #979797;
`

const NotificationContent=styled.h5`
    margin: 0px;
    font-weight: normal;
`

export default CsCenterContent;