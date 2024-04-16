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

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path = "/" element = {<Main/>} />
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/sign-up" element = {<SignUp/>}></Route>
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
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
