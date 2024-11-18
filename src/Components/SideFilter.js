import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MinusIcon from '../Images/icon-minus.svg';
import PlusIcon from '../Images/icon-plus.svg';
import Modal from './Modal'; 

const SideFilter = ({ selectedCategory, categories = [], allCategories = [], setProducts, onCategoryChange, onGenderChange }) => {

    const handleCheckboxChange = (categoryId, e) => {
        onCategoryChange(categoryId, e.target.checked); 
    };

    const handleGenderChange = (gender, e) => {
        onGenderChange(gender, e.target.checked);
    };
    
    // 필터 상태 정의
    const [filters, setFilters] = useState({
        delivery: false,
        directTrade: false,
        male: false,
        female: false,
        isCategoryOpen: true,
        isGenderOpen: true,
    });

    // 카테고리 및 리셋 관련 상태
    const [openCategories, setOpenCategories] = useState({});
    const [showResetButton, setShowResetButton] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
    const [selectAllState, setSelectAllState] = useState({});

    const [openMajors, setOpenMajors] = useState({});

    const toggleMajor = (majorId) => {
        setOpenMajors((prev) => ({
            ...prev,
            [majorId]: !prev[majorId], // MAJOR 카테고리 토글 (열림/닫힘)
        }));
    };
    

    // 상품 데이터를 필터링하여 가져오는 함수
    const fetchProductData = async (categoryFilter = [], genderFilter = []) => {
        const categoryParam = categoryFilter.map(cat => `categoryId=${cat}`).join('&');
        const genderParam = genderFilter.map(gender => `gender=${gender}`).join('&');
        const url = `https://api.lim-it.one/api/v1/products?${categoryParam}&${genderParam}`;

        try {
            const response = await axios.get(url);
            setProducts(response.data.content);  // 상품 데이터를 갱신
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // 반응형 처리를 위한 미디어 쿼리 적용
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

    // 필터 변경 시 리셋 버튼 표시 여부 처리
    useEffect(() => {
        const hasActiveFilter = Object.values(filters).some(value => value === true);
        setShowResetButton(hasActiveFilter);
    }, [filters]);

    // 부모 카테고리 필터 토글
    const toggleParentFilter = (categoryId) => {
        setFilters(prevState => {
            const newFilters = { ...prevState, [categoryId]: !prevState[categoryId] };
            const selectedCategories = Object.keys(newFilters).filter(key => newFilters[key]);

            fetchProductData(selectedCategories, filters.male ? 'male' : filters.female ? 'female' : '');

            return newFilters;
        });
    };

    // 자식 카테고리 필터 토글
    const toggleChildFilter = (item, parentCategory) => {
        setFilters(prevState => {
            const newFilters = { ...prevState, [item]: !prevState[item] };

            const selectedCategories = Object.keys(newFilters).filter(key => newFilters[key]);

            fetchProductData(selectedCategories, filters.male ? 'male' : filters.female ? 'female' : '');

            return newFilters;
        });
    };

    // 카테고리 섹션 열고 닫기
    const toggleCategoryOpen = (category) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    // 모든 자식 필터 선택/해제
    const selectAllChildFilters = (category) => {
        setFilters(prevState => {
            const newFilters = { ...prevState };
            if (allCategories && allCategories[category]) {
                const isSelectAll = !selectAllState[category];
                allCategories[category].forEach(item => {
                    newFilters[item] = isSelectAll;
                });
                setSelectAllState(prevState => ({ ...prevState, [category]: isSelectAll }));
            }
            return newFilters;
        });
    };

    // 필터 초기화
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
                setSelectAllState(prevState => ({ ...prevState, [category]: false }));
            });
        }
        setFilters(resetCategories);
    };

    // 카테고리 필터 렌더링
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

    // 선택된 카테고리 가져오기
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

    // 선택된 성별 필터 가져오기
    const getSelectedGenders = () => {
        const selectedGenders = [];
        if (filters.male) selectedGenders.push('남성');
        if (filters.female) selectedGenders.push('여성');
        return selectedGenders.join(', ');
    };

    // 카테고리 버튼 렌더링
    const renderCategoryButtons = () => {
        if (allCategories) {
            return Object.keys(allCategories).map(category => (
                <div key={category}>
                    <ButtonGroup>
                        <CategoryHeader>
                            <h1>{category}</h1>
                            <SelectAllButton onClick={() => selectAllChildFilters(category)}>
                                {selectAllState[category] ? '모두 해제' : '모두 선택'}
                            </SelectAllButton>
                        </CategoryHeader>
                        {(Array.isArray(allCategories[category]) ? allCategories[category] : []).map((item, index) => (
                            <Button
                                key={index}
                                selected={filters[item]}
                                onClick={() => toggleChildFilter(item, category)}
                            >
                                {item}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            ));
        }
        return null;
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
                                    <ToggleIcon
                                        onClick={() => setFilters(prevState => ({ ...prevState, isCategoryOpen: !prevState.isCategoryOpen }))}
                                        src={filters.isCategoryOpen ? MinusIcon : PlusIcon}
                                        alt="카테고리 펼치기/접기 아이콘"
                                        className="category-toggle-icon"
                                    />
                                    <ToggleButton onClick={() => setIsCategoryModalOpen(true)} className="mobile-category-button">
                                        카테고리
                                    </ToggleButton>
                                </div>
                                {filters.isCategoryOpen && (
                                    <FilterList>
                                    {categories.map((categoryName, index) => (
                                        <FilterItem key={index}>
                                            <input 
                                                type="checkbox" 
                                                id={`category-${index}`} 
                                                onChange={(e) => handleCheckboxChange(allCategories[index], e)} // 카테고리 ID와 체크박스 연결
                                                defaultChecked={false} // 기본적으로 체크되지 않은 상태
                                            />
                                            <label htmlFor={`category-${index}`}>{categoryName}</label>
                                        </FilterItem>
                                    ))}
                                </FilterList>
                                )}
                                {!filters.isCategoryOpen && <SelectedFilters>{getSelectedCategories()}</SelectedFilters>}
                            </CateFilterBox>
                            <GenderFilterBox>
                                <Line />
                                <div className='gender_filter_text'>
                                    <h1>성별</h1>
                                    <ToggleIcon
                                        onClick={() => setFilters(prevState => ({ ...prevState, isGenderOpen: !prevState.isGenderOpen }))}
                                        src={filters.isGenderOpen ? MinusIcon : PlusIcon}
                                        alt="성별 펼치기/접기 아이콘"
                                        className="gender-toggle-icon"
                                    />
                                    <ToggleButton onClick={() => setIsGenderModalOpen(true)} className="mobile-gender-button">
                                        성별
                                    </ToggleButton>
                                </div>
                                {filters.isGenderOpen && (
                                    <FilterList>
                                    {['남성', '여성', '공용'].map((gender, index) => (
                                        <FilterItem key={index}>
                                            <input 
                                                type="checkbox" 
                                                id={`gender-${index}`} 
                                                onChange={(e) => handleGenderChange(gender, e)} 
                                                defaultChecked={false} 
                                            />
                                            <label htmlFor={`gender-${index}`}>{gender}</label>
                                        </FilterItem>
                                    ))}
                                </FilterList>
                                )}
                                {!filters.isGenderOpen && <SelectedFilters>{getSelectedGenders()}</SelectedFilters>}
                            </GenderFilterBox>
                        </FiltersContainer>
                    </StatusFilter>
                    {showResetButton && <ResetButton onClick={resetFilters}>초기화</ResetButton>}
                </div>
            </Container>
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onReset={resetFilters}
                selectedFilters={getSelectedCategories()}
            >
                <div>
                    {renderCategoryButtons()}
                </div>
            </Modal>
            <Modal
                isOpen={isGenderModalOpen}
                onClose={() => setIsGenderModalOpen(false)}
                onReset={resetFilters}
                selectedFilters={getSelectedGenders()}
            >
                <div>
                    <ButtonGroup>
                        <Button
                            selected={filters.male}
                            onClick={() => toggleParentFilter('male')}
                        >
                            남성
                        </Button>
                        <Button
                            selected={filters.female}
                            onClick={() => toggleParentFilter('female')}
                        >
                            여성
                        </Button>
                    </ButtonGroup>
                </div>
            </Modal>
        </TotalContainer>
    );
};

// 스타일 컴포넌트 정의
const FilterList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 140px;
    max-width: 140px;

    @media (max-width: 600px) {
        flex: 1;
        width: 140px;
        margin-left: 10px;
    }
`;

const FilterItem = styled.li`
    display: flex;
    align-items: center;
    margin-top: 5px;

    input {
        margin-right: 5px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 13px; 
        height: 13px;
        margin-right: 10px;
        position: relative;
        top: 1.5px;
    }

    input[type="checkbox"]::before {
        content: "";
        display: inline-block;
        width: 13px; 
        height: 13px;
        background-color: transparent; 
        border: 1px solid #d9d9d9; 
    }

    input[type="checkbox"]:checked::before {
        background-color: transparent; 
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cline x1='0.353553' y1='2.64645' x2='3.35355' y2='5.64645' stroke='black'/%3E%3Cline x1='2.64645' y1='5.64645' x2='7.64645' y2='0.646447' stroke='black'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50%;
    }

    label {
        font-size: 13px;
        display: inline-block;
        width: 100%;
    }

    @media (max-width: 600px) {
        display: none;
    }
`;

const TotalContainer = styled.div`

    @media (max-width: 600px) {
        background-color: white;  
        width: 100%;
        margin-top: -50px; 
        border-bottom: 1px solid #e0e0e0;
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
        cursor: pointer;

        @media (max-width: 600px) {
            display: none;
        }
    }
`;

const StatusFilter = styled.div`
    margin-bottom: 20px;
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

        @media (max-width: 720px) {
            width: 135px; 
        }

        .status_filter_btn_opt1 {
            color: black;
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #e0e0e0;
            transition: background-color 0.3s;
            cursor: pointer;
        }

        .status_filter_btn_opt2 {
            color: black;
            font-size: 12px;
            background-color: transparent;
            width: 70px;
            padding: 5px;
            border-radius: 20px;
            border: 1px solid #e0e0e0;
            margin-left: 5px;
            margin-right: 10px;
            transition: background-color 0.3s;
            cursor: pointer;
        }

        .status_filter_btn_opt1:active,
        .status_filter_btn_opt1.selected,
        .status_filter_btn_opt2:active,
        .status_filter_btn_opt2.selected {
            background-color: black;
            color: white;
            border: 1px solid black;
        }

        .status_filter_btn_opt2 {
            @media (max-width: 600px) {
                position: relative;
                margin-right: 15px; 
            }

            @media (max-width: 600px) {
                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -10px;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 25px;
                    background-color: #d9d9d9;
                }
            }
        }
    }
