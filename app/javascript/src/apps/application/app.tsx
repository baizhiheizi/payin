import { Account, AccountList, AccountNew } from '@application/pages';
import { apolloClient, IStyles, mixinUtils } from '@shared';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { Button, Layout, Result, Spin } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CurrentGroup } from '@application/graphql';

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
  const { error, loading, data, refetch } = useQuery(CurrentGroup, {
    variables: { conversationId },
  });
  if (loading) {
    return (
      <div style={{ width: '100%', margin: '3rem auto', textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
  if (error) {
    return (
      <Result
        status='error'
        title='Something went wrong'
        extra={
          <Button type='primary' onClick={() => refetch()}>
            Refresh
          </Button>
        }
      />
    );
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
  const conversationId = mixinUtils.conversationId();
  const [loading, setLoading] = useState(false);

  if (props.currentUser) {
    return (
      <ApolloProvider client={apolloClient()}>
        {conversationId ? (
          <App {...props} conversationId={conversationId} />
        ) : (
          <Result status='warning' title='Please open in Mixin Messenger.' />
        )}
      </ApolloProvider>
    );
  } else {
    return (
      <Result
        title='Please login.'
        extra={
          <Button
            type='primary'
            loading={loading}
            onClick={() => setLoading(true)}
            href='/login'
          >
            Log In
          </Button>
        }
      />
    );
  }
}
