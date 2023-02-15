import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { SIGN_URL } from '../common/apiUrl';
import TodoItem from '../components/TodoItem';

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
			if (response.status === 200) {
				setDataList(response.data);
				console.log('get data 완료');
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
			if (response.status === 201) {
				console.log('data update 완료');
				setDataList(prev => [
					...prev,
					response.data
				]);
				setTextInput('');
			}
		} catch {
			console.log('createTodo 통신 error');
		}
	},[setDataList, textInput]);
	return (
		<TodoStyle>
			<form className={'form'}>
				<input
					data-testid="new-todo-input"
					placeholder={'to-do'}
					onChange={handleChangeTextInput}
					value={textInput}
					className={'basic-input'}
				/>
				<button
					onClick={handleAddList}
					className={'add-btn'}
					data-testid="new-todo-add-button"
				>
					추가
				</button>
			</form>
			<hr />
			<ul>
				{dataList.map((item) => (
					<TodoItem item={item} key={item.id} setDataList={setDataList} dataList={dataList}/>
				))}
			</ul>
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
