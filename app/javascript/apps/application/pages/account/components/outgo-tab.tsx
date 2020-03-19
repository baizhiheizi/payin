import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CreateMultisigTransaction,
  CreateMultisigTransactionInput,
  User,
  MultisigTransactions,
  CreateMultisigRequest,
  VerifyMultisigRequest,
} from '@/graphql/application';
import {
  Row,
  Button,
  Drawer,
  Form,
  Select,
  InputNumber,
  Input,
  Avatar,
  message,
  Spin,
  Result,
  List,
  Dropdown,
  Menu,
  Modal,
} from 'antd';
import { TransactionDetail } from '@/application/components/transaction-detail';

interface IProps {
  multisigAccount: any;
  assetOptions: any;
  currentUser: any;
  refetchMultisiAccount: any;
}

export function OutgoTab(props: IProps) {
  const [form] = Form.useForm();
  const {
    multisigAccount,
    assetOptions,
    currentUser,
    refetchMultisiAccount,
  } = props;
  const [
    multisigTransactionFormVisible,
    setMultisigTransactionFormVisible,
  ] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { error, loading, data, refetch } = useQuery(MultisigTransactions, {
    variables: {
      accountId: multisigAccount.id,
    },
  });
  const [createMultisigTransaction] = useMutation(CreateMultisigTransaction, {
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
          verifyMultisigRequest: { state },
        },
      },
    ) {
      if (state === 'signed') {
        message.success('signed');
      } else if (state === 'unlocked') {
        message.success('unlocked');
      } else {
        message.warn('not signed');
      }
      Modal.destroyAll();
      refetchMultisiAccount();
    },
  });

  const [createMultisigRequest] = useMutation(CreateMultisigRequest, {
    update(
      _proxy,
      {
        data: {
          createMultisigRequest: {
            multisigRequest: { codeId, signers, action },
            transactionId,
          },
        },
      },
    ) {
      if (action === 'sign' && signers.includes(currentUser.mixinUuid)) {
        message.warn('You have signed!');
        return;
      }

      Modal.confirm({
        title: action,
        content: 'Please sign in Mixin Messenger',
        maskClosable: false,
        cancelText: false,
        onOk: () =>
          verifyMultisigRequest({
            variables: {
              input: {
                transactionId,
                codeId,
              },
            },
          }),
      });
      location.href = `mixin://codes/${codeId}`;
    },
  });

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status='error' />;
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
            onFinish={(values: CreateMultisigTransactionInput) =>
              createMultisigTransaction({
                variables: {
                  input: { accountId: multisigAccount.id, ...values },
                },
              })
            }
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
              <Button type='primary' htmlType='submit'>
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
                overlay={
                  <Menu>
                    <Menu.Item
                      key='0'
                      disabled={transaction.signerUuids.includes(
                        currentUser.mixinUuid,
                      )}
                      onClick={() =>
                        createMultisigRequest({
                          variables: {
                            input: {
                              action: 'sign',
                              accountId: multisigAccount.id,
                              transactionId: transaction.id,
                            },
                          },
                        })
                      }
                    >
                      Sign
                    </Menu.Item>
                    <Menu.Item
                      key='1'
                      disabled={
                        !transaction.signerUuids.includes(currentUser.mixinUuid)
                      }
                      onClick={() =>
                        createMultisigRequest({
                          variables: {
                            input: {
                              action: 'unlock',
                              accountId: multisigAccount.id,
                              transactionId: transaction.id,
                            },
                          },
                        })
                      }
                    >
                      Unlock
                    </Menu.Item>
                    <Menu.Item key='2' onClick={() => refetchMultisiAccount}>
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
              description={`signed: ${transaction.signers.length} / ${transaction.threshold}`}
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
