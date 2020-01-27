import React, { useState, useCallback, memo, useEffect } from "react";
import { Form, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import TextInput from "../component/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";

const Singup = () => {
  /* const [id, setId] = useState(""); 일일이 이렇게 만들수도 있지만 커스텀 훅을 사용할 수 있따 */
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");

  const [id, onChangeId] = useInput("");
  const [nick, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.UserReducer);
  /* 일반적으로 폼은 리액트 state를 쓰고, 
  리덕스는 이걸 모아서 한꺼번에 보내줄때 쓴다. 
  서버랑 통신하거나 여러컴포넌트가 같이 쓰는 컴포넌트는 리덕스를 쓴다*/
  useEffect(() => {
    if (me) {
      alert("로그인 했으니, 메인페이지로 이동합니다. ");
      Router.push("/");
    }
  }, [me && me.id]); // useEffect

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          userId: id,
          password,
          nickname: nick
        }
      });
    },
    [id, nick, password, passwordCheck, term]
  );
  /*   const onChangeId = e => {
    setId(e.target.value);
  }; */
  /*   const onChangeNick = e => {
    setNick(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };*/
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 30 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <TextInput name="user-id" value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <TextInput
            name="user-nick"
            value={nick}
            required
            onChange={onChangeNick}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <TextInput
            name="user-password"
            type="password"
            required
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-pass-chk">비밀번호 확인</label>
          <br />
          <TextInput
            name="user-pass-chk"
            type="password"
            required
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            이하 약관에 동의합니다
          </Checkbox>
          {termError && (
            <div style={{ color: "red" }}>약관에 동의하셔야 합니다</div>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Singup;
