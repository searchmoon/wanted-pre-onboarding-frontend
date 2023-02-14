import styled from '@emotion/styled';
import React, {useCallback, useEffect} from 'react';
import { useState } from 'react';
import axios from "axios";
import {SIGN_URL} from "../common/apiUrl";

/**
 *
 */
const TodoItem = ({ item, setDataList, dataList }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableText, setEditableText] = useState(item.todo);
	const [todoText, setTodoText] = useState(item.todo);
	const accessToken = localStorage.getItem('access_token');

	const handleChangeText = useCallback((e) => {
		setEditableText(e.target.value);
	}, [editableText])

	const handleActiveEdit = useCallback(() => {
		setIsEditing(!isEditing);
	}, []);

	const handleDoneEdit = useCallback(async(e) => {
		try {
			const response = await axios.put(`${SIGN_URL}/todos/${item.id}`, {
					todo: editableText,
					isCompleted: true,
				}
			,{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				}
			})
				// .then((response) => console.log('response', response));
			if (response.status === 200) {
				console.log('데이터 수정완료');
				setEditableText(editableText);
			}
		} catch {
			console.log('데이터 update error');
		}
		setIsEditing(!isEditing);
	}, [editableText, setIsEditing]);

	const handleDeleteList = useCallback(async (e) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`${SIGN_URL}/todos/${item.id}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					}
				}).then((response) => console.log('response', response));
			if (response.status === 204) {
				console.log('데이터 삭제완료');
				alert('todo가 삭제 되었습니다.');
			}
		} catch {
			console.log('데이터 delete error');
		}
		console.log('dataList', dataList);
		}, [setDataList]);


	const handleCancelEdit = useCallback(() => {
		setIsEditing(!isEditing);
		// setEditableText(todoText);
		setTodoText(item.todo);
	}, [isEditing, setTodoText]);

	// useEffect(() => {
	// 	handleCalcelEdit();
	// }, [])

	return (
		<TodoItemStyle>
			<label>
				<div className="wrap-todo">
					<div className={'todo-list'}>
						<input type="checkbox" className={'check-box'}/>
						{isEditing ? (
							<input
								onChange={handleChangeText}
								value={editableText}
								className={'edit-input'}
							/>
						) : (
							<span>{editableText}</span>
						)}
					</div>
					<div className="btn-box">
						{isEditing ? (
							<button onClick={handleDoneEdit}>제출</button>
						) : (
							<button onClick={handleActiveEdit} data-testid="modify-button">
								수정
							</button>
						)}
						{isEditing ? (
							<button onClick={handleCancelEdit}>취소</button>
						) : (
							<button data-testid="delete-button" onClick={handleDeleteList}>삭제</button>
						)}
					</div>
				</div>
			</label>
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
