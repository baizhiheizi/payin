import {
  CreateMultisigAccount,
  CreateMultisigAccountInput,
  MixinGroup,
  User,
} from '@/graphql/application';
import { useMutation } from '@apollo/react-hooks';
import {
  Avatar,
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Result,
} from 'antd';
import React from 'react';
import { useHistory, Link } from 'react-router-dom';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

export function AccountNew(props: IProps) {
  const history = useHistory();
  const { currentGroup } = props;
  const [createMultisigAccount, { error }] = useMutation(
    CreateMultisigAccount,
    {
      update(_proxy, { data }) {
        if (data && data.createMultisigAccount.multisigAccount) {
          message.success('success!');
          history.replace('/');
        } else {
          message.error(
            data.createMultisigAccount.errors ||
              'Something went wrong, retry please',
          );
        }
      },
    },
  );

  if (error) {
    message.error(error.message);
  }

  if (!currentGroup) {
    return (
      <Result
        status='warning'
        title='Please create in a group'
        extra={
          <Button type='link' onClick={() => history.replace('/')}>
            Back
          </Button>
        }
      />
    );
  }
  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New Account</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name='multisig-account-form'
        initialValues={{
          name: currentGroup.name,
          threshold: currentGroup.users.length,
        }}
        onFinish={(values: CreateMultisigAccountInput) => {
          createMultisigAccount({
            variables: {
              input: {
                conversationId: currentGroup.conversationId,
                memberUuids: currentGroup.users.map(user => user.mixinUuid),
                ...values,
              },
            },
          });
        }}
        onFinishFailed={errorInfo => message.error(errorInfo)}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[
            { required: true, message: 'Please input your account name!' },
          ]}
        >
          <Input placeholder='e.g. PayinTeam(2/3)' />
        </Form.Item>
        <Form.Item label='Introduction' name='introduction'>
          <Input.TextArea placeholder='Add some introduction?' />
        </Form.Item>
        <Form.Item
          label='Threshold'
          name='threshold'
          rules={[
            { required: true, message: 'Please input threshold!' },
            {
              type: 'number',
              min: 1,
              max: currentGroup.users.length,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label='Members'>
          <List
            itemLayout='horizontal'
            dataSource={currentGroup.users}
            renderItem={(user: Partial<User>) => (
              <List.Item key={user.mixinUuid}>
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar}>{user.name[0]}</Avatar>}
                  title={user.name}
                  description={user.mixinUuid}
                />
              </List.Item>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
