import React, {useState, useEffect} from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import './Post.css';

const Post = ({ post, fetchPosts }) => {
  const {post_id, title, author_id, author_name, text} = post;
  console.log(post)
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

  const deleteTask = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('post_id', post_id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
        fetchPosts();
    }
  };

  return (
    <div className="task">
      <h2>{title}</h2>
      <p>Author: {author_name}</p>
      <p>{text}</p>
      <div className='deletebutton'>
        {user_id === author_id && (
            <button className='deletetask'onClick={deleteTask}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Post;
