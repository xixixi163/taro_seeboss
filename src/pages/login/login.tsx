import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, View } from "@tarojs/components";
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from "@tarojs/taro";
import { AtInput } from "taro-ui";
import { LoginStateType } from "../../models/login";
import { LoginParamsType } from "../../services/login";
import { ConnectState } from "../../models/connect";
import { getTimestamp } from "../../utils/utils";

type LoginProps = {
  dispatch: Dispatch<{ type: string; payload: any }>;
  userLogin: LoginStateType;
  submitting?: boolean;
};

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  console.log(props);

  // 可以使用所有的 React Hooks
  const [userNameState, setUserName] = useState<string>("");
  const [passWordState, setPassWord] = useState<string>("");

  useEffect(() => {});

  // 对应 onReady
  useReady(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Taro 文档】-> 【进阶指南】->【Hooks】
  usePullDownRefresh(() => {});

  const formSubmit = e => {
    const { dispatch } = props;
    console.log(e);
    if (dispatch) {
      dispatch({
        type: "login/login",
        payload: { ...e.detail.value, t: getTimestamp() }
      });
    }
  };
  const formReset = () => {
    setUserName("");
    setPassWord("");
  };
  const handleUserChange = value => {
    setUserName(value);
  };
  const handlePWChange = e => {
    setPassWord(e);
  };
  return (
    <View className="login">
      <Form onSubmit={formSubmit.bind(this)} onReset={formReset.bind(this)}>
        <AtInput
          required
          name="userName"
          title="账号"
          type="text"
          placeholder="请输入用户名"
          value={userNameState}
          onChange={handleUserChange.bind(this)}
        />
        <AtInput
          required
          name="password"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value={passWordState}
          onChange={handlePWChange.bind(this)}
        />
        <Button formType="submit">提交</Button>
        <Button formType="reset">重置</Button>
      </Form>
    </View>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))(Login);
