import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import { useGlobalState } from '../../../Context/globalProvider';
import Task from '../Task/Task';
import './Ongoingtasks.css';

const Ongoingtasks = ({ fetchTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user ID:', error);
      } else {
        setUserId(user.id);
      }
    };

    fetchUserId();
  }, []);

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

  const userTasks = tasks.filter(task => task.status === 'ongoing' && task.claimed_by === userId);

  return (
    <div className="mtasks-grid">
      {userTasks.map((task) => (
        <Task key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default Ongoingtasks;