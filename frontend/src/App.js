import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
//pages and components
import Home from './pages/Home'
import Gmap from './pages/Gmap'
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/map"
              element={<Gmap />}
            />


          </Routes>

        </div>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
