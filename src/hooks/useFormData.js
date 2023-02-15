import {useCallback, useMemo, useState} from 'react';


/**
 * form 형태의 state 를 가질 때, input 요소들의 값 변경시 form state 를 변경해주는 callback 을 리턴하는 hook
 * @param form
 * @param setForm
 * @returns {(function(*): void)|*}
 */
export const useFormData = (initialValue) => {

	const [form, setForm] = useState(initialValue);

	const handleChange = useCallback(
		(e) => {
			const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
			const nextForm = {
				...form,
				[e.target.name]: value,
			};
			setForm(nextForm);
		},
		[form],
	);



	return [form, handleChange, setForm];
};
