import { MultisigAccounts } from '@/graphql/application';
import { useQuery } from '@apollo/react-hooks';
import { Button, Empty, Result, Spin } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function AccountList(props: any) {
  const history = useHistory();
  const { loading, error, data } = useQuery(MultisigAccounts, {
    variables: {
      first: 10,
    },
  });

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status='error' />;
  }

  const {
    multisigAccounts: { edges: accounts },
    pageInfo,
  } = data;

  if (accounts.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='You have no
      multisigin accounts yet'
      >
        <Button type='primary' onClick={() => history.push('/accounts/new')}>
          Create
        </Button>
      </Empty>
    );
  }

  return <div></div>;
}
