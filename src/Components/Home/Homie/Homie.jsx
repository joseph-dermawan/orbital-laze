import React, { useState, useEffect } from 'react';
import {useNavigate, Routes, Route } from 'react-router-dom'
import { supabase } from '../../../lib/helper/supabaseClient'
import Sidebar from '../Sidebar/sidebar'
import Feed from "../Feed/Feed"
import Postform from '../Postform/Postform';
import './Homie.css'

const Homie = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*');

        if (error) {
            console.error('Error fetching tasks:', error);
          } else {
            setPosts(data);
          }
    };

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
        fetchPosts();
        infoRetrieval();
      }, []);

    return (
        <div className='homie'>
            <div className='sidebar'><Sidebar /></div>
            <div className='homiett'>
                <div className='welcome'>
                    <h1>Welcome {name}</h1>
                </div>
                <div className='form'><Postform fetchPosts={fetchPosts}/></div>
                <div className='feed'>
                    <Feed fetchPosts={fetchPosts} />
                </div>
            </div>
        </div>
    )
}

export default Homie

