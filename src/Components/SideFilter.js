import React, { useState } from 'react';
import styled from 'styled-components';

const SideFilter = () => {
    const [isDeliverySelected, setIsDeliverySelected] = useState(false);
    const [isDirectTradeSelected, setIsDirectTradeSelected] = useState(false);

    const toggleDelivery = () => {
        setIsDeliverySelected(prevState => !prevState);
    };

    const toggleDirectTrade = () => {
        setIsDirectTradeSelected(prevState => !prevState);
    };

    return (
        <Container>
            <div className='filter_container'>
                <TopFilterArray>
                    <select name='array_type' id='aType'>
                        <option value="popular">인기순</option>
                        <option value="lately">최신순</option>
                    </select>
                </TopFilterArray>
                <StatusFilter>
                    <StatusFilterBox>
                        <div className='status_filter_text'>
                            <h1>필터</h1>
                        </div>
                        <div className='status_filter_btn'>
                            <button className={`status_filter_btn_opt1 ${isDeliverySelected ? 'selected' : ''}`} onClick={toggleDelivery}>택배</button>
                            <button className={`status_filter_btn_opt2 ${isDirectTradeSelected ? 'selected' : ''}`} onClick={toggleDirectTrade}>직거래</button>
                        </div>
                    </StatusFilterBox>
                    <CateFilterBox>
                        <div className='cate_filter_text'>
                            <h1>카테고리</h1>
                        </div>
                        <div className='cate_filter_checkbox'>
                            <label><input type='checkbox' name='checkbox_outer'></input>아우터</label>
                            <label><input type='checkbox' name='checkbox_top'></input>상의</label>
                            <label><input type='checkbox' name='checkbox_bottom'></input>하의</label>
                            <label><input type='checkbox' name='checkbox_shoes'></input>신발</label>
                            <label><input type='checkbox' name='checkbox_bag'></input>가방</label>
                            <label><input type='checkbox' name='checkbox_goods'></input>패션잡화</label>
                        </div>
                    </CateFilterBox>
                    <GenderFilterBox>
                        <div className='gender_filter_text'>
                            <h1>성별</h1>
                        </div>
                        <div className='gender_filter_checkbox'>
                            <label><input type='checkbox' name='checkbox_male'></input>남성</label>
                            <label><input type='checkbox' name='checkbox_female'></input>여성</label>
                        </div>
                    </GenderFilterBox>
                </StatusFilter>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;
    margin-left: 75px; 
    @media (min-width: 768px) {
        margin-left: 150px; 
    }
`;

const TopFilterArray = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;

    select {
        width: 180px;
        height: 30px;
        border-radius: 15px;
        border: none;
        background-color: #d9d9d9;
        font-size: 15px;
        font-weight: bolder;
        text-align: center;
    }
`;

const StatusFilter = styled.div`
    margin-bottom: 15px;
`;

const StatusFilterBox = styled.div`
    margin-top: 30px;

    .status_filter_text h1 {
        font-size: 19px;
    }

    .status_filter_btn {
        display: flex;
        margin-bottom: 30px;

        .status_filter_btn_opt1 {
            font-size: 15px;
            background-color: white;
            width: 85px;
            padding: 5px;
            border-radius: 15px;
            border: solid #d9d9d9;
        }

        .status_filter_btn_opt2 {
            font-size: 15px;
            background-color: white;
            width: 85px;
            padding: 5px;
            border-radius: 15px;
            border: solid #d9d9d9;
            margin-left: 10px;
        }
    }
`;

const CateFilterBox = styled.div`
    margin-top: 40px;

    .cate_filter_text h1 {
        font-size: 19px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .cate_filter_checkbox label {
        display: inline-block;
        width: 100px;
        margin-top: 10px;
    }

    .cate_filter_checkbox input {
        margin-right: 15px;
        accent-color: black;
    }
`;

const GenderFilterBox = styled.div`
    margin-top: 40px;

    .gender_filter_text h1 {
        font-size: 19px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .gender_filter_checkbox label {
        display: inline-block;
        width: 100px;
        margin-top: 10px;
    }

    .gender_filter_checkbox input {
        margin-right: 15px;
        accent-color: black;
    }
`;

export default SideFilter;
