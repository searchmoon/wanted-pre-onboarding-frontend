import React, {useCallback, useEffect} from 'react';
import styled from "@emotion/styled";
import PlainBtn from "../components/plainBtn";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleMoveSignIn = useCallback(() => {
    navigate('/signin');
  }, []);
  return (
    <HomeStyle>
      <PlainBtn onClick={handleMoveSignIn} title={'로그인 하기'} />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`
export default Home;
