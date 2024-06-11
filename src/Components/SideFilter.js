import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MinusIcon from '../Images/icon-minus.svg';
import PlusIcon from '../Images/icon-plus.svg';

const SideFilter = ({ selectedCategory, categories, allCategories }) => {
    const [filters, setFilters] = useState({
        delivery: false,
        directTrade: false,
        male: false,
        female: false,
        isCategoryOpen: true,
        isGenderOpen: true,
    });
    const [openCategories, setOpenCategories] = useState({});
    const [showResetButton, setShowResetButton] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        const handleViewportChange = (e) => {
            if (e.matches) {
                setFilters((prevState) => ({
                    ...prevState,
                    isCategoryOpen: false,
                    isGenderOpen: false,
                }));
            } else {
                setFilters((prevState) => ({
                    ...prevState,
                    isCategoryOpen: true,
                    isGenderOpen: true,
                }));
            }
        };

        mediaQuery.addListener(handleViewportChange);

        handleViewportChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleViewportChange);
        };
    }, []);

    useEffect(() => {
        let initialSelectedCategories = {};
        let initialOpenCategories = {};
        if (categories) {
            categories.forEach(item => {
                initialSelectedCategories[item] = false;
            });
        } else if (allCategories) {
            Object.keys(allCategories).forEach(category => {
                allCategories[category].forEach(item => {
                    initialSelectedCategories[item] = false;
                });
                initialOpenCategories[category] = false; // 초기 상태는 닫힌 상태로 설정
            });
        }
        setFilters(prevState => ({ ...prevState, ...initialSelectedCategories }));
        setOpenCategories(initialOpenCategories);
    }, [categories, allCategories]);

    useEffect(() => {
        const hasActiveFilter = Object.values(filters).some(value => value === true);
        setShowResetButton(hasActiveFilter);
    }, [filters]);

    const toggleParentFilter = (category) => {
        setFilters(prevState => {
            const newFilters = { ...prevState, [category]: !prevState[category] };
            if (newFilters[category]) {
                // 부모 체크박스가 체크되면 자식 체크박스 해제
                if (allCategories && allCategories[category]) {
                    allCategories[category].forEach(item => {
                        newFilters[item] = false;
                    });
                }
            }
            return newFilters;
        });
    };

    const toggleChildFilter = (item, parentCategory) => {
        setFilters(prevState => {
            const newFilters = { ...prevState, [item]: !prevState[item] };
            if (newFilters[item]) {
                // 자식 체크박스가 체크되면 부모 체크박스 해제
                newFilters[parentCategory] = false;
            }
            return newFilters;
        });
    };

    const toggleCategoryOpen = (category) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const resetFilters = () => {
        let resetCategories = {
            delivery: false,
            directTrade: false,
            male: false,
            female: false,
            isCategoryOpen: filters.isCategoryOpen,
            isGenderOpen: filters.isGenderOpen,
        };
        if (categories) {
            categories.forEach(item => {
                resetCategories[item] = false;
            });
        } else if (allCategories) {
            Object.keys(allCategories).forEach(category => {
                allCategories[category].forEach(item => {
                    resetCategories[item] = false;
                });
            });
        }
        setFilters(resetCategories);
    };

    const renderCategoryFilters = () => {
        const categoryLabels = {
            outer: '아우터',
            top: '상의',
            bottom: '하의',
            shoes: '신발',
            bag: '가방',
            goods: '패션잡화'
        };

        if (categories && categories.length > 0) {
            return categories.map((item, index) => (
                <label key={index}>
                    <input
                        type='checkbox'
                        name={`checkbox_${item}`}
                        checked={filters[item] || false}
                        onChange={() => toggleParentFilter(item)}
                    ></input>
                    {item}
                </label>
            ));
        } else if (allCategories) {
            return Object.keys(allCategories).map(category => (
                <div key={category}>
                    <div className='cate_filter_text' onClick={() => toggleCategoryOpen(category)}>
                        <label>
                            <input
                                type='checkbox'
                                name={`checkbox_${category}`}
                                checked={filters[category] || false}
                                onChange={() => toggleParentFilter(category)}
                            ></input>
                            {categoryLabels[category] || category}
                        </label>
                    </div>
                    {openCategories[category] && (
                        <div style={{ marginLeft: '20px' }}>
                            {allCategories[category].map((item, index) => (
                                <label key={index}>
                                    <input
                                        type='checkbox'
                                        name={`checkbox_${item}`}
                                        checked={filters[item] || false}
                                        onChange={() => toggleChildFilter(item, category)}
                                    ></input>
                                    {item}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ));
        }
        return null;
    };

    const getSelectedCategories = () => {
        let selected = [];
        if (categories) {
            selected = categories.filter(item => filters[item]);
        } else if (allCategories) {
            Object.keys(allCategories).forEach(category => {
                if (filters[category]) {
                    selected.push(category);
                }
                allCategories[category].forEach(item => {
                    if (filters[item]) {
                        selected.push(item);
                    }
                });
            });
        }
        return selected.join(', ');
    };

    const getSelectedGenders = () => {
        const selectedGenders = [];
        if (filters.male) selectedGenders.push('남성');
        if (filters.female) selectedGenders.push('여성');
        return selectedGenders.join(', ');
    };

    return (
        <TotalContainer>
            <Container>
                <div className='filter_container'>
                    <TopFilterArray>
                        <select name='array_type' id='aType'>
                            <option value="popular">인기순</option>
                            <option value="lately">최신순</option>
                        </select>
                    </TopFilterArray>
                    <StatusFilter>
                        <FiltersContainer>
                            <StatusFilterBox>
                                <div className='status_filter_text'>
                                    <h1>필터</h1>
                                </div>
                                <div className='status_filter_btn'>
                                    <button className={`status_filter_btn_opt1 ${filters.delivery ? 'selected' : ''}`} onClick={() => toggleParentFilter('delivery')}>택배</button>
                                    <button className={`status_filter_btn_opt2 ${filters.directTrade ? 'selected' : ''}`} onClick={() => toggleParentFilter('directTrade')}>직거래</button>
                                </div>
                            </StatusFilterBox>
                            <CateFilterBox>
                                <Line />
                                <div className='cate_filter_text'>
                                    <h1>카테고리</h1>
                                    <ToggleIcon onClick={() => setFilters(prevState => ({ ...prevState, isCategoryOpen: !prevState.isCategoryOpen }))} src={filters.isCategoryOpen ? MinusIcon : PlusIcon} alt="카테고리 펼치기/접기 아이콘" />
                                </div>
                                {filters.isCategoryOpen ? (
                                    <div className='cate_filter_checkbox'>
                                        {renderCategoryFilters()}
                                    </div>
                                ) : (
                                    <SelectedFilters>{getSelectedCategories()}</SelectedFilters>
                                )}
                            </CateFilterBox>
                            <GenderFilterBox>
                                <Line />
                                <div className='gender_filter_text'>
                                    <h1>성별</h1>
                                    <ToggleIcon onClick={() => setFilters(prevState => ({ ...prevState, isGenderOpen: !prevState.isGenderOpen }))} src={filters.isGenderOpen ? MinusIcon : PlusIcon} alt="성별 펼치기/접기 아이콘" />
                                </div>
                                {filters.isGenderOpen ? (
                                    <div className='gender_filter_checkbox'>
                                        <label>
                                            <input
                                                type='checkbox'
                                                name='checkbox_male'
                                                checked={filters.male || false}
                                                onChange={() => toggleParentFilter('male')}
                                            ></input>
                                            남성
                                        </label>
                                        <label>
                                            <input
                                                type='checkbox'
                                                name='checkbox_female'
                                                checked={filters.female || false}
                                                onChange={() => toggleParentFilter('female')}
                                            ></input>
                                            여성
                                        </label>
                                    </div>
                                ) : (
                                    <SelectedFilters>{getSelectedGenders()}</SelectedFilters>
                                )}
                            </GenderFilterBox>
                        </FiltersContainer>
                    </StatusFilter>
                    {showResetButton && <ResetButton onClick={resetFilters}>초기화</ResetButton>}
                </div>
            </Container>
        </TotalContainer>
    );
};

const TotalContainer = styled.div`
    @media (max-width: 600px) {
        background-color: white;  
        width: 100%;
        margin-top: -55px; 
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    transition: width 0.3s ease-in-out;

    @media (max-width: 600px) {
        width: 90%; 
        margin: 0 auto;  
        align-items: center;  
    }
`;

const TopFilterArray = styled.div`
    display: flex;
    width: 100%;  
    order: 2;  
    justify-content: flex-start;

    select {
        color: black;
        width: auto;
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

    @media (max-width: 600px) {
        display: none;
    }
`;

const StatusFilter = styled.div`
    margin-bottom: 20px;

    @media (max-width: 600px) {
        flex: 1;
    }
`;

const StatusFilterBox = styled.div` 
    margin-top: 5px;

    .status_filter_text h1 {
        font-size: 14px;
        flex: 1;

        @media (max-width: 600px) {
            display: none;
        }
    }

    .status_filter_btn img {
        display: none;

        @media (max-width: 600px){
            display: block;
        }
    }

    .status_filter_btn {
        display: flex;

        @media (max-width: 600px) {
            width: 135px; 
        }

        .status_filter_btn_opt1 {
            color: black;
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #d9d9d9;
            transition: background-color 0.3s;
        }

        .status_filter_btn_opt2 {
            color: black;
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #d9d9d9;
            margin-left: 5px;
            margin-right: 10px;
            transition: background-color 0.3s;
        }

        .status_filter_btn_opt1:active,
        .status_filter_btn_opt1.selected,
        .status_filter_btn_opt2:active,
        .status_filter_btn_opt2.selected {
            background-color: #transparent;
            font-weight: bold;
            border: 1px solid black;
        }
    }
`;

const CateFilterBox = styled.div` 
    margin-top: 1px;
    width: 180px;

    @media (max-width: 600px) {
        flex: 1;
        width: 140px;
        margin-left: 10px;
    }

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
        background-color: #transparent; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cline x1='0.353553' y1='2.64645' x2='3.35355' y2='5.64645' stroke='black'/%3E%3Cline x1='2.64645' y1='5.64645' x2='7.64645' y2='0.646447' stroke='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50%;
    }
`;

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;  
    justify-content: space-between; 
    flex-wrap: wrap;  
    width: 100%; 
    margin-bottom: -15px;  
`;

const Line = styled.hr`
    border: 0;
    border-top: 1px solid #e0e0e0;
    margin: 10px 0;
`;

const SelectedFilters = styled.div`
    font-size: 13px;
    color: #666;
    margin-top: 5px;
`;

const GenderFilterBox = styled.div` 
    margin-top: 1px;
    width: 180px;

    @media (max-width: 600px) {
        flex: 1;
        width: 140px;
        margin-left: 10px;
    }

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
        background-color: #transparent; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cline x1='0.353553' y1='2.64645' x2='3.35355' y2='5.64645' stroke='black'/%3E%3Cline x1='2.64645' y1='5.64645' x2='7.64645' y2='0.646447' stroke='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50%;
    }
`;

const ResetButton = styled.button` 
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

const ToggleIcon = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;
`;

export default SideFilter;
