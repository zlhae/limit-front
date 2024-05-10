import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GithubLogo from '../Images/github-logo.svg';
import NotionLogo from '../Images/notion-logo.svg';

const Footer=()=>{
    return(
        <FooterContainer>
            <FooterInner>
                <FotterIneerLink to={"/cs-center"}>고객센터로 이동하기</FotterIneerLink>
                <LinkContainer>
                    <LinkContainerA href="https://github.com/orgs/TEAM-SPACE-1/dashboard"><LogoImg alt="github-logo" src={GithubLogo}></LogoImg></LinkContainerA>
                    <LinkContainerA href="https://www.notion.so/5045309ba1ae403ba687f0a0f437145b?pvs=4"><LogoImg alt="notion-logo" src={NotionLogo}></LogoImg></LinkContainerA>
                </LinkContainer>
            </FooterInner>
        </FooterContainer>
    );
}

const FooterContainer=styled.div`
    width: 100%;  
`
const FooterInner=styled.div`
    margin: 70px 10%;
    margin-bottom: 70px;
    padding-top: 70px;
    border-top: 1px solid #d9d9d9;   

    @media (max-width: 600px) {
        margin: 70px 5%;
    }
`  

const FotterIneerLink=styled(Link)`
    color: #6d6d6d;
    font-weight: bold;
    font-size: 13px;     
`

const LinkContainer=styled.div`
    float: right;
`

const LinkContainerA=styled.a`
    margin-left: 10px;
`

const LogoImg=styled.img`
    height: 25px;
`

export default Footer;