import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, View } from "@tarojs/components";
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from "@tarojs/taro";
import { AtInput, AtToast } from "taro-ui";
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
  const { status, tipMsg } = userLogin;
  console.log(userLogin);

  // 可以使用所有的 React Hooks
  const [userNameState, setUserName] = useState<string>("13800010001");
  const [passWordState, setPassWord] = useState<string>("88888888");
  const [isValueState, setIsValue] = useState(false);
  const [toastTextState, setToastText] = useState("");

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
    let userName = e.detail.value.userName || "";
    let password = e.detail.value.password || "";

    if (!userName || !password) {
      setToastText("请输入账户和密码");
      setIsValue(!userName || !password);
      return;
    }
    const { dispatch } = props;
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
    setIsValue(false);
    setUserName(handleSpace(value));
  };
  const handlePWChange = value => {
    setIsValue(false);
    setPassWord(handleSpace(value));
  };
  // 去两端空格
  const handleSpace = value => {
    return value.replace(/(^\s*)|(\s*$)/g, "");
  };
  return (
    <View className="login">
      <Form onSubmit={e => formSubmit(e)} onReset={formReset}>
        <AtInput
          required
          name="userName"
          title="账号"
          type="text"
          placeholder="请输入用户名"
          value={userNameState}
          onChange={handleUserChange}
        />
        <AtInput
          required
          name="password"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value={passWordState}
          onChange={handlePWChange}
        />
        <Button formType="submit">提交</Button>
        <Button formType="reset">重置</Button>
      </Form>
      {isValueState && (
        <AtToast isOpened text={toastTextState} icon="error"></AtToast>
      )}
      {status === "error" && (
        <AtToast isOpened text={tipMsg} icon="error"></AtToast>
      )}
    </View>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))(Login);
