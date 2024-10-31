
import {BrowserRouter, Routes, Route} from "react-router-dom"

import DigitalElectronicsSolver from "./DigitalElectronicsSolver"
import LandingPage from "./pages/LandingPage"

function App() {
 

  return (
    <>
        <BrowserRouter>
        <Routes>
        <Route path="/booleanai" element={<DigitalElectronicsSolver/>}/>
        <Route path="/" element={<LandingPage/>}/>
        
        </Routes>
        </BrowserRouter>

      {/* <div className="flex w-full">
        <p className="mx-auto my-4 font-semibold text-center text-xs">
        Built By <span className="text-[#6a7cff] font-bold">ADNAN KHAN</span>
        </p>
          
      </div> */}
    </>
  )
}

export default App
