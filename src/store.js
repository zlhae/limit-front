import { configureStore, createSlice } from '@reduxjs/toolkit';

// 회원가입 초기상태 정의
const signUpinitialState = {
    email: "", // 사용자 이메일
    responseMessage: "", // 서버 응답 메시지
    showText: false, // 메시지 표시 여부
};

// 회원가입 Slice
const signUpSlice = createSlice({
    name: "signUp",
    initialState: signUpinitialState,
    reducers: {
        setEmail(state, action) { // 이메일 설정 리듀서
            state.email = action.payload;
        },
        setResponseMessage(state, action) { // 응답 메시지 설정 리듀서
            state.responseMessage = action.payload;
            state.showText = true;
        },
    },
});

export const { setEmail, setResponseMessage } = signUpSlice.actions;

// 회원가입 사용자 상세정보 초기상태 정의
const signUpInfo_InitialState = {
    phoneNumber: "", // 사용자 휴대폰 번호
    nickname: "", // 사용자 닉네임
    password: "", // 사용자 패스워드
    checkPW: "", // 사용자 패스워드 확인
    gender: "", // 사용자 성별
    pwValid: false, // 유효하지 않은 비밀번호
    pwInvalid: false, // 유효한 비밀번호
    pwTouched: false, // 패스워드 입력여부
    pwConfirmTouched: false, // 패스워드 확인 입력여부
    nickNameValid: false, // 닉네임 중복상태 여부
    memberId: null, // 멤버 ID
};

// 회원가입 사용자 상세정보 Slice
const signUpInfoSlice = createSlice({
    name: "signUpInfo",
    initialState: signUpInfo_InitialState,
    reducers: {
        setPhoneNumber(state, action) { // 사용자 휴대폰 번호 설정 리듀서
            state.phoneNumber = action.payload;
        },
        setNickname(state, action) { // 사용자 닉네임 설정 리듀서
            state.nickname = action.payload;
        },
        setPassword(state, action) { // 사용자 패스워드 설정 리듀서
            state.password = action.payload;
        },
        setCheckPW(state, action) { // 사용자 패스워드 확인 설정 리듀서
            state.checkPW = action.payload;
        },
        setGender(state, action) { // 사용자 성별 설정 리듀서
            state.gender = action.payload;
        },
        setPwValid: (state, action) => { // 유효하지 않은 비밀번호 설정 리듀서
            state.pwValid = action.payload;
        },
        setPwInvalid: (state, action) => { // 유효한 비밀번호 설정 리듀서
            state.pwInvalid = action.payload;
        },
        setPwTouched: (state, action) => { // 패스워드 입력여부 설정 리듀서
            state.pwTouched = action.payload;
        },
        setPwConfirmTouched: (state, action) => { // 패스워드 확인 입력여부 설정 리듀서
            state.pwConfirmTouched = action.payload;
        },
        setNicknameValid(state, action) { // 닉네임 중복확인상태 설정 리듀서
            state.nickNameValid = action.payload;
        },
        setMemberId(state, action) { // 멤버 ID 설정 리듀서
            state.memberId = action.payload;
        }
    },
});

export const { setPhoneNumber, setNickname, setPassword, setCheckPW, setGender, setPwValid, 
               setPwInvalid, setPwTouched, setPwConfirmTouched, setNicknameValid, setMemberId } = signUpInfoSlice.actions;

// 사용자 로그인 초기상태 정의
const auth_InitialState = {
    id: "", // 사용자 이메일 아이디
    password: "", // 사용자 패스워드
    accessToken: null, // 엑세스 토큰
    refreshToken: null, // 리프래쉬 토큰
    isLoggedIn: false, // 로그인 상태
};

// 사용자 로그인 초기상태 정의 Slice
const authSlice = createSlice({
    name: "auth",
    initialState: auth_InitialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true; 
            state.id = action.payload.id;
            state.password = action.payload.password; 
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.id = "";
            state.password = "";
            state.accessToken = null; 
            state.refreshToken = null; 
        },
        setTokens: (state, action) => { 
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    }
});

export const { login, logout, setTokens } = authSlice.actions;

// 마이페이지 메뉴바 초기상태 Slice
const MypageMenuSlice = createSlice({
    name: "MypageMenu",
    initialState: {
        selectedMenu: "default",
        mobileMenu: false,
    },
    reducers: {
        setSelectedMenu(state, action) {
            state.selectedMenu = action.payload;
        },
        toggleMobileMenu(state) {
            state.mobileMenu = !state.mobileMenu;
        },
        closeMobileMenu(state) {
            state.mobileMenu = false;
        }
    },
});

export const { setSelectedMenu, toggleMobileMenu, closeMobileMenu } = MypageMenuSlice.actions;

const store = configureStore({
    reducer: {
        signUp: signUpSlice.reducer,
        signUpInfo: signUpInfoSlice.reducer,
        auth: authSlice.reducer,
        MypageMenu: MypageMenuSlice.reducer,
    },
  });
  
  export default store;