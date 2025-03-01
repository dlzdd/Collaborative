"use client";
import { Button, Form, FormProps, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
};

export default function page() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { password, email } = values;
    try {
      const response = await fetch("http://localhost:3001/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/");
      }

      const data = await response.json(); // 将响应解析为 JSON
      console.log(data, "1111"); // 输出解析后的 JSON 数据
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
      console.error("请求失败:", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}
