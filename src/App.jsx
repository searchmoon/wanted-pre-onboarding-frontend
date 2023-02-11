import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/global';
import { ThemeProvider } from '@emotion/react';
import SignUp from './pages/SignUp';
import theme from './styles/theme';
import Home from './pages/Home';
import Todo from './pages/Todo';
import SignIn from './pages/SignIn';

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Routes>
					<Route path={'/'} element={<Home />} />
					<Route path={'/signup'} element={<SignUp />} />
					<Route path={'/signin'} element={<SignIn />} />
					<Route path={'/todo'} element={<Todo />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
