import React, {useMemo} from 'react';

export function useValidInputData(form) {
  const isValid = useMemo(()=>{
    const isValidEmail = form.email?.includes('@');
    const isValidPassword = form.password?.length >= 8;
    return (isValidEmail && isValidPassword);
  }, [form.email, form.password]);
  return isValid;
};
