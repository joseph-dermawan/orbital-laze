import React, { useState } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import './TaskForm.css';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log(user);

    if (userError || !user) {
      console.error('User not found or error fetching user:', userError);
      alert('Please log in to create a task.');
      return;
    }

    const task = {
        title,
        description,
        reward,
        uploader_id : user.user.id,
        uploader_name : user.user.user_metadata.username,
        status: 'available',
    };

    console.log("task", task);
    
    // eslint-disable-next-line
    const { data, error } = await supabase.from('tasks').insert([task]);

    if (error) {
      console.error('Error creating task:', error);
      alert('Error creating task.'+ error.code + "/" + error.details);
    } else {
      fetchTasks();
      setTitle('');
      setDescription('');
      setReward('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task Reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
