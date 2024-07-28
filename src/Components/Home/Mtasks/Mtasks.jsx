import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import { useGlobalState } from '../../../Context/globalProvider';
import Task from '../Task/Task';
import './Mtasks.css';

const Mtasks = ({ fetchTasks }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const userTasks = tasks.filter(task => task.status === 'available');

  return (
    <div className="mtasks-grid">
      {userTasks.map((task) => (
        <Task key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default Mtasks;