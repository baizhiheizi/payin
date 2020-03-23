import { DashboardTab, IncomeTab, OutgoTab } from './components';
import { MixinGroup, MultisigAccount, User } from '@/graphql/application';
import { useQuery } from '@apollo/react-hooks';
import { Result, Spin, Tabs, Breadcrumb, Button } from 'antd';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

export function Account(props: IProps) {
  const { currentUser } = props;
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(MultisigAccount, {
    variables: { id },
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
        title='timeout'
        extra={
          <Button type='primary' onClick={() => refetch()} loading={loading}>
            Refresh
          </Button>
        }
      />
    );
  }

  const {
    multisigAccount,
    assets: { edges: assetOptions },
  } = data;

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{multisigAccount.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey='1' onTabClick={() => refetch()}>
        <Tabs.TabPane tab='Dashboard' key='1'>
          <DashboardTab
            multisigAccount={multisigAccount}
            assetOptions={assetOptions}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Outgo' key='2'>
          <OutgoTab
            multisigAccount={multisigAccount}
            assetOptions={assetOptions}
            currentUser={currentUser}
            refetchMultisiAccount={refetch}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Income' key='3'>
          <IncomeTab
            multisigAccount={multisigAccount}
            assetOptions={assetOptions}
            refetchMultisiAccount={refetch}
          />
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
