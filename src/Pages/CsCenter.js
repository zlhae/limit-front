import styled from 'styled-components';
import { useState } from 'react';
import CsCenterSideBar from '../Components/CsCenterSideBar';
import Notification from '../Components/Notification';

const CsCenter=()=>{
    return(
        <CsCenterContainer>
            <CsCenterSideBar></CsCenterSideBar>
            <Notification></Notification>
        </CsCenterContainer>
    )
}

const CsCenterContainer=styled.div`
    margin: 0px 10%;
    margin-top: 70px;
    display: flex;
`

export default CsCenter;