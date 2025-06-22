import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./Landing";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/booleanai" element={<Home/>} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
