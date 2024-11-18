import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import React_Swal from 'sweetalert2-react-content';
import Default_Profile from "../Images/Default_Profile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Cookies from 'js-cookie';

export default function ModifyProfile() {

    const RS = React_Swal(Swal); 
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(""); // 사용자 프로필 사진
    const [email, setEmail] = useState(""); // 사용자 이메일
    const [nickName, setNickName] = useState(""); // 사용자 닉네임
    const [passWord, setPassWord] = useState(localStorage.getItem("userPW")); // 사용자 현재 비밀번호
    const [inputPW, setInputPW] = useState(""); // 사용자 입력 비밀번호
    const [newPassWord, setNewPassWord] = useState(""); // 사용자 새 비밀번호
    const [showPassWord, setShowPassWord] = useState(false); // 비밀번호 숨기기 상태
    const [phoneNumber, setPhoneNumber] = useState(""); // 사용자 휴대전화 번호
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(""); // 휴대전화 번호 저장 포맷
    const [isPhoneEditable, setIsPhoneEditable] = useState(false); // 휴대폰 번호 수정 활성화 상태
    const [userAddress, setUserAddress] = useState(""); // 사용자 주소정보
    const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 활성화 상태
    const [showNewPasswordField, setShowNewPasswordField] = useState(false); // 새 비밀번호 필드 활성화 상태

    useEffect(() => {
      fetchUserProfile(); 
    }, []);

    const fetchUserProfile = async () => {
        const token = Cookies.get('accessToken'); 
        try {
            const response = await axios.get('https://api.lim-it.one/api/v1/members/my-profile/full', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            const { profileUrl, email, nickname, phoneNumber, address } = response.data;
            setProfileImage(profileUrl);
            setEmail(email);
            setNickName(nickname);
            setPhoneNumber(phoneNumber);
            setUserAddress(address);
            setFormattedPhoneNumber(phoneNumberChange(phoneNumber));
        } catch (error) {
              console.error("프로필 정보조회중 오류발생 : ", error);
              window.alert("프로필 정보조회중 오류가 발생했습니다.");
              navigate(-1); 
        }
    };

    const toggleShowPassWord = () => { // 비밀번호 숨김&보이기 상태 변경 메서드
        setShowPassWord(!showPassWord);
    };

    const phoneNumberChange = (number) => { // 사용자 휴대폰 번호 포맷 변환 메서드
      const onlyNums = number.replace(/[^\d]/g, '');
  
      if (onlyNums.length <= 3) {
          return onlyNums;
      } else if (onlyNums.length <= 7) {
          return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      } else if (onlyNums.length <= 11) {
          return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
      }
      return number; 
  };

    const handleImageChange = async (event) => { // 프로필 이미지 등록 메서드
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const token = Cookies.get('accessToken');
      try {
          const response = await axios.post('https://api.lim-it.one/api/v1/storages/profile', formData, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          });
          setProfileImage(response.data.url);
      } catch (error) {
          console.error("프로필 이미지 업로드 중 오류발생 : ", error);
          window.alert("프로필 이미지 업로드에 실패했습니다.");
      }
  };

    const handleImageDelete = async () => { // 프로필 이미지 삭제 메서드
      const token = Cookies.get('accessToken');
      try {
          await axios.delete('https://api.lim-it.one/api/v1/storages/profile', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setProfileImage("");
      } catch (error) {
          console.error("프로필 이미지 삭제 중 오류발생 : ", error);
          window.alert("프로필 이미지 삭제에 실패했습니다.");
      }
    };

    const handleNicknameChange = async () => { // 닉네임 수정 메서드
      const token = Cookies.get('accessToken');
      try {
          await axios.put('https://api.lim-it.one/api/v1/members/my-profile/nickname', { nickname: nickName }, 
              {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
              }
          );
          window.alert("닉네임이 변경되었습니다.");
          setIsEditing(false); 
      } catch (error) {
          if (error.response && error.response.data.codeName === "DUPLICATED_NICKNAME") {
              window.alert("이미 사용중인 닉네임입니다.");
          } else {
              console.error("닉네임 변경 중 오류발생 : ", error);
              window.alert("닉네임 변경에 실패했습니다.");
          }
      }
    };

    const toggleEditMode = () => { // 닉네임 인풋필드 활성화 상태 토글 메서드
        setIsEditing(true);
    };

    const handlePasswordChange = async () => { // 새 비밀번호 입력필드 활성화 메서드
        if (inputPW !== passWord) {
            window.alert("현재 비밀번호와 일치하지 않습니다.");
            return;
        }
        setShowNewPasswordField(true);
    };

    const handleNewPasswordSubmit = async () => { // 비밀번호 변경 메서드
        try {
            await axios.put('https://api.lim-it.one/api/v1/members/my-profile/password',
                { currentPassword: inputPW, newPassword: newPassWord },
                {
                  headers: {
                      Authorization: `Bearer ${Cookies.get("accessToken")}`,
                  }
                }
            );
            localStorage.setItem("userPW", newPassWord);
            window.alert("새 비밀번호로 변경되었습니다.");
            setInputPW(""); 
            setNewPassWord(""); 
            setShowNewPasswordField(false);
        } catch (error) {
            if (error.response && error.response.data.codeName === "DUPLICATED_PASSWORD") {
                window.alert("이미 사용 중인 현재 비밀번호입니다.");
            } else {
                console.error("비밀번호 변경 중 오류 발생: ", error);
                window.alert("비밀번호 변경에 실패했습니다.");
            }
        }
    };

    const handlePhoneNumberChange = (e) => { // 휴대전화번호 입력 처리 메서드
      const { value } = e.target;
      const formattedNumber = phoneNumberChange(value);
      setFormattedPhoneNumber(formattedNumber); 
  };

    const handlePhoneNumberSubmit = async () => { // 휴대전화번호 변경 메서드
        const token = Cookies.get('accessToken');
        const phoneNumberToSend = formattedPhoneNumber;

        try {
            await axios.put('https://api.lim-it.one/api/v1/members/my-profile/phone-number', {
                phoneNumber: phoneNumberToSend
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setPhoneNumber(phoneNumberToSend); 
            setIsPhoneEditable(false); 
            window.alert("전화번호가 변경되었습니다.");
        } catch (error) {
            console.error("전화번호 변경 중 오류 발생: ", error);
            window.alert("전화번호 변경에 실패했습니다.");
        }
    };

    const toggleEditPhoneNumber = () => { // 휴대전화번호 입력필드 활성화 메서드
        setIsPhoneEditable(true); // 수정 활성화
    };

    const handleAddressSubmit = async (selectedAddress) => { // 주소 수정 메서드
        const token = Cookies.get('accessToken');
        try {
            await axios.put('https://api.lim-it.one/api/v1/members/my-profile/address', 
                { address: selectedAddress }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            window.alert("주소가 변경되었습니다.");
        } catch (error) {
            console.error("주소 변경 중 오류 발생: ", error);
            window.alert("주소 변경에 실패했습니다.");
        }
    };

  const addressModal = () => {
    RS.fire({
        title: "지역 선택",
        html: '<input id="swal-input1" class="swal2-input" placeholder="거래 가능한 지역을 입력">',
        focusConfirm: false,
        preConfirm: async () => {
            const query = document.getElementById("swal-input1").value;
            if (query) {
                try {
                    const response = await axios.get("https://api.lim-it.one/api/v1/locations/search", {
                        params: { query }
                    });
                    const locations = response.data;
                    if (locations && Array.isArray(locations) && locations.length > 0) {
                        return locations;
                    } else {
                        const { value: confirmRegister } = await Swal.fire({
                            title: "검색 결과가 없습니다.",
                            text: "현재 검색한 지역을 서버에 등록하시겠습니까?",
                            showCancelButton: true,
                            confirmButtonText: "등록",
                            cancelButtonText: "취소"
                        });

                        if (confirmRegister) {
                            await newLocationModal(query); 
                        }
                    }
                } catch (error) {
                    Swal.showValidationMessage("검색 중 오류가 발생했습니다.");
                }
            } else {
                Swal.showValidationMessage("검색어를 입력해주세요.");
            }
        },
        showCancelButton: true,
        confirmButtonText: "검색",
        cancelButtonText: "취소"
    }).then((result) => {
        if (result.isConfirmed) {
            const locations = result.value;
            if (locations && Array.isArray(locations) && locations.length > 0) {
                const locationOptions = locations.map(location => ({
                    id: location.id,
                    name: `${location.region1} ${location.region2} ${location.region3} ${location.region4}`
                }));
                showLocationOptions(locationOptions);
            }
        }
    });
    };

    const newLocationModal = async (newLocationName) => { // 새로운 지역 등록 메서드
        const { value: registeredLocation } = await RS.fire({
            title: "주소 등록",
            html: `<p>${newLocationName}를 등록하시겠습니까?</p>`,
            focusConfirm: false,
            preConfirm: async () => {
                if (newLocationName) {
                    try {
                        const response = await axios.patch("https://api.lim-it.one/api/v1/locations/search", { name: newLocationName });
                        return response.data;
                    } catch (error) {
                        Swal.showValidationMessage("오류가 발생하였습니다.");
                    }
                } else {
                    Swal.showValidationMessage("등록할 지역명을 입력해주세요.");
                }
            },
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소"
        });

        if (registeredLocation) {
            setUserAddress(`${registeredLocation.region1} ${registeredLocation.region2} ${registeredLocation.region3} ${registeredLocation.region4}`);
        }
    };

    const showLocationOptions = (locationOptions) => {
        RS.fire({
            title: "검색 결과",
            html: `<style>
            .location-item {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .location-item:hover {
                background-color: #f0f0f0;
            }
            .location-item .region-name {
                flex-grow: 1;
                font-size: 16px;
                font-weight: 500;
            }
            </style>
            <div>${locationOptions.map(loc => `
            <div class="location-item" data-id="${loc.id}">
                <div class="region-name">${loc.name}</div>
            </div>
            `).join('')}</div>`,
            showConfirmButton: false,
            showCloseButton: true,
            didOpen: () => {
                const locationList = document.querySelectorAll(".location-item");
                locationList.forEach(item => {
                    item.addEventListener("click", () => {
                        const selectedLocation = {
                            id: item.dataset.id,
                            name: item.querySelector(".region-name").textContent
                        };
                        setUserAddress(selectedLocation.name);
                        handleAddressSubmit(selectedLocation.name);
                        RS.close();
                    });
                });
            }
        });
    };

    return (
        <Container>
            <Title>프로필 관리</Title>
            <ProfileContainer>
                <ProfileImage image = {profileImage}/>
                <UserInfoContainer>
                    <Nickname>{nickName}</Nickname>
                    <ButtonContainer>
                        <ImageChangeBtn>
                            <input type = "file" accept = "image/*" style = {{ display: 'none' }} onChange = {handleImageChange} id = "file-input"/>
                            <label htmlFor = "file-input" style = {{ cursor: 'pointer' }}>이미지 변경</label>
                        </ImageChangeBtn>
                        <ImageDeleteBtn onClick = {handleImageDelete}>삭제</ImageDeleteBtn>
                    </ButtonContainer>
                </UserInfoContainer>
            </ProfileContainer>
            <DetailInfoBox>
                <SubTitle>프로필 정보</SubTitle>
                <InfoTitle>닉네임</InfoTitle>
                <InfoBox>
                    <InputField type = "text" value = {nickName} onChange = {(e) => setNickName(e.target.value)} disabled = {!isEditing}/>
                    {isEditing ? (
                        <ChangeButton onClick = {handleNicknameChange}>수정</ChangeButton>) : (
                        <ChangeButton onClick = {toggleEditMode}>변경</ChangeButton>
                    )}
                </InfoBox>

                <SubTitle style = {{marginTop: "25px"}}>내 계정</SubTitle>
                <InfoTitle>이메일 주소</InfoTitle>
                <InfoBox>{email}</InfoBox>

                <SubTitle style = {{marginTop: "25px"}}>비밀번호 변경</SubTitle>
                <InfoTitle>현재 비밀번호</InfoTitle>
                <InfoBox>
                    <InputField type = {showPassWord ? "text" : "password"} value = {inputPW}
                                onChange = {(e) => setInputPW(e.target.value)} 
                                showPassWord = {showPassWord} style = {{width: "81%"}} 
                                isPassword = {true} 
                                placeholder = "현재 PW확인 후 새 필드가 생성됩니다."
                    />
                    {!showNewPasswordField && (
                        <>
                            <ToggleButton onClick = {toggleShowPassWord}>
                                {showPassWord ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
                            </ToggleButton>
                            <ChangeButton onClick = {handlePasswordChange} style = {{ marginLeft: "6%" }}>확인</ChangeButton>
                        </>
                    )}
                </InfoBox>
                {showNewPasswordField && (
                    <>
                        <InfoTitle style = {{ marginTop: "20px" }}>새로운 비밀번호</InfoTitle>
                        <InfoBox>
                            <InputField 
                                type = {showPassWord ? "text" : "password"} 
                                value = {newPassWord} 
                                onChange = {(e) => setNewPassWord(e.target.value)} 
                                showPassWord = {showPassWord} 
                                style = {{ width: "81%" }} 
                            />
                            <ToggleButton onClick  ={toggleShowPassWord}>
                                {showPassWord ? <FontAwesomeIcon icon = {faEye}/> : <FontAwesomeIcon icon = {faEyeSlash}/>}
                            </ToggleButton>
                            <ChangeButton onClick = {handleNewPasswordSubmit} style = {{ marginLeft: "6%" }}>변경</ChangeButton>
                        </InfoBox>
                    </>
                )}

                <SubTitle style = {{marginTop: "25px"}}>개인 정보</SubTitle>
                <InfoTitle>휴대폰 번호</InfoTitle>
                <InfoBox>
                    <InputField 
                        type = "tel" 
                        value = {formattedPhoneNumber} 
                        onChange = {handlePhoneNumberChange} 
                        disabled = {!isPhoneEditable} 
                        placeholder = "휴대폰 번호를 입력하세요"
                    />
                    {isPhoneEditable ? (
                        <ChangeButton onClick = {handlePhoneNumberSubmit} style = {{ marginLeft: "6%" }}>수정</ChangeButton>
                    ) : (
                        <ChangeButton onClick = {toggleEditPhoneNumber} style = {{ marginLeft: "6%" }}>변경</ChangeButton>
                    )}
                </InfoBox>

                <InfoTitle style = {{marginTop: "25px"}}>주소</InfoTitle>
                <InfoBox>
                    <UserAddress>{userAddress}</UserAddress>
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
    background-image: url(${props => props.image || Default_Profile});
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

    &:hover {
        background-color: #B0B0B0; 
        color: black;
    }

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

    &:hover {
        background-color: #B0B0B0; 
        color: black;
    }

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
    font-size: ${(props) => (props.isPassword && !props.showPassWord ? "25px" : "15px")};
    border: none;
    background-color: transparent;  

    &::placeholder {
        font-size: 15px; 
        color: #999; 
    }
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

    &:hover {
        background-color: #B0B0B0;
        color: black;
    }
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