
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home/Home';
import Sobre from './pages/Sobre/Sobre';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/sobre' element={<Sobre />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
