import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Components/MyPage";
import Login from "./Pages/Login";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";
import TotalCate from "./Pages/TotalCate";
import Search from "./Pages/Search";
import CsCenter from "./Pages/CsCenter";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/my-page" element={<MyPage></MyPage>}></Route>
        <Route path="/cs-center" element={<CsCenter></CsCenter>}></Route>
        <Route path="/purchase" element={<Purchase></Purchase>}></Route>
        <Route path="/sale" element={<Sale></Sale>}></Route>
        <Route path="/totalcate" element={<TotalCate></TotalCate>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
