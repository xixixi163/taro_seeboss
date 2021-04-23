import Taro from "@tarojs/taro";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { Form, Button } from "@tarojs/components";
import { useState } from "react";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/input.scss";

const User: Taro.FC = () => {
  const [value, setValue] = useState("");

  const handleChange = value => {
    setValue(value);
    return value;
  };

  const onSubmit = event => {
    console.log(event);
  };

  const onReset = event => {
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} onReset={onReset}>
      <AtInput
        name="value"
        title="文本"
        type="text"
        placeholder="单行文本"
        value={value}
        onChange={handleChange}
      />
      <Button formType="submit">提交</Button>
      <Button formType="reset">重置</Button>
    </Form>
  );
};

export default User;
