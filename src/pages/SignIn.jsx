import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import PlainBtn from '../components/PlainBtn';
import axios from 'axios';
import { useFormData } from '../hooks/useFormData';
import { SIGN_URL } from '../common/apiUrl';

/**
 * 1,2,3,4
 */
const SignIn = () => {
	const navigate = useNavigate()

	const [form, setForm, handleChange] = useFormData();

	const { email, password } = form;
	const isValidEmail = email.includes('@');
	const isValidPassword = password.length >= 8;

	useEffect(() => {
		if (localStorage.getItem('access_token')) {
			navigate('/todo');
		}
	}, []);

	const handleDoneSignIn = useCallback(
		async (e) => {
			alert('서브밋 버튼 눌림');
			e.preventDefault();
			try {
				console.log('form : ', form);
				const response = await axios.post(`${SIGN_URL}/auth/signin`, form, {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				console.log('response :' , response);
				if (response.data.access_token) {
					localStorage.setItem('access_token', response.data.access_token);
				}
				if (response.status === 200) {
					navigate('/todo');
				}
			} catch {
				console.log('통신 error');
			}
		},
		[form],
	);

	return (
		<SignInStyle>
			<p>로그인 하기??</p>
			<form className={'form'}>
				<label htmlFor={'email'}>이메일</label>
				<input
					id={'email'}
					name={'email'}
					type={'email'}
					data-testid="email-input"
					placeholder={'email'}
					onChange={handleChange}
					value={email}
				/>
				<label htmlFor={'password'}>비밀번호</label>
				<input
					id={'password'}
					name={'password'}
					type={'password'}
					data-testid={'password-input'}
					placeholder={'password'}
					onChange={handleChange}
					value={password}
					minLength={8}
				/>
				<div>
					<PlainBtn
						data-testid={'signin-button'}
						onClick={handleDoneSignIn}
						title={'로그인'}
						type={'button'}
						disabled={!(isValidEmail && isValidPassword)}
					/>
					<Link
						to={'/signup'}
						className={'goto-signup'}
						data-testid={'signup-button'}
					>
						회원가입 하기
					</Link>
				</div>
			</form>
		</SignInStyle>
	);
};

const SignInStyle = styled.div`
	display: flex;
	flex-direction: column;
	.form {
		display: flex;
		flex-direction: column;
	}
	.goto-signup {
		text-decoration: underline;
	}
`;

export default SignIn;
