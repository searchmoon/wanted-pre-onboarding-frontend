import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { SIGN_URL } from '../common/apiUrl';
// import TodoList from '../components/TodoList';

/**
 *
 */
const Todo = () => {
	const [textInput, setTextInput] = useState('');
	const [addList, setAddList] = useState([]);
	const accessToken = localStorage.getItem('access_token');
	const handleAddList = useCallback(
		async (e) => {
			e.preventDefault();
			try {
				const response = await axios.post(`${SIGN_URL}/todos`, addList, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				});
				setAddList(...addList, textInput);
			} catch {
				console.log('todo 통신 error');
			}

			// setTextInput('');
		},
		[setAddList],
	);

	console.log('addList', addList);
	return (
		<TodoStyle>
			<form>
				<input
					data-testid="new-todo-input"
					placeholder={'to-do'}
					onChange={(e) => setTextInput(e.target.value)}
					value={textInput}
				/>
				<button onClick={handleAddList} data-testid="new-todo-add-button">
					추가
				</button>
			</form>
			{/*{addList.map((item) => (*/}
			{/*	<TodoList item={item} key={item.id} />*/}
			{/*))}*/}
		</TodoStyle>
	);
};

const TodoStyle = styled.div``;

export default Todo;
