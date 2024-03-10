import {Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyPage from "./Components/MyPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path = "/MyPage" element = {<MyPage />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
