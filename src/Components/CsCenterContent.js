import styled from "styled-components"
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import LoadingIcon from '../Images/loading-icon.svg';

const CsCenterContent=({type})=>{
    const loadType=type==="공지"?"notices":"events";

    const [contentData, setContentData]=useState([]);
    const [page, setPage]=useState(0);
    const [ref, inView]=useInView();

    const contentDataFetch=()=>{
        axios
        .get(`https://api.lim-it.one/api/v1/${loadType}?page=${page}&size=10&sort=asc`)
        .then((response)=>{
            setContentData([...contentData, ...(response.data.content)])
            setPage((page)=>page+1)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if(inView){
            contentDataFetch();
        }
    },[inView]);

    const [showContentId, setShowContentId]=useState([]);
    const [showContentDetail, setShowContentDetail]=useState({});

    const handleShowContentId=(id)=>{
        if(showContentId.includes(id)){
            setShowContentId(showContentId.filter(item=>item!==id));
        } else{
            if (!showContentDetail[id]) {
                fetchContentDetail(id);
            }
            setShowContentId([...showContentId, id]);
        }
    }

    const fetchContentDetail = (id) => {
        axios
            .get(`https://api.lim-it.one/api/v1/${loadType}/${id}`)
            .then((response) => {
                setShowContentDetail((prevDetail) => ({
                    ...prevDetail,
                    [id]: response.data.content,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return(
        <ContentContainer>
            {contentData&&contentData.map(item=>
                <div key={item.id}>
                    <ContentElement>
                        <div>
                            <ContentTag>{type}</ContentTag>
                            <ContentTitle>{item.title}</ContentTitle>
                        </div>
                        <ContentButton onClick={(e)=>handleShowContentId(item.id)}>{showContentId.includes(item.id)?"닫기":"보기"}</ContentButton>
                    </ContentElement>
                    {showContentId.includes(item.id)&&<ContentDetailContainer>
                        <ContentDetail>{showContentDetail[item.id]}</ContentDetail>
                    </ContentDetailContainer>}
                </div>
            )}
            <Loading src={LoadingIcon} ref={ref}></Loading>
        </ContentContainer>
    )
}

const ContentContainer=styled.div`
    height: 425px;
    overflow-y: scroll;
`

const ContentElement=styled.div`
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

const ContentTag=styled.h5`
    margin: 0px;
    display: inline-block;
    color: #979797;
    margin-right: 20px;
    cursor: default;

    @media (max-width:450px){
        margin-right: 10px;
    }
`

const ContentTitle=styled.h5`
    margin: 0px;
    display: inline-block;
    font-weight: normal;
    cursor: default;
`

const ContentButton=styled.button`
    border: 0;
    padding: 5px 10px;
    display: block;
    background-color: #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
`

const ContentDetailContainer=styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid #979797;
`

const ContentDetail=styled.h5`
    margin: 0px;
    font-weight: normal;
`

const Loading=styled.img`
    display: block;
    margin: auto;
    animation: rotate_image 2s linear infinite;transform-origin: 50% 50%;
    @keyframes rotate_image{
        100% {
            transform: rotate(360deg);
        }
    }
`

export default CsCenterContent;