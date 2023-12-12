import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "./Spinner";

// 컴포넌트의 이름은 대문자로 시작해야 합니다.
const Kakao = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  // useEffect 내부에서 비동기 작업을 수행하려면, 내부 함수를 선언해야 합니다.
  React.useEffect(() => {
    const login = async () => {
      await dispatch(userActions.kakaoLogin(code));
    };

    login();
  }, [dispatch, code]); // 의존성 배열에 dispatch와 code를 추가합니다.

  return <Spinner />;
};

export default Kakao; // 수정된 컴포넌트 이름으로 export합니다.