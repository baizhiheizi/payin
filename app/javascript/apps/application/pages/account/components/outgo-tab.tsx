import { TransactionDetail } from '@/application/components/transaction-detail';
import {
  CreateMultisigRequest,
  CreateMultisigTransaction,
  CreateMultisigTransactionInput,
  MultisigTransactions,
  User,
  VerifyMultisigRequest,
} from '@/graphql/application';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  InputNumber,
  List,
  Menu,
  message,
  Modal,
  Result,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useState } from 'react';

interface IProps {
  multisigAccount: any;
  assetOptions: any;
  currentUser: any;
  refetchMultisiAccount?: any;
}

export function OutgoTab(props: IProps) {
  const [form] = Form.useForm();
  const { multisigAccount, assetOptions, currentUser } = props;
  const [
    multisigTransactionFormVisible,
    setMultisigTransactionFormVisible,
  ] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { error, loading, data, refetch } = useQuery(MultisigTransactions, {
    variables: {
      accountId: multisigAccount.id,
    },
    fetchPolicy: 'network-only',
  });
  const [
    createMultisigTransaction,
    {
      error: createMultisigTransactionError,
      loading: createMultisigTransactionLoading,
    },
  ] = useMutation(CreateMultisigTransaction, {
    update() {
      setMultisigTransactionFormVisible(false);
      message.success('Success!');
      form.resetFields();
      refetch();
    },
  });

  const [verifyMultisigRequest] = useMutation(VerifyMultisigRequest, {
    update(
      _proxy,
      {
        data: {
          verifyMultisigRequest: {
            multisigRequest: { state },
          },
        },
      },
    ) {
      message.destroy();
      if (state === 'signed') {
        message.success('signed');
      } else if (state === 'unlocked') {
        message.success('unlocked');
      } else {
        message.warn('not signed');
      }
      Modal.destroyAll();
      refetch();
    },
  });

  const [
    createMultisigRequest,
    {
      error: createMultisigRequestError,
      loading: crecreateMultisigRequestLoading,
    },
  ] = useMutation(CreateMultisigRequest, {
    update(
      _proxy,
      {
        data: {
          createMultisigRequest: {
            multisigRequest: { codeId, signers, action },
            multisigTransaction: { id },
          },
        },
      },
    ) {
      message.destroy();
      if (action === 'sign' && signers.includes(currentUser.mixinUuid)) {
        message.warn('You have signed!');
        return;
      }

      Modal.warning({
        title: action,
        content: 'Please sign in Mixin Messenger',
        maskClosable: false,
        onOk: () => {
          message.loading('Verifying...', 0);
          verifyMultisigRequest({
            variables: {
              input: {
                transactionId: id,
                codeId,
              },
            },
          });
        },
      });
      location.href = `mixin://codes/${codeId}`;
    },
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

  if (createMultisigTransactionError) {
    message.error(
      createMultisigTransactionError.message || 'Failed to create transaction',
    );
  }

  if (createMultisigRequestError) {
    message.error(createMultisigRequestError.message || 'Failed to request');
  }

  const {
    multisigTransactions: { edges: transactions },
  } = data;

  return (
    <React.Fragment>
      <Row>
        <Button
          type='primary'
          style={{ marginLeft: 'auto' }}
          onClick={() => setMultisigTransactionFormVisible(true)}
        >
          New
        </Button>
        <Drawer
          placement='bottom'
          height='70%'
          visible={multisigTransactionFormVisible}
          closable={false}
          onClose={() => setMultisigTransactionFormVisible(false)}
        >
          <Form
            form={form}
            onFinish={(values: CreateMultisigTransactionInput) => {
              message.loading('Submitting...', 0);
              createMultisigTransaction({
                variables: {
                  input: { accountId: multisigAccount.id, ...values },
                },
              });
            }}
          >
            <Form.Item
              label='Receiver'
              name='receiverUuid'
              rules={[{ required: true, message: 'Please select receiver' }]}
            >
              <Select style={{ width: '100%' }} placeholder='Select receiver'>
                {multisigAccount.members.map((member: Partial<User>) => (
                  <Select.Option
                    key={member.mixinUuid}
                    value={member.mixinUuid}
                  >
                    <span>
                      <Avatar src={member.avatar}>{member.name[0]}</Avatar>
                      {member.name}
                    </span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Asset'
              name='assetId'
              rules={[{ required: true, message: 'Please select asset' }]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder='Select a asset'
                optionFilterProp='children'
              >
                {assetOptions.map(({ node: asset }) => (
                  <Select.Option key={asset.assetId} value={asset.assetId}>
                    {asset.symbol}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Amount'
              name='amount'
              required
              rules={[
                { required: true, message: 'Please input amount!' },
                { type: 'number', min: 0.00000001 },
              ]}
            >
              <InputNumber style={{ width: '100%' }} step='0.00000001' />
            </Form.Item>
            <Form.Item label='Memo' name='memo'>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={createMultisigTransactionLoading}
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Row>
      <List
        itemLayout='horizontal'
        dataSource={transactions}
        renderItem={({ node: transaction }) => (
          <List.Item
            key={transaction.id}
            actions={[
              <a onClick={() => setCurrentTransaction(transaction)}>Detail</a>,
              <Dropdown
                disabled={
                  ['completed', 'unlocked'].includes(transaction.status) ||
                  crecreateMultisigRequestLoading
                }
                overlay={
                  <Menu>
                    <Menu.Item
                      key='0'
                      disabled={transaction.signerUuids.includes(
                        currentUser.mixinUuid,
                      )}
                      onClick={() => {
                        message.loading('Requesting...', 0);
                        createMultisigRequest({
                          variables: {
                            input: {
                              action: 'sign',
                              accountId: multisigAccount.id,
                              transactionId: transaction.id,
                            },
                          },
                        });
                      }}
                    >
                      Sign
                    </Menu.Item>
                    <Menu.Item
                      key='1'
                      disabled={transaction.signerUuids.length === 0}
                      onClick={() => {
                        message.loading('Requesting...', 0);
                        createMultisigRequest({
                          variables: {
                            input: {
                              action: 'unlock',
                              accountId: multisigAccount.id,
                              transactionId: transaction.id,
                            },
                          },
                        });
                      }}
                    >
                      Unlock
                    </Menu.Item>
                    <Menu.Item key='2' onClick={() => refetch()}>
                      Refresh
                    </Menu.Item>
                  </Menu>
                }
              >
                <a>Options</a>
              </Dropdown>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={transaction.asset.iconUrl}></Avatar>}
              title={transaction.amount}
              description={
                transaction.status === 'completed' ? (
                  <Badge status='success' text='Completed' />
                ) : transaction.status === 'unlocked' ? (
                  <Badge status='warning' text='Unlocked' />
                ) : (
                  <Badge
                    status='processing'
                    text={`signed:
                  ${transaction.signers.length} / ${transaction.threshold}`}
                  />
                )
              }
            />
          </List.Item>
        )}
      />
      <Drawer
        placement='bottom'
        height='70%'
        visible={Boolean(currentTransaction)}
        onClose={() => setCurrentTransaction(null)}
      >
        {currentTransaction && (
          <TransactionDetail transaction={currentTransaction} />
        )}
      </Drawer>
    </React.Fragment>
  );
}
