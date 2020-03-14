import React, { useState } from 'react';
import {
  Asset,
  MixinGroup,
  User,
  MultisigAccount,
  CreateMultisigPayment,
  CreateMultisigPaymentInput,
} from '@/graphql/application';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import {
  Spin,
  Result,
  Tabs,
  Select,
  Button,
  Drawer,
  Input,
  InputNumber,
  Form,
  message,
} from 'antd';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

export function Account(props: IProps) {
  const { id } = useParams();
  const [incomeFormVisible, setIncomFormVisible] = useState(false);
  const { loading, error, data, refetch } = useQuery(MultisigAccount, {
    variables: { id },
  });
  const [createMultisigPayment, { error: createPaymentError }] = useMutation(
    CreateMultisigPayment,
    {
      update(
        _proxy,
        {
          data: {
            createMultisigPayment: { multisigPayment, errors },
          },
        },
      ) {
        if (errors) {
          message.error(errors);
        } else {
          setIncomFormVisible(false);
          refetch();
        }
      },
    },
  );
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status='error' />;
  }
  if (createPaymentError) {
    message.error(createPaymentError.message);
  }

  const {
    multisigAccount,
    assets: { edges: assetOptions },
  } = data;
  return (
    <React.Fragment>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Balance' key='1'>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='Select a asset'
            optionFilterProp='children'
            onChange={() => {}}
          >
            {assetOptions.map(({ node: asset }) => (
              <Select.Option value={asset.assetId}>
                {asset.symbol}
              </Select.Option>
            ))}
          </Select>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Income' key='2'>
          <div>
            <Button type='primary' onClick={() => setIncomFormVisible(true)}>
              New
            </Button>
          </div>
          <Drawer
            placement='bottom'
            height='70%'
            title='New Income'
            closable={false}
            visible={incomeFormVisible}
            onClose={() => setIncomFormVisible(false)}
          >
            <Form
              name='multisig-payment-form'
              onFinish={(values: CreateMultisigPaymentInput) => {
                createMultisigPayment({
                  variables: {
                    input: { accountId: multisigAccount.id, ...values },
                  },
                });
              }}
            >
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
                  onChange={() => {}}
                >
                  {assetOptions.map(({ node: asset }) => (
                    <Select.Option value={asset.assetId}>
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
        </Tabs.TabPane>
        <Tabs.TabPane tab='Outgo' key='3'>
          outgo
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
}
