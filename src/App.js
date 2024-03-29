import {Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Components/MyPage";
import Login from "./Pages/Login";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path = "/my-page" element = {<MyPage />} />
        <Route path="/purchase" element={<Purchase></Purchase>}></Route>
        <Route path="/sale" element={<Sale></Sale>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
