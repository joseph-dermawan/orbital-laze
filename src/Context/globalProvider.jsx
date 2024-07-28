import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/helper/supabaseClient';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   // Fetch current user from Supabase
  //   const getUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     setCurrentUser(user);
  //   };
  //   getUser();
  // }, []);

  const openModal = () => setModal(true);
  
  const closeModal = () => setModal(false);
  
  const deleteTask = async (id) => {
    await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const updateTask = async (updatedTask) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', updatedTask.id);
    if (error) console.error(error);
    else setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('uploader_id', currentUser.id);
    if (error) console.error(error);
    else setTasks(data);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  return (
    <GlobalStateContext.Provider value={{ tasks, setTasks, modal, openModal, closeModal, deleteTask, updateTask, currentUser, setCurrentUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
  