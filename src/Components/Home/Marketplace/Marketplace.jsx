import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import Mtasks from '../Mtasks/Mtasks';
import {useNavigate} from 'react-router-dom'
import './Marketplace.css';
import Sidebar from '../Sidebar/sidebar';

const Marketplace = () => {
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
      <div className="marketplace">
        <h1>Marketplace</h1>
        <div className='mtasks'>
          <Mtasks tasks={tasks} fetchTasks={fetchTasks} />
        </div>
    </div>
    </div>
  );
};

export default Marketplace;
