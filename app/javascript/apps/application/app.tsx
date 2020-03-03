import { IStyles } from '@/shared';
import { Layout, Menu } from 'antd';
import React from 'react';

const style: IStyles = {
  content: {
    background: '#fff',
    padding: '1rem',
  },
  footer: {
    textAlign: 'center',
  },
  menu: {
    lineHeight: 'inherit',
  },
  page: {
    minHeight: 'calc(100vh - 64px)',
    padding: '1rem',
  },
};

export default function App(_props: any) {
  return (
    <Layout>
      <Layout.Header>
        <Menu style={style.menu} theme='dark' mode='horizontal'>
          <Menu.Item key='home'>Home</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout style={style.page}>
        <Layout.Content style={style.content}>
          hello world from antd.
        </Layout.Content>
        <Layout.Footer style={style.footer}>
          Payin created by an-lee
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
