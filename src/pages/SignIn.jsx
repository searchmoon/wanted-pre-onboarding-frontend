import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import PlainBtn from '../components/PlainBtn';
import axios from 'axios';
import { useFormData } from '../hooks/useFormData';
import { SIGN_URL } from '../common/apiUrl';

/**
 *
 */
const SignIn = () => {
	const navigate = useNavigate();

	const [form, handleChange, isValid] = useFormData();


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
					console.log('로그인이 완료되었습니다.')
				}
			} catch {
				console.log('통신 error');
			}
		},
		[form],
	);

	return (
		<SignInStyle>
			<p className={'title'}>로그인 페이지</p>
			<form className={'form'}>
				<label htmlFor={'email'}>이메일</label>
				<input
					id={'email'}
					name={'email'}
					type={'email'}
					data-testid="email-input"
					placeholder={'email'}
					onChange={handleChange}
					value={form.email}
					className={'basic-input'}
				/>
				<label htmlFor={'password'}>비밀번호</label>
				<input
					id={'password'}
					name={'password'}
					type={'password'}
					data-testid={'password-input'}
					placeholder={'password'}
					onChange={handleChange}
					value={form.password}
					minLength={8}
					className={'basic-input'}
				/>
				<div>
					<PlainBtn
						data-testid={'signin-button'}
						onClick={handleDoneSignIn}
						title={'로그인'}
						type={'button'}
						disabled={!isValid}
					/>
				</div>
				<Link
					to={'/signup'}
					className={'goto-signup'}
					data-testid={'signup-button'}
				>
					회원가입 하기
				</Link>
			</form>
		</SignInStyle>
	);
};

const SignInStyle = styled.div`
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
	.goto-signup {
		text-decoration: underline;
		margin-top: 10px;
		text-align: right;
	}
`;

export default SignIn;
