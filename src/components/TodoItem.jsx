import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../common/apiUrl";
import styled from "@emotion/styled";
import useFormData from "../hooks/useFormData";

const TodoItem = ({item, setTodoList, todoList}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(item.todo);
  const accessToken = localStorage.getItem('access_token');

  const [form, setForm, handleChange] = useFormData({
    todo: item.todo,
    isCompleted: item.isCompleted
  });

  const handleActiveEdit = useCallback(() => {
    setTempText(form.todo);
    setIsEditing(prev => !prev);
  }, [form.todo]);

  const handleDoneEdit = useCallback(async(e) => {
    e?.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/todos/${item.id}`, {
          todo: form.todo,
          isCompleted: form.isCompleted,
        }
        ,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        })

      if (response.status === 200) {
        console.log('데이터 수정완료');
        setIsEditing(false);
      }
    } catch {
      console.log('데이터 update error');
    }
  }, [form.todo, form.isCompleted, setIsEditing]);

  useEffect(() => {
    handleDoneEdit();
  }, [form.isCompleted]);

  const handleDeleteList = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${BASE_URL}/todos/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
      if (response.status === 204) {
        console.log('데이터 삭제완료');
        alert('todo 목록이 삭제 되었습니다.');
        window.location.reload();
      }
    } catch {
      console.log('데이터 delete error');
    }
  }, [todoList, setTodoList]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(!isEditing);
    setForm(prev => ({
      ...prev,
      todo: tempText
    }));
  }, [isEditing, tempText]);

  return (
    <TodoItemStyle>
      <div className="wrap-todo">
        <div className={'todo-list'}>
          <input type="checkbox" className={'check-box'}
                 name={'isCompleted'}
                 checked={form.isCompleted} onChange={handleChange} />
          {isEditing ? (
            <input
              onChange={handleChange}
              value={form.todo}
              name={'todo'}
              className={'edit-input'}
              data-testid="modify-input"
            />
          ) : (
            <span>{form.todo}</span>
          )}
        </div>
        <div className="btn-box">
          {isEditing ? (
            <button onClick={handleDoneEdit} data-testid="submit-button">제출</button>
          ) : (
            <button onClick={handleActiveEdit} data-testid="modify-button">
              수정
            </button>
          )}
          {isEditing ? (
            <button onClick={handleCancelEdit} data-testid="cancel-button">취소</button>
          ) : (
            <button data-testid="delete-button" onClick={handleDeleteList}>삭제</button>
          )}
        </div>
      </div>
    </TodoItemStyle>
  );
};

const TodoItemStyle = styled.li`
	display: flex;
	width: 100%;
	max-width: 360px;
	.wrap-todo{
		display: flex;
		min-width: 360px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid darkgrey;
		padding: 10px 0;
		.todo-list{

			.check-box{
				margin-right: 6px;
			}
			.edit-input{
				border: none;
				font-size: 16px;
				background-color: #eee;
				padding: 5px 10px 5px 5px;
				border-radius: 4px;
				width: 200px;
			}
		}
		.btn-box{
			display: flex;
			gap: 5px;
			min-width: 92px;
			button{
				padding: 5px 10px;
			}
		}
	}
`;

export default TodoItem;
