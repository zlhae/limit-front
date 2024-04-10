import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Components/MyPage";
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

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path = "/my-page" element = {<MyPage />} />
        <Route path="/purchase" element={<Purchase></Purchase>}></Route>
        <Route path="/sale" element={<Sale></Sale>}></Route>
        <Route path="/totalcate" element={<TotalCate />}/>
        <Route path="/outercate" element={<OuterCate />}/>
        <Route path="/topcate" element={<TopCate />}/>
        <Route path="/bottomcate" element={<BottomCate />}/>
        <Route path="/shoescate" element={<ShoesCate />}/>
        <Route path="/bagcate" element={<BagCate />}/>
        <Route path="/goodscate" element={<GoodsCate />}/>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
