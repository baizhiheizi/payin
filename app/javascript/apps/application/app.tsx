import { Account, AccountList, AccountNew } from '@/application/pages';
import { apolloClient, IStyles, mixinUtils } from '@/shared';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { Button, Layout, Result, Spin } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CurrentGroup } from '@/graphql/application';

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
    minHeight: '100vh',
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

function App(props: any) {
  const { conversationId } = props;
  const { error, loading, data } = useQuery(CurrentGroup, {
    variables: { conversationId },
  });
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status='error' title='Something went wrong' />;
  }
  const currentGroup = data.currentGroup;

  return (
    <Router>
      <Layout>
        <Layout style={style.page}>
          <Layout.Content style={style.content}>
            <Route path='/' exact>
              <AccountList {...props} currentGroup={currentGroup} />
            </Route>
            <Switch>
              <Route path='/accounts/new' exact>
                <AccountNew {...props} currentGroup={currentGroup} />
              </Route>
              <Route path='/accounts/:id' exact>
                <Account {...props} currentGroup={currentGroup} />
              </Route>
            </Switch>
          </Layout.Content>
          <Layout.Footer style={style.footer}>
            Payin created by an-lee
          </Layout.Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default function AppNode(props: IProps) {
  /** Production */
  /* const conversationId = mixinUtils.conversationId(); */
  /** Development */
  const conversationId = '0c233319-52b3-4c84-8e47-15e8a3694e45';

  if (!props.currentUser) {
    return (
      <Result
        title='Please login.'
        extra={
          <Button type='primary' href='/login'>
            Log In
          </Button>
        }
      />
    );
  }

  return (
    <ApolloProvider client={apolloClient()}>
      {conversationId ? (
        <App {...props} conversationId={conversationId} />
      ) : (
        <Result status='warning' title='Please open in Mixin Messenger.' />
      )}
    </ApolloProvider>
  );
}
