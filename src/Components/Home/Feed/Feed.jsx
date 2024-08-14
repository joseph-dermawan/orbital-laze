import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/helper/supabaseClient';
import Post from '../Post/Post';
import './Feed.css';

const Feed = ({ fetchPosts }) => {
  const [feed, setFeed] = useState([]);
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
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*');

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setFeed(data);
      }
    };

    fetchPosts();
  }, []);

  const userFeed = feed.filter(post => post.author !== userId);

  return (
    <div className="tasks-grid">
      {userFeed.map((post) => (
        <Post key={post.id} post={post} fetchPosts={fetchPosts} />
      ))}
    </div>
  );
};

export default Feed;

