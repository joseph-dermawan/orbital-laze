import React, { useState, useEffect } from 'react';
import {useNavigate, Routes, Route } from 'react-router-dom'
import { supabase } from '../../../lib/helper/supabaseClient'
import Activetasks from '../Activetasks/Activetasks';
import Completedtasks from '../Completedtasks/Completedtasks';
import Ongoingtasks from '../Ongoingtasks/Ongoingtasks';
import Sidebar from '../Sidebar/sidebar'
import './Profile.css'

const Profile = () => {
    const [name, setName] = useState('');

    const infoRetrieval = async () => {
        const {data, error} = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching tasks:', error);
          } else {
            setName(data.user.user_metadata.username);
          }
    };

    useEffect(() => {
        infoRetrieval();
      }, '');

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');

    if (error) {
        console.error('Error fetching tasks:', error);
    } else {
        setTasks(data);
    }
    };

    useEffect(() => {
    fetchTasks();
    }, []);
    return (
        <div className='hometm'>
            <div className='sidebar'><Sidebar /></div>
            <div className='profile'>
                <h1>Hi {name}!</h1>
                <div className='availabletask'>
                    <h2>Your Active Tasks</h2>
                    <Activetasks fetchTasks={fetchTasks} />
                </div>
                <div className='ongoingtask'>
                    <h2>Your Ongoing Tasks</h2>
                    <Ongoingtasks fetchTasks={fetchTasks} />
                </div>
                <div className='completedtask'>
                    <h2>Your Completed Tasks</h2>
                    <Completedtasks fetchTasks={fetchTasks} />
                </div>
            </div>
        </div>
        
    )

}

export default Profile