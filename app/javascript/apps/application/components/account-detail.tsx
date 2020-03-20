import { User } from '@/graphql/application';
import { Avatar, Descriptions } from 'antd';
import React from 'react';

export function AccountDetail(props: { account: any }) {
  const { account } = props;
  return (
    <Descriptions title='Account Detail'>
      <Descriptions.Item label='Id'>{account.id}</Descriptions.Item>
      <Descriptions.Item label='Name'>{account.name}</Descriptions.Item>
      <Descriptions.Item label='Introduction'>
        {account.introduction || 'empty'}
      </Descriptions.Item>
      <Descriptions.Item label='Threshold'>
        {account.threshold}
      </Descriptions.Item>
      <Descriptions.Item label='Members'>
        {account.members.map((member: Partial<User>) => (
          <Avatar key={member.id} src={member.avatar}>
            {member.name[0]}
          </Avatar>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label='Account Hash'>
        {account.accountHash}
      </Descriptions.Item>
    </Descriptions>
  );
}
