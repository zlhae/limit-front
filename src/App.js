import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Pages/MyPage";
import Login from "./Pages/Login";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";
import TotalCate from "./Pages/TotalCate";
import Search from "./Pages/Search";
import CsCenter from "./Pages/CsCenter";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path = "/cs-center" element={<CsCenter/>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/sign-up" element = {<SignUp/>}></Route>
        <Route path = "/my-page" element = {<MyPage/>} />
        <Route path = "/purchase" element = {<Purchase/>}></Route>
        <Route path = "/sale" element = {<Sale/>}></Route>
        <Route path = "/totalcate" element = {<TotalCate/>}/>
        <Route path = "/search" element = {<Search/>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
