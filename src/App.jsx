import './App.css';
import LoginSignup from './Components/Login-signup/LoginSignup';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import TaskManager from './Components/Home/TaskManager/TaskManager';
import Profile from './Components/Home/Profile/Profile';
import Marketplace from './Components/Home//Marketplace/Marketplace';
import { GlobalStateProvider, useGlobalState } from './Context/globalProvider';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className='App'>
          <div className='content'>
            <Routes>
              <Route path="/" element={<LoginSignup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/taskmanager" element={<TaskManager />} />
              <Route path="/home/profile" element={<Profile />} />
              <Route path="/home/marketplace" element={<Marketplace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
