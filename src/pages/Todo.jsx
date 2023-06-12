import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../common/apiUrl";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import styled from "@emotion/styled";

const Todo = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/signin');
    }
  }, []);

  //getTodo
  const getTodo = async() => {
    try{
      const response = await axios.get(`${BASE_URL}/todos`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(response.status === 200){
        console.log('todo 데이터 받아옴!');
        setTodoList([...response.data]);
      }
    }catch{
      console.log('getTodos error!!')
    }
  };

  useEffect(() => {
    getTodo();
  }, []);



  const handleChangeInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, [inputValue]);

  //createTodo
  const handleAddBtnClick = useCallback(async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/todos`, {
        todo: inputValue
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      console.log(response.data);
      if(response.status === 201){
        setTodoList(prev => [...prev, response.data]);
        setInputValue('');
      }
    } catch {
      console.log('createTodo 통신 error');
    }

  }, [inputValue, todoList]);

  return (
    <TodoStyle>
      <form className={'form'}>
        <input
          data-testid="new-todo-input"
          placeholder={'to-do'}
          onChange={handleChangeInput}
          value={inputValue}
          className={'basic-input'}
        />
        <button
          onClick={handleAddBtnClick}
          className={'add-btn'}
          data-testid="new-todo-add-button"
        >
          추가
        </button>
      </form>
      {todoList.map((item) => (
        <TodoItem item={item} key={item.id} setTodoList={setTodoList} todoList={todoList}/>
      ))}
    </TodoStyle>
  );
};


const TodoStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto 0;
	width: 100%;
	max-width: 400px;
	button{
		border: none;
		border-radius: 4px;
	}
	.form{
		display: flex;
		width: 100%;
		gap: 10px;
		.add-btn{
			min-width: 50px;
			display: inline-block;
			height: 36px;
			margin-top: 6px;
			background-color: teal;
			color: #fff;
		}
	}
`;


export default Todo;
