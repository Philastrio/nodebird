import React, { useState, useCallback, memo } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import TextInput from "../component/TextInput";

const Singup = () => {
  /* const [id, setId] = useState(""); 일일이 이렇게 만들수도 있지만 커스텀 훅을 사용할 수 있따 */
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");

  const [id, onChangeId] = useInput("");
  const [nick, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      console.log({
        id,
        nick,
        password,
        passwordCheck,
        term
      });
    },
    [password, passwordCheck, term]
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
          <TextInput value={id} onChange={onChangeId} />
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
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Singup;
