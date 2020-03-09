import { AdminLogin } from '@/graphql/admin';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Input, Layout, message } from 'antd';
import React from 'react';
import './login.less';

const { Content } = Layout;

export function Login(_props: any) {
  const [login, { loading }] = useMutation(AdminLogin, {
    update(_proxy, { data }) {
      if (data && data.adminLogin && data.adminLogin.msg === 'fail') {
        message.error('出错了，请重试');
      } else {
        window.location.href = '/admin';
      }
    },
  });

  return (
    <Layout className='layout'>
      <Content className='login-page-main'>
        <Form
          onFinish={(values: any) => {
            login({ variables: { input: values } });
          }}
          className='login-form'
        >
          <Form.Item
            name='name'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={
                <ClockCircleOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
