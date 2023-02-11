import React from 'react';
import { Global, css } from '@emotion/react';
import reset from 'styled-reset';

const style = css`
	${reset};
	html {
		font-size: 16px;
	}
	body {
		font-family: 'Noto Sans KR', sans-serif;
	}
	* {
		box-sizing: border-box;
	}
	button {
		cursor: pointer;
	}
	ol,
	ul,
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}
`;

const GlobalStyle = () => {
	return <Global styles={style} />;
};

export default GlobalStyle;
