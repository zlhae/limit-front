import './Header.css';
import { Link } from 'react-router-dom';

const Header=()=>{
    return(
        <div className="header">
            <div className="header-top">
                <div className="top-inner">
                    <ul className='top-list'>
                        <li className='top-item'><Link to={"/cs-center"}>고객센터</Link></li>
                        <li className='top-item'><Link to={"/my-page"}>마이페이지</Link></li>
                        <li className='top-item'><Link to={"/login"}>로그인</Link></li>
                    </ul>
                </div>
            </div>
            <div className='header-main'>
                <Link to={"/"}><img id="limit-logo" alt="limit-logo" src="images/limit-logo.svg"></img></Link>
                <div className="bnt_area">
                    <Link to={"/chatting"}><img id="chatting-icon" alt="chatting-icon" src="images/chatting-icon.svg"></img></Link>
                    <Link to={"/search"}><img id="search-icon" alt="search-icon" src="images/search-icon.svg"></img></Link>
                </div>
            </div>
        </div>
    );
}

export default Header;