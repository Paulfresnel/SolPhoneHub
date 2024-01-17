import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import {Route, Routes} from "react-router-dom"
import Homepage from './components/HomePage/Homepage';
import AirdropsCalculator from './components/AirdropsCalculator/AirdropsCalculator';
import LatestUpdates from './components/LatestUpdates/LatestUpdates';
import Footer from './components/Footer/Footer';
import SagaDaoAccnt from './components/SagaDaoAccnt/SagaDaoAccnt';

function App() {
  return (
    <div className="App">
    <div><Header/></div>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/airdrops' element={<AirdropsCalculator/>}/>
      <Route path='/updates' element={<LatestUpdates/>}/>
      <Route path="/saga-dao" element={<SagaDaoAccnt/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
