import React, { useState, useEffect } from 'react';
import TaskForm from './../TaskForm/TaskForm';
import { supabase } from '../../../lib/helper/supabaseClient';
import Tasks from './../Tasks/Tasks';
import './TaskManager.css';
import Sidebar from '../Sidebar/sidebar';

const TaskManager = () => {
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
      
      <div className="task-manager">
        <h1>Task Manager</h1>
        <div className='taskform'>
          <TaskForm fetchTasks={fetchTasks} />
        </div>
        <div className='tasks'>
          <h2 className='alltask'>All Your Tasks</h2>
          <Tasks tasks={tasks} fetchTasks={fetchTasks} />
        </div>
    </div>
    </div>
  );
};

export default TaskManager;
