import { Login } from '@/admin/pages';
import { AdminLogout } from '@/graphql/admin';
import { apolloClient, IStyles } from '@/shared';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
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

export function AppLayout(props: any) {
  const [logout] = useMutation(AdminLogout, {
    update(_proxy, {}) {
      location.href = '/admin/login';
    },
  });
  return (
    <React.Fragment>
      {props.currentAdmin ? (
        <Layout>
          <Layout.Header>
            <Menu style={style.menu} theme='dark' mode='horizontal'>
              <Menu.Item key='home'>Home</Menu.Item>
              <Menu.Item
                key='logout'
                onClick={() => logout({ variables: { input: {} } })}
              >
                Logout
              </Menu.Item>
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
        <Login />
      )}
    </React.Fragment>
  );
}

export default function App(props: any) {
  return (
    <ApolloProvider client={apolloClient('/admin')}>
      <AppLayout {...props} />
    </ApolloProvider>
  );
}
