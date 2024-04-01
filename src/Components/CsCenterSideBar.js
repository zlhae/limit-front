import styled from "styled-components"

const CsCenterSideBar=()=>{
    return(
        <NavigationContainer>
            <NavigationTitle>고객센터</NavigationTitle>
            <CategoryContainer>
                <NavigationElement>공지사항</NavigationElement>
                <NavigationElement>이벤트</NavigationElement>
                <NavigationElement>서비스 안내</NavigationElement>
            </CategoryContainer>
            <CategoryContainer>
                <NavigationElement>상품 등록 문의</NavigationElement>
                <NavigationElement>기타 문의</NavigationElement>
            </CategoryContainer>
        </NavigationContainer>
    )
}

const NavigationContainer=styled.div`
    margin-right: 50px;

    @media (max-width:600px){
        display: none;
    }
`

const NavigationTitle=styled.h3`
    margin: 0px;
    margin-bottom: 20px;
    cursor: default;
`

const CategoryContainer=styled.div`
    margin-bottom: 15px;
`

const NavigationElement=styled.h5`
    margin: 0px;
    margin-bottom: 10px;
    font-weight: normal;
    cursor: pointer;
`

export default CsCenterSideBar;