import React, {useCallback, useEffect, useMemo} from 'react';
import PlainBtn from "../components/plainBtn";
import styled from "@emotion/styled";
import axios from "axios";
import {BASE_URL} from "../common/apiUrl";
import {useNavigate} from "react-router-dom";
import useFormData from "../hooks/useFormData";
import {useValidInputData} from "../hooks/useValidInputData";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, handleChange] = useFormData({
    email: '',
    password: '',
  });

  const isValid = useValidInputData(form);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, []);

  const handleDoneSignUp = useCallback(async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/auth/signup`,form,{
        headers:{
          'Content-Type': 'application/json',
        }
      });
      if(response.status === 201){
        navigate('/signin');
        console.log('회원가입 완료');
        alert('회원가입이 완료되었습니다. signin 페이지로 이동합니다.');
      }
    } catch {
      console.log('회원가입 통신 error')
    }
  }, [form]);

  return (
    <SignUpStyle>
      <p className={'title'}>회원가입 페이지</p>
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
        <PlainBtn
          onClick={handleDoneSignUp}
          data-testid={'signup-button'}
          title={'회원가입'}
          disabled={!isValid}
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

