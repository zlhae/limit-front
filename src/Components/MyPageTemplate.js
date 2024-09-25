import React from 'react';
import styled from 'styled-components';

const MyPageTemplate = ({ title, toggleButtons, api }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <InnerContainer>
                <ButtonContainer>
                    {toggleButtons.map((button, index) => (
                        <ToggleButton key = {index} selected = {button.isSelected} onClick = {button.onClick}>
                            <div>{button.name}</div>
                            <div>{button.count}</div>
                        </ToggleButton>
                    ))}
                </ButtonContainer>
                <BottomContainer>
                    {api}
                </BottomContainer>
            </InnerContainer>
        </Container>
    );
};

const Container = styled.div` // 최상위 부모컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 17.5px;
    font-weight: bold;

    @media (max-width: 800px) { // 모바일 뷰
        display: none;
    }
`;

const InnerContainer = styled.div` // 내부 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin-top: 30px;
    border-radius: 15px;
    background-color: white;
`;

const ButtonContainer = styled.div` // 버튼 컨테이너
    display: flex;
    width: 100%;
`;

const ToggleButton = styled.div` // 토글버튼 컴포넌트
    display: flex;
    flex-direction: column;
    width: 33.3%;
    height: 80px;
    font-size: 15px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-bottom: 3px solid ${props => props.selected ? "#FFC939" : "#D9D9D9"};
`;

const BottomContainer = styled.div` // 세부정보 컨테이너
    width: 100%;
    height: 100%;
`;

export default MyPageTemplate;