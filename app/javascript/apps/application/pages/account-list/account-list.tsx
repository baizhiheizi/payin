import { MixinGroup, MultisigAccounts, User } from '@/graphql/application';
import { IStyles } from '@/shared';
import { useQuery } from '@apollo/react-hooks';
import {
  Avatar,
  Breadcrumb,
  Button,
  Descriptions,
  Drawer,
  Empty,
  List,
  Result,
  Row,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AccountDetail } from '@/application/components';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

export function AccountList(_props: IProps) {
  const history = useHistory();
  const [currentAccount, setCurrentAccount] = useState(null);
  const { loading, error, data, refetch } = useQuery(MultisigAccounts, {
    variables: {
      first: 10,
    },
    fetchPolicy: 'network-only',
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
          <Button type='primary' onClick={() => refetch()} loading={loading}>
            Refresh
          </Button>
        }
      />
    );
  }

  const {
    multisigAccounts: { edges: nodes },
    pageInfo,
  } = data;

  if (nodes.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='You have no
      multisigin accounts yet'
      >
        <Button type='primary' onClick={() => history.push('/accounts/new')}>
          New
        </Button>
      </Empty>
    );
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Button
          style={{ marginLeft: 'auto' }}
          type='primary'
          onClick={() => history.push('/accounts/new')}
        >
          New
        </Button>
      </Row>
      <List
        itemLayout='horizontal'
        dataSource={nodes}
        renderItem={({ node: account }) => (
          <List.Item
            key={account.id}
            actions={[
              <a onClick={() => setCurrentAccount(account)}>Detail</a>,
              <Link to={`/accounts/${account.id}`}>Manage</Link>,
            ]}
          >
            <List.Item.Meta
              title={account.name}
              description={`${account.threshold} / ${account.memberUuids.length}`}
            />
          </List.Item>
        )}
      />
      <Drawer
        placement='bottom'
        height='70%'
        visible={currentAccount}
        onClose={() => setCurrentAccount(null)}
      >
        {currentAccount && <AccountDetail account={currentAccount} />}
      </Drawer>
    </React.Fragment>
  );
}
