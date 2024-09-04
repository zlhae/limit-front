import React from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children, onReset, selectedFilters }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <SelectedFilters>{selectedFilters}</SelectedFilters>
                    <FooterButtons>
                        <button1 onClick={onReset}>초기화</button1>
                        <button2 onClick={onClose}>상품 보기</button2>
                    </FooterButtons>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;

    @media (min-width: 601px) {
        display: none;
    }
`;

const ModalContent = styled.div`
    background: white;
    padding: 10px 15px 10px 15px;
    border-radius: 10px 10px 0 0;
    width: 100%;
    max-height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 601px) {
        display: none;
    }
`;

const ModalBody = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    padding: 10px;
`;

const ModalFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 15px;
    border-top: 1px solid #e0e0e0;
`;

const SelectedFilters = styled.div`
    font-size: 14px;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
`;

const FooterButtons = styled.div`
    display: flex;
    justify-content: space-between;

    button1 {
        background: #FFFFFF;
        color: black;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        padding: 15px 20px;
        border-radius: 15px;
        cursor: pointer;
        width: 30%;
        margin-right: 5px;
        text-align: center;
        font-weight: bold;
    }

    button2 {
        background: black;
        color: white;
        border: none;
        font-size: 14px;
        padding: 15px 20px;
        border-radius: 15px;
        cursor: pointer;
        width: 100%;
        text-align: center;
        font-weight: bold;
    }
`;

export default Modal;