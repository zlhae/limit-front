import './Login.css';
import { Link } from 'react-router-dom';

const Login=()=>{
    return(
        <div className="login-container">
            <h1 id='login-title'>로그인</h1>
            <div className="email-login-container">  
                <input type="text" placeholder="이메일"></input>
                <input type="password" placeholder="비밀번호"></input>
                <button>이메일로 로그인하기</button>
            </div>
            <hr id='login-hr'></hr>
            <div className="oauth-login-container">
                <button id="naver">네이버로 로그인하기</button>
                <button id="kakao">카카오로 로그인하기</button>
                <button id="google">Google로 로그인하기</button>
            </div>
            <div className="search-container">
                <Link to={"/search-id"}>아이디 찾기</Link>
                <Link to={"/search-password"}>비밀번호 찾기</Link>
            </div>
            <div className="goto-join-container">
                <p>아직 계정이 없으신가요?</p>
                <Link to={"/search"}>회원가입으로 이동</Link>
            </div>
        </div>
    );
}

export default Login;