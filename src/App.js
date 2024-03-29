import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TotalCate from "./Pages/TotalCate";
import Search from "./Pages/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/totalcate" element={<><Header /><TotalCate /><Footer /></>} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
