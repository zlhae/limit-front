import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SideFilter1 = ({ categories, allCategories, fetchProducts }) => {
    const [filters, setFilters] = useState({
        male: false,
        female: false,
        selectedCategories: [],
    });

    // 필터링된 상품 데이터를 가져오는 함수
    const fetchProductData = () => {
        const genderFilter = filters.male ? 'male' : filters.female ? 'female' : '';
        fetchProducts(filters.selectedCategories, genderFilter);
    };

    useEffect(() => {
        fetchProductData();
    }, [filters]); // 필터가 변경될 때마다 상품 데이터 호출

    // 카테고리 변경 핸들러
    const handleCategoryChange = (categoryId) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            selectedCategories: prevFilters.selectedCategories.includes(categoryId)
                ? prevFilters.selectedCategories.filter(id => id !== categoryId)
                : [...prevFilters.selectedCategories, categoryId],
        }));
    };

    // 성별 필터 변경 핸들러
    const handleGenderChange = (gender) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            male: gender === 'male' ? !prevFilters.male : false,
            female: gender === 'female' ? !prevFilters.female : false,
        }));
    };

    return (
        <FilterContainer>
            <h3>카테고리</h3>
            {categories.map((category, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        checked={filters.selectedCategories.includes(parseInt(category))}
                        onChange={() => handleCategoryChange(parseInt(category))}
                    />
                    {allCategories.신발[index]}
                </label>
            ))}

            <h3>성별</h3>
            <label>
                <input
                    type="checkbox"
                    checked={filters.male}
                    onChange={() => handleGenderChange('male')}
                />
                남성
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={filters.female}
                    onChange={() => handleGenderChange('female')}
                />
                여성
            </label>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export default SideFilter1;
