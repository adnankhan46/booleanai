import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/Landing";
import Home from "./pages/Home";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/booleanai" element={<Home/>} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
       <Analytics />
      </BrowserRouter>
    </div>
  );
}

export default App;
