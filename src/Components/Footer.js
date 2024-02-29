import './Footer.css'
import { Link } from 'react-router-dom';

const Footer=()=>{
    return(
        <div className='footer'>
            <div className='footer-inner'>
                <Link to={"/cs-center"}>고객센터로 이동하기</Link>
                <div className='link-container'>
                    <a href="https://github.com/orgs/TEAM-SPACE-1/dashboard"><img id="github-logo" alt="github-logo" src="images/github-logo.svg"></img></a>
                    <a href="https://www.notion.so/5045309ba1ae403ba687f0a0f437145b?pvs=4"><img id="notion-logo" alt="notion-logo" src="images/notion-logo.svg"></img></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;