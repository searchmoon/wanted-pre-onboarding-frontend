import styled from '@emotion/styled';
import React, {useCallback, useEffect} from 'react';
import { useState } from 'react';
import axios from "axios";
import {SIGN_URL} from "../common/apiUrl";

/**
 *
 */
const TodoList = ({ item, setDataList, dataList }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [todoText, setTodoText] = useState(item.todo);
	const accessToken = localStorage.getItem('access_token');

	const handleChangeText = useCallback((e) => {
		setTodoText(e.target.value);
	}, [todoText])

	const handleActiveEdit = useCallback(() => {
		setIsEditing(!isEditing);
	}, []);

	const handleDoneEdit = useCallback(async(e) => {
		console.log('item.id', item.id);
		console.log('item.todo', item.todo);
		console.log('item', item);
		try {
			const response = await axios.put(`${SIGN_URL}/todos/${item.id}`, {
					todo: todoText,
					isCompleted: true,
				}
			,{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				}
			}).then((response) => console.log('response', response));
			if (response.status === 200) {
				console.log('데이터 수정완료');
			}
		} catch {
			console.log('데이터 update error');
		}
		setIsEditing(!isEditing);
	}, [todoText, setIsEditing]);

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
			}
		} catch {
			console.log('데이터 delete error');
		}
		console.log('dataList', dataList);
		}, [setDataList]);

	useEffect(() => {
	}, [dataList])

	return (
		<TodoListStyle>
			<label>
				<input type="checkbox" />
				{isEditing ? (
					<input
						onChange={handleChangeText}
						value={todoText}
					/>
				) : (
					<span>{todoText}</span>
				)}

				{isEditing ? (
					<button onClick={handleDoneEdit}>제출</button>
				) : (
					<button onClick={handleActiveEdit} data-testid="modify-button">
						수정
					</button>
				)}
				{isEditing ? (
					<button onClick={() => setIsEditing(!isEditing)}>취소</button>
				) : (
					<button data-testid="delete-button" onClick={handleDeleteList}>삭제</button>
				)}


			</label>
		</TodoListStyle>
	);
};

const TodoListStyle = styled.li`
	
`;

export default TodoList;
