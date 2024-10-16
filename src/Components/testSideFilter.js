import React from 'react';
import styled from 'styled-components';

const SideFilter = ({ categories = [], allCategories = [], onCategoryChange, onGenderChange, selectedCategories, selectedGenders }) => {

    const handleCheckboxChange = (categoryId, e) => {
        onCategoryChange(categoryId, e.target.checked);
    };

    const handleGenderChange = (gender, e) => {
        onGenderChange(gender, e.target.checked);
    };

    return (
        <FilterContainer>
            <h3>카테고리</h3>
            <FilterList>
                {categories.map((categoryName, index) => (
                    <FilterItem key={index}>
                        <input 
                            type="checkbox" 
                            id={`category-${index}`} 
                            onChange={(e) => handleCheckboxChange(allCategories[index], e)}
                            checked={selectedCategories.includes(allCategories[index])} 
                        />
                        <label htmlFor={`category-${index}`}>{categoryName}</label>
                    </FilterItem>
                ))}
            </FilterList>
            <h3>성별</h3>
            <FilterList>
                {['남성', '여성', '공용'].map((gender, index) => (
                    <FilterItem key={index}>
                        <input 
                            type="checkbox" 
                            id={`gender-${index}`} 
                            onChange={(e) => handleGenderChange(gender, e)}
                            checked={selectedGenders.includes(gender)} 
                        />
                        <label htmlFor={`gender-${index}`}>{gender}</label>
                    </FilterItem>
                ))}
            </FilterList>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FilterList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FilterItem = styled.li`
    display: flex;
    align-items: center;

    input {
        margin-right: 8px;
    }
`;

export default SideFilter;
