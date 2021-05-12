import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Text, Form, Input, Image, View } from "@tarojs/components";
import {
  useReady,
  useDidShow,
  useDidHide,
  usePullDownRefresh
} from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { AtToast } from "taro-ui";
import { LoginStateType } from "../../models/login";
import { ConnectState } from "../../models/connect";
import { getTimestamp } from "../../utils/utils";
import { ILogin } from "../../res-req";
import "./login.less";

type LoginProps = {
  dispatch: Dispatch<{ type: string; payload: ILogin }>;
  userLogin: LoginStateType;
  submitting?: boolean;
};

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  const { status, tipMsg } = userLogin;
  // 可以使用所有的 React Hooks
  const [userNameState, setUserName] = useState<string>("13800010001");
  const [passWordState, setPassWord] = useState<string>("88888888");
  const [isValueState, setIsValue] = useState(false);
  const [toastTextState, setToastText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    console.log(e.detail);
    // let userName = e.detail.value.userName || "";
    // let password = e.detail.value.password || "";

    if (!userNameState || !passWordState) {
      setToastText("请输入账户和密码");
      setIsValue(!userNameState || !passWordState);
      return;
    }
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: "login/login",
        payload: {
          userName: userNameState,
          password: passWordState,
          t: getTimestamp()
        }
      });
    }
  };
  const handleUserChange = e => {
    setIsValue(false);
    setUserName(handleSpace(e.detail.value));
  };
  const handlePWChange = e => {
    setIsValue(false);
    setPassWord(handleSpace(e.detail.value));
  };
  // 去两端空格
  const handleSpace = value => {
    return value.replace(/(^\s*)|(\s*$)/g, "");
  };

  return (
    <View className="login">
      <Text className="title">登录</Text>
      <Form onSubmit={e => formSubmit(e)}>
        <View className="login-form">
          <View className="input-container">
            <Input
              type="text"
              className="input"
              onInput={handleUserChange}
              value={userNameState}
              placeholder="请输入用户名"
            />
          </View>
          <View className="input-container">
            <Input
              type={showPassword ? "text" : "password"}
              onInput={handlePWChange}
              className="input"
              value={passWordState}
              placeholder="请输入密码"
            />
            <Image
              src={
                showPassword
                  ? "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/eye-active.png"
                  : "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/eye.png"
              }
              className="input-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>
        <Button formType="submit" className="login-button">
          登录
        </Button>
      </Form>
      {isValueState && (
        <AtToast isOpened text={toastTextState} icon="error"></AtToast>
      )}
      {/* {status === "error" && !submitting && (
        <AtToast isOpened text={tipMsg} icon="error"></AtToast>
      )} */}
    </View>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))(Login);
