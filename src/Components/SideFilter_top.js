import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MinusIcon from '../Images/icon-minus.svg';
import PlusIcon from '../Images/icon-plus.svg';

const SideFilterTop = () => {
    const [isDeliverySelected, setIsDeliverySelected] = useState(false);
    const [isDirectTradeSelected, setIsDirectTradeSelected] = useState(false);
    const [isShortTshirtSelected, setIsShortTshirtSelected] = useState(false);
    const [isLongTshirtSelected, setIsLongTshirtSelected] = useState(false);
    const [isCardiganSelected, setIsCardiganSelected] = useState(false);
    const [isShirtSelected, setIsShirtSelected] = useState(false);
    const [isHoodieSelected, setIsHoodieSelected] = useState(false);
    const [isHoodedZipupSelected, setIsHoodedZipupSelected] = useState(false);
    const [isSweatShirtSelected, setIsSweatShirtSelected] = useState(false);
    const [isSleevelessSelected, setIsSleevelessSelected] = useState(false);
    const [isOnepieceSelected, setIsOnepieceSelected] = useState(false);
    const [isKnitSelected, setIsKnitSelected] = useState(false);
    const [isTopsSelected, setIsTopsSelected] = useState(false);
    const [isMaleSelected, setIsMaleSelected] = useState(false);
    const [isFemaleSelected, setIsFemaleSelected] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isGenderOpen, setIsGenderOpen] = useState(true);

    useEffect(() => {
        setShowResetButton(
            isDeliverySelected ||
            isDirectTradeSelected ||
            isShortTshirtSelected ||
            isLongTshirtSelected ||
            isCardiganSelected ||
            isShirtSelected ||
            isHoodieSelected ||
            isHoodedZipupSelected ||
            isSweatShirtSelected ||
            isSleevelessSelected ||
            isOnepieceSelected ||
            isKnitSelected ||
            isTopsSelected ||
            isMaleSelected ||
            isFemaleSelected
        );
    }, [
        isDeliverySelected,
        isDirectTradeSelected,
        isShortTshirtSelected,
        isLongTshirtSelected,
        isCardiganSelected,
        isShirtSelected,
        isHoodieSelected,
        isHoodedZipupSelected,
        isSweatShirtSelected,
        isSleevelessSelected,
        isOnepieceSelected,
        isKnitSelected,
        isTopsSelected,
        isMaleSelected,
        isFemaleSelected
    ]);

    const toggleDelivery = () => {
        setIsDeliverySelected(prevState => !prevState);  
    };

    const toggleDirectTrade = () => {
        setIsDirectTradeSelected(prevState => !prevState); 
    };

    const toggleShortTshirt = () => {
        setIsShortTshirtSelected(prevState => !prevState);
    };

    const toggleLongTshirt = () => {
        setIsLongTshirtSelected(prevState => !prevState);
    };

    const toggleCardigan = () => {
        setIsCardiganSelected(prevState => !prevState);
    };

    const toggleShirt = () => {
        setIsShirtSelected(prevState => !prevState);
    };

    const toggleHoodie = () => {
        setIsHoodieSelected(prevState => !prevState);
    };

    const toggleHoodedZipup = () => {
        setIsHoodedZipupSelected(prevState => !prevState);
    };

    const toggleSweatShirt = () => {
        setIsSweatShirtSelected(prevState => !prevState);
    };

    const toggleSleeveless = () => {
        setIsSleevelessSelected(prevState => !prevState);
    };

    const toggleOnepiece = () => {
        setIsOnepieceSelected(prevState => !prevState);
    };

    const toggleKnit = () => {
        setIsKnitSelected(prevState => !prevState);
    };

    const toggleTops = () => {
        setIsTopsSelected(prevState => !prevState);
    };

    const toggleMale = () => {
        setIsMaleSelected(prevState => !prevState);
    };

    const toggleFemale = () => {
        setIsFemaleSelected(prevState => !prevState);
    };

    const resetFilters = () => {
        setIsDeliverySelected(false);
        setIsDirectTradeSelected(false);
        setIsShortTshirtSelected(false);
        setIsLongTshirtSelected(false);
        setIsCardiganSelected(false);
        setIsShirtSelected(false);
        setIsHoodieSelected(false);
        setIsHoodedZipupSelected(false);
        setIsSweatShirtSelected(false);
        setIsSleevelessSelected(false);
        setIsOnepieceSelected(false);
        setIsKnitSelected(false);
        setIsTopsSelected(false);
        setIsMaleSelected(false);
        setIsFemaleSelected(false);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(prevState => !prevState);
    };

    const toggleGender = () => {
        setIsGenderOpen(prevState => !prevState);
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
                            <ToggleIcon onClick={toggleCategory} src={isCategoryOpen ? MinusIcon : PlusIcon} alt="카테고리 펼치기/접기 아이콘" />
                        </div>
                        {isCategoryOpen && (
                            <div className='cate_filter_checkbox'>
                                <label><input type='checkbox' name='checkbox_short_tshirt' checked={isShortTshirtSelected} onChange={toggleShortTshirt}></input>반팔 티셔츠</label>
                                <label><input type='checkbox' name='checkbox_long_tshirt' checked={isLongTshirtSelected} onChange={toggleLongTshirt}></input>긴팔 티셔츠</label>
                                <label><input type='checkbox' name='checkbox_cardigan' checked={isCardiganSelected} onChange={toggleCardigan}></input>가디건</label>
                                <label><input type='checkbox' name='checkbox_shirt' checked={isShirtSelected} onChange={toggleShirt}></input>셔츠</label>
                                <label><input type='checkbox' name='checkbox_hoodie' checked={isHoodieSelected} onChange={toggleHoodie}></input>후드</label>
                                <label><input type='checkbox' name='checkbox_hooded_zipup' checked={isHoodedZipupSelected} onChange={toggleHoodedZipup}></input>후드 집업</label>
                                <label><input type='checkbox' name='checkbox_sweatshirt' checked={isSweatShirtSelected} onChange={toggleSweatShirt}></input>스웨트셔츠</label>
                                <label><input type='checkbox' name='checkbox_sleeveless' checked={isSleevelessSelected} onChange={toggleSleeveless}></input>슬리브리스</label>
                                <label><input type='checkbox' name='checkbox_onepiece' checked={isOnepieceSelected} onChange={toggleOnepiece}></input>원피스</label>
                                <label><input type='checkbox' name='checkbox_knit' checked={isKnitSelected} onChange={toggleKnit}></input>니트</label>
                                <label><input type='checkbox' name='checkbox_tops' checked={isTopsSelected} onChange={toggleTops}></input>기타 상의</label>
                            </div>
                        )}
                    </CateFilterBox>
                    <GenderFilterBox>
                        <div className='gender_filter_text'>
                            <h1>성별</h1>
                            <ToggleIcon onClick={toggleGender} src={isGenderOpen ? MinusIcon : PlusIcon} alt="성별 펼치기/접기 아이콘" />
                        </div>
                        {isGenderOpen && (
                            <div className='gender_filter_checkbox'>
                                <label><input type='checkbox' name='checkbox_male' checked={isMaleSelected} onChange={toggleMale}></input>남성</label>
                                <label><input type='checkbox' name='checkbox_female' checked={isFemaleSelected} onChange={toggleFemale}></input>여성</label>
                            </div>
                        )}
                    </GenderFilterBox>
                </StatusFilter>
                {showResetButton && <ResetButton onClick={resetFilters}>초기화</ResetButton>}
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 140px; 
    
`;

const TopFilterArray = styled.div` /* 인기순, 최신순 css */
    display: flex;
    margin-bottom: 15px;

    select {
        width: 72px;
        height: 30px;
        border: none;
        background-color: transparent;
        font-size: 14px;
        font-weight: bold;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding-right: 30px;
        background-repeat: no-repeat;
        background-position: right 10px center; 
        background-size: 17px; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-arrows-sort' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M3 9l4-4l4 4m-4 -4v14' /%3E%3Cpath d='M21 15l-4 4l-4-4m4 4v-14' /%3E%3C/svg%3E");
        outline: none;
    }
`;

const StatusFilter = styled.div`
margin-bottom: 15px;
`;

const StatusFilterBox = styled.div` /* 택배, 직거래 버튼 css */
    margin-top: 10px;

    .status_filter_text h1 {
        font-size: 14px;
    }

    .status_filter_btn {
        display: flex;

        .status_filter_btn_opt1 {
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #d9d9d9;
            transition: background-color 0.3s;
        }

        .status_filter_btn_opt2 {
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #d9d9d9;
            margin-left: 5px;
            transition: background-color 0.3s;
        }

        .status_filter_btn_opt1:active,
        .status_filter_btn_opt1.selected,
        .status_filter_btn_opt2:active,
        .status_filter_btn_opt2.selected {
            background-color: #d9d9d9;
            font-weight: bold;
        }
    }
`;

const CateFilterBox = styled.div` /* 카테고리 체크박스 css */
    margin-top: 10px;

    .cate_filter_text {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 14px;
            font-weight: bold;
        }
    }

    .cate_filter_checkbox label {
        display: inline-block;
        width: 100%;
        margin-top: 5px;
        font-size: 13px; 
    }

    .cate_filter_checkbox input {
        margin-right: 5px;
    }

    .cate_filter_checkbox input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 13px; 
        height: 13px;
        margin-right: 10px;
        position: relative;
        top: 1.5px;
    }

    .cate_filter_checkbox input[type="checkbox"]::before {
        content: "";
        display: inline-block;
        width: 13px; 
        height: 13px;
        background-color: transparent; 
        border: 1px solid #d9d9d9; 
    }

    .cate_filter_checkbox input[type="checkbox"]:checked::before {
        background-color: #d9d9d9; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cline x1='0.353553' y1='2.64645' x2='3.35355' y2='5.64645' stroke='black'/%3E%3Cline x1='2.64645' y1='5.64645' x2='7.64645' y2='0.646447' stroke='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50%;
    }
