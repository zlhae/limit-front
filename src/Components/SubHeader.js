import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SubHeader = () => {
    return (
        <Tabs>
            <LiTabs>
                <TabName><TabLink to="/totalcate">전체</TabLink></TabName>
                <TabName><TabLink to="/outercate">아우터</TabLink></TabName>
                <TabName><TabLink to="/topcate">상의</TabLink></TabName>
                <TabName><TabLink to="/bottomcate">하의</TabLink></TabName>
                <TabName><TabLink to="/shoescate">신발</TabLink></TabName>
                <TabName><TabLink to="/bagcate">가방</TabLink></TabName>
                <TabName><TabLink to="/goodscate">패션잡화</TabLink></TabName>
            </LiTabs>
        </Tabs>
    );
}

const Tabs = styled.div`
    background-color: white;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 70px;
    border-bottom: 1px solid #e0e0e0;
`;

const LiTabs = styled.ul`
    display: flex;
    height: 30px;
    padding: 0px 10%;

    @media (max-width: 600px) {
        padding: 0px 5%;
    }
`;

const TabName = styled.li`
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    color: black;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const TabLink = styled(NavLink).attrs({
    activeClassName: 'active'
})`
    text-decoration: none;
    color: black;
    position: relative;
    padding-bottom: 9px;

    &.active {
        
    }

    &.active::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -3px;  /* 부모 요소의 border-bottom과 겹치게 설정 */
        width: 100%;
        height: 2px;
        background-color: black;
    }
`;

export default SubHeader;
