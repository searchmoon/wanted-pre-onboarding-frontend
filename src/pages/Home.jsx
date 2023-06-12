import React, {useCallback} from 'react';

const Home = () => {
  const handleMoveSignIn = useCallback(() => {

  }, [])
  return (
    <HomeStyle>
      <PlainBtn onClick={handleMoveSignIn} title={'로그인 하기'} />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`

`
export default Home;
