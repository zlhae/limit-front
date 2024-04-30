import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import React_Swal from 'sweetalert2-react-content';
import Default_Profile from "../Images/Default_Profile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function ModifyProfile() {

    const RS = React_Swal(Swal);

    const [profileImage, setProfileImage] = useState(""); // 사용자 프로필 사진
    const [nickName, setNickName] = useState(""); // 사용자 닉네임
    const [passWord, setPassWord] = useState(""); // 사용자 비밀번호
    const [showPassWord, setShowPassWord] = useState(false); // 비밀번호 숨기기 상태
    const [phoneNumber, setPhoneNumber] = useState(""); // 사용자 휴대전화 번호
    const [userAddress, setUserAddress] = useState(""); // 사용자 주소정보

    const toggleShowPassWord = () => { // 비밀번호 숨김&보이기 상태 변경 메서드
        setShowPassWord(!showPassWord);
    };

    const phoneNumberChange = (e) => { // 사용자 휴대폰 번호 입력제한 메서드
        const {value} = e.target;
        const onlyNums = value.replace(/[^\d]/g, '');
    
        if (onlyNums.length <= 3) {
          setPhoneNumber(onlyNums);
        } else if (onlyNums.length <= 7) {
          setPhoneNumber(`${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`);
        } else if (onlyNums.length <= 11) {
          setPhoneNumber(`${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`);
        }
    };

    const addressModal = () => { // 주소 입력 모달창 메서드
        RS.fire({
          title: "지역 선택",
          html: '<input id = "swal-input1" class = "swal2-input" placeholder = "거래 가능한 지역을 입력">',
          focusConfirm: false,
          preConfirm: () => {
            const address = document.getElementById('swal-input1').value;
          },
          showCancelButton: true,
          confirmButtonText: "검색",
          cancelButtonText: "취소",
        });
      };
    
    return (
        <Container>
            <Title>프로필 관리</Title>
            <ProfileContainer>
                <ProfileImage/>
                <UserInfoContainer>
                    <Nickname>리밋 관리자</Nickname>
                    <ButtonContainer>
                        <ImageChangeBtn>이미지 변경</ImageChangeBtn>
                        <ImageDeleteBtn>삭제</ImageDeleteBtn>
                    </ButtonContainer>
                </UserInfoContainer>
            </ProfileContainer>
            <DetailInfoBox>

                <SubTitle>프로필 정보</SubTitle>
                <InfoTitle>프로필 이름</InfoTitle>
                <InfoBox>
                    <InputField type = "text" value = {nickName} onChange = {(e) => setNickName(e.target.value)}/>
                    <ChangeButton>변경</ChangeButton>
                </InfoBox>

                <SubTitle style = {{marginTop: "25px"}}>내 계정</SubTitle>
                <InfoTitle>이메일 주소</InfoTitle>
                <InfoBox>
                    limit@gmail.com
                </InfoBox>

                <SubTitle style = {{marginTop: "25px"}}>비밀번호</SubTitle>
                <InfoBox>
                    <InputField type = {showPassWord ? "text" : "password"} value = {passWord} 
                                onChange = {(e) => setPassWord(e.target.value)} 
                                showPassWord = {showPassWord} style = {{width: "81%"}}
                                isPassword = {true}/>
                    <ToggleButton onClick = {toggleShowPassWord}>
                        {showPassWord ? <FontAwesomeIcon icon = {faEye}/> : <FontAwesomeIcon icon = {faEyeSlash}/>}
                    </ToggleButton>
                    <ChangeButton style = {{marginLeft: "6%"}}>변경</ChangeButton>
                </InfoBox>

                <SubTitle style = {{marginTop: "25px"}}>개인 정보</SubTitle>
                <InfoTitle>휴대폰 번호</InfoTitle>
                <InfoBox>
                    <InputField type = "tel" value = {phoneNumber} onChange = {phoneNumberChange}
                                pattern = "[0-9]*" inputMode = "numeric"/>
                    <ChangeButton>변경</ChangeButton>
                </InfoBox>

                <InfoTitle style = {{marginTop: "25px"}}>주소</InfoTitle>
                <InfoBox>
                    <UserAddress/>
                    <ChangeButton onClick = {addressModal}>변경</ChangeButton>
                </InfoBox>
                <Withdrawal>회원 탈퇴</Withdrawal>
            </DetailInfoBox>
        </Container>
    );
}

