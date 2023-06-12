import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GlobalStyle from "./styles/global";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/signin'} element={<SignIn/>}/>
          <Route path={'/signup'} element={<SignUp/>}/>
          <Route path={'/todo'} element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