`;

const CateFilterBox = styled.div` 
    margin-top: 10px;
    width: 150px;
    max-width: 150px;
    overflow: hidden;

    @media (max-width: 600px) {
        flex: 1;
        width: 150px;
        margin-left: 5px;
    }

    .cate_filter_text {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 14px;
            font-weight: bold;

            @media (max-width: 600px) {
                font-weight: lighter;
                font-size: 13px;
                display: none;  
            }
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

    @media (max-width: 600px) {
        .cate_filter_checkbox {
            display: none;
        }

        .cate_filter_text {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4.5px;
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            background-color: transparent;
            font-weight: 100;
            width: 60px;
            height: 16px;
            margin-top: -5px;
            
        }

        .mobile-category-button {
            display: block;
        }

        .category-toggle-icon {
            display: none;
        }
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
    margin: 15px 0;

    @media (max-width: 600px) {
        display: none;
    }
`;

const SelectedFilters = styled.div`
    font-size: 13px;
    color: #666;
    margin-top: 5px;

    @media (max-width: 600px) {
        display: none;
    }
`;

const GenderFilterBox = styled.div` 
    margin-top: 10px;
    width: 150px;
    max-width: 150px;
    overflow: hidden;

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

            @media (max-width: 600px) {
                font-weight: lighter;
                font-size: 13px;
                 display: none;  
            }
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

    @media (max-width: 600px) {
        .gender_filter_checkbox {
            display: none;
        }

        .gender_filter_text {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4.5px;
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            background-color: transparent;
            font-weight: 100;
            width: 40px;
            height: 16px;
            margin-top: -5px;
            margin-left: -77px;
        }

        .mobile-gender-button {
            display: block;
        }

        .gender-toggle-icon {
            display: none;
        }

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

    @media (max-width: 600px) {
        display: none;
    }
`;

const ToggleIcon = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;

    @media (max-width: 600px) {
        display: none;
        
    }
`;

const ToggleButton = styled.button`
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: black;

    @media (max-width: 600px) {
        display: block;
        font-size: 12px;
        font-weight: 400;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

const Button = styled.button`
    padding: 8px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    background-color: ${({ selected }) => (selected ? 'black' : 'transparent')};
    color: ${({ selected }) => (selected ? 'white' : 'black')};
    cursor: pointer;
    font-size: 14px;
`;

const CategoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    font-size: 7px;
`;

const SelectAllButton = styled.button`
    height: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #e0e0e0;
    color: black;
    cursor: pointer;
    font-size: 12px;
    margin-top: 10px;
`;

export default SideFilter;
