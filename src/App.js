import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Pages/MyPage";
import Login from "./Pages/Login";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";
import TotalCate from "./Pages/TotalCate";
import OuterCate from "./Pages/OuterCate";
import TopCate from "./Pages/TopCate";
import BottomCate from "./Pages/BottomCate";
import ShoesCate from "./Pages/ShoesCate";
import BagCate from "./Pages/BagCate";
import GoodsCate from "./Pages/GoodsCate";
import Search from "./Pages/Search";
import Main from "./Pages/Main";
import CsCenter from "./Pages/CsCenter";
import SignUp from "./Pages/SignUp";
import SearchID from "./Pages/Search_ID";
import SearchPW from "./Pages/Search_PW";
import Certification from "./Pages/certification";
import SignUpInfo from "./Pages/SignUpInfo";
import ProductDetail from "./Pages/ProductDetail";
import SignUpComplete from "./Pages/SignUpComplete";
import Brand from "./Pages/Brand";
import Chatting from "./Pages/Chatting";

function App() {
  return (
    <div className = "App">
      <Header></Header>
      <Routes>
        <Route path = "/" element = {<Main/>} />
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/certification" element = {<Certification/>}></Route>
        <Route path = "/sign-up" element = {<SignUp/>}></Route>
        <Route path = "/sign-up-info" element = {<SignUpInfo/>}></Route>
        <Route path = "/sign-up-complete" element = {<SignUpComplete/>}></Route>
        <Route path = "/search-id" element = {<SearchID/>}></Route>
        <Route path = "/search-pw" element = {<SearchPW/>}></Route>
        <Route path = "/my-page" element = {<MyPage/>} />
        <Route path = "/purchase" element = {<Purchase/>}></Route>
        <Route path = "/sale" element = {<Sale/>}></Route>
        <Route path = "/totalcate" element = {<TotalCate/>}/>
        <Route path = "/search" element = {<Search/>} />
        <Route path = "/cs-center" element = {<CsCenter/>}></Route>
        <Route path = "/outercate" element = {<OuterCate/>}/>
        <Route path = "/topcate" element = {<TopCate/>}/>
        <Route path = "/bottomcate" element = {<BottomCate/>}/>
        <Route path = "/shoescate" element = {<ShoesCate/>}/>
        <Route path = "/bagcate" element = {<BagCate/>}/>
        <Route path = "/goodscate" element = {<GoodsCate/>}/>
        <Route path = "/brand" element = {<Brand/>}/>
        <Route path = "/productdetail" element = {<ProductDetail/>}/>
        <Route path = "/chatting" element = {<Chatting/>}/>
      </Routes>
      <Footer></Footer>  
    </div>
  );
}

export default App;
