import React from 'react';
import styled from '@emotion/styled';

/**
 *
 */
const PlainBtn = ({ title, disabled }) => {
	return (
		<PlainBtnStyle disabled={disabled}>
			{title}
		</PlainBtnStyle>
	);
};

const PlainBtnStyle = styled.button`
	min-width: 350px;
	height: 50px;
	color: white;
	background-color: teal;
	border-radius: 8px;
	border: none;
	background-color: ${(props) => (props.disabled ? 'gray' : 'teal')};
`;

export default PlainBtn;
