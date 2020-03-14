import { MixinGroup, MultisigAccounts, User } from '@/graphql/application';
import { IStyles } from '@/shared';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Card, Empty, List, Result, Spin } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
          Create
        </Button>
      </Empty>
    );
  }

  return (
    <List
      itemLayout='vertical'
      dataSource={nodes}
      renderItem={({ node: account }) => (
        <List.Item key={account.id}>
          <Card
            size='small'
            actions={[
              <SettingOutlined
                key='setting'
                onClick={() => history.push(`/accounts/${account.id}`)}
              />,
              <EditOutlined key='edit' />,
            ]}
          >
            <Card.Meta
              title={`${account.name} - ${account.threshold} / ${account.memberUuids.length}`}
              description={account.introduction}
            />
            <div style={styles.avatarList}>
              {account.members.map((user: User) => (
                <Avatar
                  key={user.id}
                  src={user.avatar}
                  size='small'
                  style={styles.avatar}
                />
              ))}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
