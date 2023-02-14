import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { SIGN_URL } from '../common/apiUrl';
import TodoList from '../components/TodoList';

/**
 *
 */
const Todo = () => {
	const [textInput, setTextInput] = useState('');
	const [dataList, setDataList] = useState([]);
	const accessToken = localStorage.getItem('access_token');

	const handleChangeTextInput = useCallback((e) => {
		setTextInput(e.target.value);
	},[setTextInput])


	const getTodo = useCallback(async () => {
		try {
			const response = await axios.get(`${SIGN_URL}/todos`,{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
				// .then((response) => setDataList(response.data));
			if (response.status === 200) {
				setDataList(response.data);
				console.log('받아왔다 데이떠');
			}
		} catch {
			console.log('getTodo 통신 error');
		}
	}, []);


	useEffect(() => {
		getTodo();
	}, []);

	//createTodo ( todo list 추가하기 )
	const handleAddList = useCallback(async (e) => {
			e.preventDefault();
		try {
			const response = await axios.post(`${SIGN_URL}/todos`, {
				todo: textInput
			},{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				}
			});
			console.log('dataList :', dataList);

			setDataList([
				...dataList,
				response.data,
			]);
			setTextInput('');

			if (response.status === 201) {
				console.log('데이떠 만들었다');
			}
		} catch {
			console.log('createTodo 통신 error');
		}
	},[setDataList, textInput]);
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
					data-testid="new-todo-add-button"
				>
					추가
				</button>
			</form>
			<hr />
			{dataList.map((item) => (
				<ul>
					<TodoList item={item} key={item.id} setDataList={setDataList} dataList={dataList}/>
				</ul>
			))}
		</TodoStyle>
	);
};

const TodoStyle = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Todo;
