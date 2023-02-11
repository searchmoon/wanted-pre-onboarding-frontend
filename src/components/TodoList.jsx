import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useState } from 'react';

/**
 *
 */
const TodoList = ({ item }) => {
	const [isEditing, setIsEditing] = useState(false);
	// const [todoText, setTodoText] = useState('');

	const handleActiveEdit = useCallback(() => {
		setIsEditing(!isEditing);
	}, []);
	const handleDoneEdit = useCallback(() => {
		setIsEditing(!isEditing);
	}, []);
	return (
		<TodoListStyle>
			<label>
				<input type="checkbox" />
				{isEditing ? (
					<input
						// onChange={(e) => setTodoText(e.target.value)}
						value={item.value}
					/>
				) : (
					<span>{item.value}</span>
				)}

				{isEditing ? (
					<button onClick={handleDoneEdit}>제출</button>
				) : (
					<button onClick={handleActiveEdit} data-testid="modify-button">
						수정
					</button>
				)}
				<button data-testid="delete-button">삭제</button>
			</label>
		</TodoListStyle>
	);
};

const TodoListStyle = styled.li``;

export default TodoList;