`;

const GenderFilterBox = styled.div` /* 성별 체크박스 css */
    margin-top: 10px;

    .gender_filter_text {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 14px;
            font-weight: bold;
        }
    }

    .gender_filter_checkbox label {
        display: inline-block;
        width: 100%;
        margin-top: 5px;
        font-size: 13px;
    }

    .gender_filter_checkbox input {
        margin-right: 5px;
    }

    .gender_filter_checkbox input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 13px; 
        height: 13px;
        margin-right: 10px;
        position: relative;
        top: 1.5px;
    }

    .gender_filter_checkbox input[type="checkbox"]::before {
        content: "";
        display: inline-block;
        width: 13px; 
        height: 13px;
        background-color: transparent; 
        border: 1px solid #d9d9d9; 
    }

    .gender_filter_checkbox input[type="checkbox"]:checked::before {
        background-color: #d9d9d9; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cline x1='0.353553' y1='2.64645' x2='3.35355' y2='5.64645' stroke='black'/%3E%3Cline x1='2.64645' y1='5.64645' x2='7.64645' y2='0.646447' stroke='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50%;
    }
`;

const ResetButton = styled.button` /* 초기화 버튼 css */
    display: flex;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 12px;
    margin-top: 10px;
    text-decoration: underline;
    line-height: 1.5;
    color: #979797;
    font-weight: bold;
    margin-left: auto;
`;

const ToggleIcon = styled.img` /* +,- 아이콘 css */
    width: 10px;
    height: 10px;
    cursor: pointer;
`;

export default SideFilterTop;