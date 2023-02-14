import React, { useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PlainBtn from '../components/PlainBtn';
import axios from 'axios';
import { useFormData } from '../hooks/useFormData';
import { SIGN_URL } from '../common/apiUrl';

/**
 *

 */
const SignUp = () => {
	const navigate = useNavigate();
	const [form, handleChange] = useFormData();


	const { email, password } = form;
	const isValidEmail = email.includes('@');
	const isValidPassword = password.length >= 8;


	useEffect(() => {
		if (localStorage.getItem('access_token')) {
			navigate('/todo');
		}
	}, []);

	const handleDoneSignUp = useCallback(
		async (e) => {
			e.preventDefault();
			try {
				const response = await axios.post(`${SIGN_URL}/auth/signup`, form, {
					headers: {'Content-Type': 'application/json'},
				});
				console.log('response', response);
				if (response.status === 201) {
					alert('회원가입이 완료되었습니다.');
					navigate('/signin');
				}
			} catch {
				console.log('통신 error');
			}
		}
		, [form]);

	return (
		<SignUpStyle>
			<p className={'title'}>회원가입 페이지</p>
			<form className={'form'}>
				<label htmlFor={'email'}>이메일</label>
				<input
					id={'email'}
					name={'email'}
					type={'email'}
					placeholder={'email'}
					onChange={handleChange}
					value={email}
					className={'basic-input'}
				/>
				<label htmlFor={'password'}>비밀번호</label>
				<input
					id={'password'}
					name={'password'}
					type={'password'}
					placeholder={'password'}
					onChange={handleChange}
					value={password}
					minLength={8}
					className={'basic-input'}
				/>
				<PlainBtn
					onClick={handleDoneSignUp}
					title={'회원가입 완료'}
					disabled={!(isValidEmail && isValidPassword)}
				/>
			</form>
		</SignUpStyle>
	);
};

const SignUpStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto 0;
	max-width: 500px;
	.title{
		font-size: 24px;
		margin-bottom: 10px;
	}
	.form {
		display: flex;
		flex-direction: column;
	}
`;

export default SignUp;
