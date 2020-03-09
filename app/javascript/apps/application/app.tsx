import { apolloClient, IStyles } from '@/shared';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout, Menu, Result, Button } from 'antd';
import React from 'react';

const style: IStyles = {
  content: {
    background: '#fff',
    padding: '1rem',
  },
  footer: {
    textAlign: 'center',
  },
  header: {
    background: '#fff',
  },
  menu: {
    lineHeight: 'inherit',
  },
  page: {
    minHeight: 'calc(100vh - 64px)',
    padding: '1rem',
  },
};

interface IProps {
  currentUser?: {
    mixinUuid: string;
    mixinId: string;
    name: string;
    avatar: string;
  };
}

export default function App(props: IProps) {
  const { currentUser } = props;
  return (
    <ApolloProvider client={apolloClient()}>
      {currentUser ? (
        <Layout>
          <Layout.Header style={style.header}>
            <Menu
              style={style.menu}
              defaultSelectedKeys={['home']}
              mode='horizontal'
            >
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
      ) : (
        <Result
          title='Please login.'
        extra={<Button type='primary' href='/login'>Log In</Button>}
        />
      )}
    </ApolloProvider>
  );
}
