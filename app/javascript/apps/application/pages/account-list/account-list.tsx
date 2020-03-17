import { MixinGroup, MultisigAccounts, User } from '@/graphql/application';
import { IStyles } from '@/shared';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Empty,
  List,
  Result,
  Spin,
  Row,
  Divider,
  Drawer,
  Descriptions,
} from 'antd';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

const styles: IStyles = {
  avatar: {
    marginLeft: '-0.5rem',
  },
  avatarList: {
    marginTop: '1rem',
    paddingLeft: '0.5rem',
    textAlign: 'right',
  },
};

export function AccountList(props: IProps) {
  const history = useHistory();
  const [currentAccount, setCurrentAccount] = useState(null);
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
        {currentAccount && (
          <Descriptions title='Account Detail'>
            <Descriptions.Item label='Id'>
              {currentAccount.id}
            </Descriptions.Item>
            <Descriptions.Item label='Name'>
              {currentAccount.name}
            </Descriptions.Item>
            <Descriptions.Item label='Introduction'>
              {currentAccount.introduction || 'empty'}
            </Descriptions.Item>
            <Descriptions.Item label='Threshold'>
              {currentAccount.threshold}
            </Descriptions.Item>
            <Descriptions.Item label='Members'>
              {currentAccount.members.map((member: Partial<User>) => (
                <Avatar key={member.id} src={member.avatar}>
                  {member.name[0]}
                </Avatar>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label='Account Hash'>
              {currentAccount.accountHash}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </React.Fragment>
  );
}
