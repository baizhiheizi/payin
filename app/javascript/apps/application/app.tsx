import { Account, AccountList, AccountNew } from '@/application/pages';
import { apolloClient, IStyles } from '@/shared';
import { ApolloProvider } from '@apollo/react-hooks';
import { Button, Layout, Menu, Result } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        <Router>
          <Layout>
            <Layout.Header style={style.header}>
              <Menu
                style={style.menu}
                defaultSelectedKeys={['home']}
                mode='horizontal'
              >
                <Menu.Item key='home'>Home</Menu.Item>
                {currentUser && (
                  <Menu.Item
                    key='logout'
                    onClick={() => {
                      location.href = '/logout';
                    }}
                  >
                    Logout
                  </Menu.Item>
                )}
              </Menu>
            </Layout.Header>
            <Layout style={style.page}>
              <Layout.Content style={style.content}>
                <Route path='/accounts' exact>
                  <AccountList {...props} />
                </Route>
                <Switch>
                  <Route path='/accounts/new' exact>
                    <AccountNew {...props} />
                  </Route>
                  <Route path='/accounts/:id' exact>
                    <Account {...props} />
                  </Route>
                </Switch>
              </Layout.Content>
              <Layout.Footer style={style.footer}>
                Payin created by an-lee
              </Layout.Footer>
            </Layout>
          </Layout>
        </Router>
      ) : (
        <Result
          title='Please login.'
          extra={
            <Button type='primary' href='/login'>
              Log In
            </Button>
          }
        />
      )}
    </ApolloProvider>
  );
}
