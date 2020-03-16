import React, { useState } from 'react';
import {
  Asset,
  MixinGroup,
  User,
  MultisigAccount,
  CreateMultisigPayment,
  CreateMultisigPaymentInput,
  MultisigPayment,
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
  List,
  Avatar,
  Alert,
  Badge,
  Row,
  Col,
  Statistic,
  Divider,
} from 'antd';

interface IProps {
  currentGroup?: Partial<MixinGroup>;
  currentUser: Partial<User>;
  conversationId?: string;
}

function PaymentStatusComponent(props: { status: string }) {
  const { status } = props;
  if (status === 'pending') {
    return <Badge status='processing' text='pending' />;
  } else if (status === 'paid') {
    return <Badge status='success' text='paid' />;
  }
}

export function Account(props: IProps) {
  const { id } = useParams();
  const [incomeFormVisible, setIncomFormVisible] = useState(false);
  const [currentAsset, setCurrentAsset] = useState({
    assetId: '965e5c6e-434c-3fa9-b780-c50f43cd955c',
    balance: 0.0,
    utxos: [],
  });
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
            createMultisigPayment: { errors },
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

  const updateCurrentAsset = (assetId: string) => {
    const { utxos } = multisigAccount;
    const balance = utxos
      .filter((utxo: any) => utxo.assetId === assetId)
      .reduce((a: number, b: number) => a + b, 0);
    setCurrentAsset({
      assetId,
      balance,
      utxos,
    })
  };

  return (
    <React.Fragment>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Balance' key='1'>
          <Row>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder='Select a asset'
              optionFilterProp='children'
              onChange={assetId => {
                updateCurrentAsset(assetId);
              }}
            >
              {assetOptions.map(({ node: asset }) => (
                <Select.Option key={asset.id} value={asset.assetId}>
                  {asset.symbol}
                </Select.Option>
              ))}
            </Select>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title='Utxos' value={1} />
            </Col>
            <Col span={12}>
              <Statistic title='Balance' value={currentAsset.balance} />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Income' key='2'>
          <div>
            <Button type='primary' onClick={() => setIncomFormVisible(true)}>
              New
            </Button>
          </div>
          <List
            itemLayout='vertical'
            dataSource={multisigAccount.multisigPayments}
            renderItem={(payment: Partial<MultisigPayment>) => (
              <List.Item
                actions={[
                  <a>Copy Pay Link</a>,
                  <a
                    href={`https://mixin.one/codes/${payment.codeId}`}
                    target='_blank'
                  >
                    Pay
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={payment.asset.iconUrl} />}
                  title={`${payment.amount} ${payment.asset.symbol}`}
                  description={
                    <PaymentStatusComponent status={payment.status} />
                  }
                />
                {payment.memo && (
                  <Alert type='info' showIcon message={payment.memo} />
                )}
              </List.Item>
            )}
          />
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
                    <Select.Option key={asset.id} value={asset.assetId}>
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
