import React, {useCallback, useState} from 'react';

const useFormData = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  const handleChange = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      const nextForm = {
        ...form,
        [e.target.name]: value,
      };
      setForm(nextForm);
      console.log(e.target.name,value);
    }, [form]);

  return [form, setForm, handleChange];
};

export default useFormData;
