import React, {useCallback, useEffect} from 'react';
import PlainBtn from "../components/plainBtn";
import {Link, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import {BASE_URL} from "../common/apiUrl";
import useFormData from "../hooks/useFormData";
import {useValidInputData} from "../hooks/useValidInputData";

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm, handleChange] = useFormData({
    email: '',
    password: '',
  });

  const isValid = useValidInputData(form);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, []);

  const handleDoneSignIn = useCallback(async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/auth/signin`,form,{
        headers:{
          'Content-Type': 'application/json',
        }
      });
      if(response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      if(response.status === 200){
        navigate('/todo');
        console.log('로그인 완료');
        alert('로그인이 완료되었습니다. todo 페이지로 이동합니다.')
      }
      setForm({
        email: '',
        password: '',
      })
    } catch {
      console.log('로그인 통신 error')
    }
  }, [form]);

  return (
    <SignInStyle>
      <p className={'title'}>로그인 페이지</p>
      <form className={'form'}>
        <label htmlFor={'email'}>이메일</label>
        <input
          id={'email'}
          name={'email'}
          type={'email'}
          data-testid={'email-input'}
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
