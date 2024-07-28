import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import './Task.css';

const Task = ({ task, fetchTasks }) => {
  const { task_id, title, description, reward, uploader_id, uploader_name, status, upload_date, claimed_by } = task;
  console.log(task)
  const [user_id, setUserId] = useState('');

    const infoRetrieval = async () => {
        const {data, error} = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching tasks:', error);
          } else {
            setUserId(data.user.id);
          }
    };

    useEffect(() => {
        infoRetrieval();
      }, '');
  

  const acceptTask = async () => {
    if (user_id === uploader_id) {
      alert('You cannot accept your own task.');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update({ status: 'ongoing', claimed_by: user_id })
      .eq('task_id', task_id);

    if (error) {
      console.error('Error accepting task:', error);
    } else {
      fetchTasks();
    }
  };

  const rejectTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: 'available', claimed_by: '' })
      .eq('task_id', task_id);

    if (error) {
      console.error('Error rejecting task:', error);
    } else {
      fetchTasks();
    }
  };

  const completeTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: 'completed' })
      .eq('task_id', task_id);

    if (error) {
      console.error('Error completing task:', error);
    } else {
      fetchTasks();
    }
  };

  const deleteTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('task_id', task_id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      fetchTasks();
    }
  };

  return (
    <div className="task">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Reward: {reward}</p>
      <p>Status: {status}</p>
      <p>Uploader: {uploader_name}</p>
      <div className='taskbutton'>
      {status === 'available' && user_id !== uploader_id && (
        <button className='accepttask' onClick={acceptTask}>Accept Task</button>
      )}
      {status === 'ongoing'  && user_id === claimed_by && (
        <button className='rejecttask' onClick={rejectTask}>Reject Task</button>
      )}
      {status === 'ongoing' && user_id === uploader_id && (
        <button className='completetask' onClick={completeTask}>Complete Task</button>
      )}
      </div>
      <div className='deletebutton'>
        {user_id === uploader_id && (
            <button className='deletetask'onClick={deleteTask}>Delete Task</button>
        )}
      </div>
    </div>
  );
};

export default Task;
