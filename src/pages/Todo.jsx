import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/signin');
    }
  }, []);

  return (
    <div>

    </div>
  );
};

export default Todo;
