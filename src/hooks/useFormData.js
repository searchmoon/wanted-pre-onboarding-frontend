import {useCallback, useMemo, useState} from 'react';


/**
 * form 형태의 state 를 가질 때, input 요소들의 값 변경시 form state 를 변경해주는 callback 을 리턴하는 hook
 * @param form
 * @param setForm
 * @returns {(function(*): void)|*}
 */
export const useFormData = () => {

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = useCallback(
		(e) => {
			const nextForm = {
				...form,
				[e.target.name]: e.target.value,
			};
			setForm(nextForm);
		},
		[form],
	);


	const isValid = useMemo(()=>{
		const isValidEmail = form.email.includes('@');
		const isValidPassword = form.password.length >= 8;
		return (isValidEmail && isValidPassword)
	}, [form.email, form.password]);

	return [form, handleChange, isValid];
};