const Container = styled.div` // 최상위 부모컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.div` // 제목 컴포넌트
    font-size: 17.5px;
    font-weight: bold;

    @media (max-width: 800px) {
        display: none;
    }
`;

const ProfileContainer = styled.div` // 프로필 컨테이너
    display: flex;
    width: 100%;
    height: 150px;
    background-color: white;
    border-radius: 15px;
    margin-top: 30px;

    @media (max-width: 800px) {
        height: 120px;
    }
`;

const ProfileImage = styled.div` // 사용자 프로필 이미지
    width: 120px;
    height: 120px;
    margin-top: 15px;
    margin-left: 15px;
    background-image: url(${Default_Profile});
    background-size: cover;
    border-radius: 50%;

    @media (max-width: 800px) {
        width: 90px;
        height: 90px;
    }
`;

const UserInfoContainer = styled.div` // 사용자 정보 컨테이너
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
    margin-left: 30px;

    @media (max-width: 800px) {
        height: 120px;
        margin-left: 20px;
    }
`;

const Nickname = styled.div` // 사용자 닉네임
    font-size: 17.5px;
    font-weight: bold;
    margin-bottom: 10px;

    @media (max-width: 800px) {
        font-size: 15px;
    }
`;

const ButtonContainer = styled.div` // 버튼 컨테이너
    display: flex;
    width: 100%;
    font-size: 12.5px;
    color: #6D6D6D;
    text-align: center;

    @media (max-width: 800px) {
        font-size: 10px;
    }
`;

const ImageChangeBtn = styled.div` // 프로필 이미지 변경 버튼
    width: 70px;
    padding: 10px;
    background-color: #D9D9D9;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;

    @media (max-width: 800px) {
        width: 60px;
    }
`;

const ImageDeleteBtn = styled.div` // 프로필 이미지 삭제 버튼
    width: 35px;
    padding: 10px;
    background-color: #D9D9D9;
    border-radius: 10px;
    cursor: pointer;

    @media (max-width: 800px) {
        width: 30px;
    }
`;

const DetailInfoBox = styled.div` // 상세정보 부모 컨테이너
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-top: 20px;

    @media (max-width: 800px) {
        width: 100%;
    }
`; 

const SubTitle = styled.div` // 컨테이너 내부 제목 컴포넌트
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 15px;
`;

const InfoTitle = styled.div` // 세부 제목 컴포넌트
    font-size: 12.5px;
    color: #757576;
`;

const InfoBox = styled.div` // 세부 상세정보 박스
    display: flex;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #9F9F9F;
`;

const InputField = styled.input` // 사용자 입력 필드
    width: 85%;
    font-size: ${(props) => (props.isPassword && !props.showPassWord ? "50px" : "15px")};
    border: none;
    background-color: transparent;  
`;

const UserAddress = styled.div` // 사용자 주소정보
    width: 85%;
    font-size: 15px;
`;

const ChangeButton = styled.div` // 사용자 정보 변경 버튼
    width: 10%;
    height: 25px;
    font-size: 12.5px;
    color: #888888;
    margin-left: 5%;
    background-color: #D9D9D9;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
`;

const ToggleButton = styled.div` // 비밀번호 출력상태 토글버튼
    cursor: pointer;
`;

const Withdrawal = styled.div` // 회원탈퇴 버튼
    cursor: pointer;
    text-decoration: underline;
    margin-top: 20px;
    font-size: 12.5px;
    color: #6D6D6D;
`;