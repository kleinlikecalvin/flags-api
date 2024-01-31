import Header from "./Header";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CountryDetailPage from "./CountryDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:alpha3Code" element={<CountryDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
