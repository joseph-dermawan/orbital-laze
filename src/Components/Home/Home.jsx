import React, {useState} from 'react'
import {useNavigate, Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar/sidebar'
import './Home.css'
import TaskManager from './TaskManager/TaskManager';
import Marketplace from './Marketplace/Marketplace';
import Profile from './Profile/Profile';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/home/taskmanager" element={<TaskManager />} />
          <Route path="/home/marketplace" element={<Marketplace />} />
          <Route path="/home/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
