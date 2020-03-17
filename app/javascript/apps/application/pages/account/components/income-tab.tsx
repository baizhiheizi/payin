import {
  CreateMultisigPayment,
  CreateMultisigPaymentInput,
  MultisigPayment,
} from '@/graphql/application';
import { useMutation } from '@apollo/react-hooks';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Select,
  Dropdown,
  Menu,
  Descriptions,
} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useState } from 'react';

interface IProps {
  assetOptions: any;
  multisigAccount: any;
  refechMultisiAccount: any;
}

function PaymentStatusComponent(props: { status: string }) {
  const { status } = props;
  if (status === 'pending') {
    return <Badge status='processing' text='pending' />;
  } else if (status === 'paid') {
    return <Badge status='success' text='paid' />;
  }
}

export function IncomeTab(props: IProps) {
  const { multisigAccount, assetOptions, refechMultisiAccount } = props;
  const [incomeFormVisible, setIncomFormVisible] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
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
          refechMultisiAccount();
        }
      },
    },
  );
  if (createPaymentError) {
    message.error(createPaymentError.message);
  }

  return (
    <React.Fragment>
      <div>
        <Button type='primary' onClick={() => setIncomFormVisible(true)}>
          New
        </Button>
      </div>
      <List
        itemLayout='horizontal'
        dataSource={multisigAccount.multisigPayments}
        renderItem={(payment: Partial<MultisigPayment>) => (
          <List.Item
            actions={[
              <a onClick={() => setCurrentPayment(payment)}>Detail</a>,
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key='0'>
                      <CopyToClipboard
                        text={`https://mixin.one/codes/${payment.codeId}`}
                        onCopy={() => message.success('Pay link Copied!')}
                      >
                        <a>Copy Pay Link</a>
                      </CopyToClipboard>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <a
                        href={`https://mixin.one/codes/${payment.codeId}`}
                        target='_blank'
                      >
                        Click to Pay
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a>Options</a>
              </Dropdown>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={payment.asset.iconUrl} />}
              title={`${payment.amount} ${payment.asset.symbol}`}
              description={<PaymentStatusComponent status={payment.status} />}
            />
          </List.Item>
        )}
      />
      <Drawer
        placement='bottom'
        height='70%'
        visible={currentPayment}
        onClose={() => setCurrentPayment(null)}
      >
        {currentPayment && (
          <Descriptions title='Payment Detail'>
            <Descriptions.Item label='traceId'>
              {currentPayment.traceId}
            </Descriptions.Item>
            <Descriptions.Item label='codeId'>
              {currentPayment.codeId}
            </Descriptions.Item>
            <Descriptions.Item label='amount'>
              {currentPayment.amount} {currentPayment.asset.symbol}
            </Descriptions.Item>
            <Descriptions.Item label='status'>
              <PaymentStatusComponent status={currentPayment.status} />
            </Descriptions.Item>
            <Descriptions.Item label='Pay Link'>
              <a
                href={`https://mixin.one/codes/${currentPayment.codeId}`}
                target='_blank'
              >{`https://mixin.one/codes/${currentPayment.codeId}`}</a>
            </Descriptions.Item>
            <Descriptions.Item label='creator'>
              <Avatar src={currentPayment.creator.avatar}>
                {currentPayment.creator.name[0]}
              </Avatar>{' '}
              {currentPayment.creator.name}
            </Descriptions.Item>
            <Descriptions.Item label='memo'>
              {currentPayment.memo}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
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
    </React.Fragment>
  );
}
