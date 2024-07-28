import React, {useState} from 'react'
import { supabase } from '../../../lib/helper/supabaseClient';
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error logging out:', error);
        } else {
          navigate('/');
        }
      };

  return (
    <div className='sidenav active'>
        <div className='appname'>
            <strong>LAZE</strong>
            <div className='underline'></div>
        </div>
        <ul>
            <li>
                <a href="/home">Home</a>
            </li>
            <li>
                <a href="/home/taskmanager">Your Tasks</a>
            </li>
            <li>
                <a href="/home/marketplace">Marketplace</a>
            </li>
            <li>
                <a href="/home/profile">Profile</a>
            </li>
        </ul>
        <button className='logout-button' onClick={handleLogout}>
         Logout
        </button>
    </div>
  )
}

export default Sidebar;
