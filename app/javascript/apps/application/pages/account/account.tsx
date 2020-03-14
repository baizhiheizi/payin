import React from 'react';
import {
  Asset,
  MixinGroup,
  User,
  MultisigAccount,
} from '@/graphql/application';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { Spin, Result, Tabs, Select } from 'antd';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

export function Account(props: IProps) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(MultisigAccount, {
    variables: { id },
  });
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status='error' />;
  }

  const {
    multisigAccount,
    assets: { edges: assetOptions },
  } = data;
  return (
    <React.Fragment>
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder='Select a asset'
        optionFilterProp='children'
        onChange={() => {}}
      >
        {assetOptions.map(({ node: asset }) => (
          <Select.Option value={asset.assetId}>{asset.symbol}</Select.Option>
        ))}
      </Select>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Balance' key='1'>
          balance
        </Tabs.TabPane>
        <Tabs.TabPane tab='Income' key='2'>
          income
        </Tabs.TabPane>
        <Tabs.TabPane tab='Outgo' key='3'>
          outgo
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
