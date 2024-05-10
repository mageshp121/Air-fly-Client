import './App.css'
import Navsection from './components/common/Navsection';
import FlightSearch from './components/flight/FlightSearch';
import OtPVerify from './pages/auth/OtPVerify'
import Registration from './pages/auth/Registration'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/home/Home';
import Booking from './components/flight/Booking';

function App() {

  return (
    <>   
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Registration/>} />
    <Route path='/verify' element={<OtPVerify/>} />
    <Route path='/book' element={<Booking/>} />
    </Routes >
    </>
  )
}


export default App
