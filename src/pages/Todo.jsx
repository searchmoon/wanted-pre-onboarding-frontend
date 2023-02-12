import React, {useCallback, useEffect, useState} from 'react';
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

	const createTodo = async () => {
		try {
			const response = await axios.post(`${SIGN_URL}/todos`, addList,{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				}
			}).then((response) => console.log('response', response));
			if (response.status === 201) {
				console.log('데이떠 만들었다');
				// console.log('response', JSON.parse(response));
			}
		} catch {
			console.log('통신 error');
		}
	}
	const handleChangeTextInput = useCallback((e) => {
		setTextInput(e.target.value);
	},[setTextInput])

	const handleAddList = useCallback((e) => {
			e.preventDefault();
			setAddList([...addList, {
				todo: e.target.value,
			}]);
			setTextInput('');
		},[setAddList]
	);

	const getTodo = async () => {
		try {
			const response = await axios.get(`${SIGN_URL}/todos`,{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}).then((response) => console.log('response', response));
			if (response.status === 200) {
				console.log('받아왔다 데이떠');
				// console.log('response', JSON.parse(response));
			}
		} catch {
			console.log('통신 error');
		}
	}
		//
		// useEffect(() => {
		// 	getTodo();
		// }, []);

	console.log('addList', addList);
	console.log('textInput', textInput);

	return (
		<TodoStyle>
			<form>
				<input
					data-testid="new-todo-input"
					placeholder={'to-do'}
					onChange={handleChangeTextInput}
					value={textInput}
				/>
				<button
					onClick={handleAddList}
					data-testid="new-todo-add-button">
					추가
				</button>
			</form>
			{/*{addList.map((item) => (*/}
			{/*	<TodoList item={item} key={item.id} />*/}
			{/*))}*/}
		</TodoStyle>
	);
};

const TodoStyle = styled.div`
	display: flex;
`;

export default Todo;
