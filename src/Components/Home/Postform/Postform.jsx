import React, { useState } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import './Postform.css';

const Postform = ({ fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log(user);

    if (userError || !user) {
      console.error('User not found or error fetching user:', userError);
      alert('Please log in to create a task.');
      return;
    }

    const post = {
        title: title,
        author_id : user.user.id,
        author_name : user.user.user_metadata.username,
        text: description
    };

    console.log("post", post);
    
    // eslint-disable-next-line
    const { data, error } = await supabase.from('posts').insert([post]);

    if (error) {
      console.error('Error creating task:', error);
      alert('Error creating task.'+ error.code + "/" + error.details);
    } else {
        fetchPosts();
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Post Content"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default Postform;
