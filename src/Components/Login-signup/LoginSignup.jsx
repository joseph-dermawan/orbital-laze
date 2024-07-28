import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import './LoginSignup.css'
import { supabase } from '../../lib/helper/supabaseClient';

import user_icon from '../Assets/user.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/padlock.png'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (action === "Sign Up") {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username,
              }
            }
          });
          if (error) console.error('Sign Up Error:', error);
          else {
            console.log('Sign Up Data:', data);
            navigate("/home");
          }
        } else if (action === "Login") {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) console.error('Login Error:', error);
          else {
              console.log('Login Data:', data);
              navigate("/home");
          }
        }
      };
    
      return (
        <div className='container'>
          <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
          </div>
          <div className='inputs'>
            {action === "Login" ? <div></div> : <div className='input'>
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='Name'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>}
            <div className='input'>
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input'>
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='submit-container'>
            <div className={action === "Login" ? 'submit gray' : "submit"}
                onClick={() => {
                    setAction("Sign Up");
                    handleSubmit("Sign Up");
                }}>Sign Up</div>
                <div className={action === "Sign Up" ? 'submit gray' : "submit"}
                onClick={() => {
                    setAction("Login");
                    handleSubmit("Login");
                }}>Login</div>
            </div>
        </div>
      );
    };
    
export default LoginSignup;