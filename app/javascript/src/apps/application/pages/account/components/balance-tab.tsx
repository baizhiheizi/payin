import { UtxoDetail } from '@application/components';
import { MultisigUtxo } from '@application/graphql';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  List,
  Row,
  Select,
  Statistic,
} from 'antd';
import React, { useState } from 'react';

interface IProps {
  assetOptions: any;
  multisigAccount: any;
}

export function BalanceTab(props: IProps) {
  const { assetOptions, multisigAccount } = props;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentUtxo, setCurrentUtxo] = useState(null);

  const updateCurrentAccount = (assetId: string) => {
    const utxos = multisigAccount.utxos.filter(
      (utxo: any) => utxo.assetId === assetId,
    );
    const currentAsset = assetOptions.find(
      ({ node: asset }) => asset.assetId === assetId,
    );
    const balance = utxos
      .map((utxo: any) => utxo.amount)
      .reduce((a: number, b: number) => a + b, 0);
    setCurrentAccount({
      balance,
      utxos,
      asset: currentAsset.node,
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='Select a asset'
          optionFilterProp='children'
          onChange={(assetId: string) => {
            updateCurrentAccount(assetId);
          }}
        >
          {assetOptions.map(({ node: asset }) => (
            <Select.Option key={asset.assetId} value={asset.assetId}>
              {asset.symbol}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <Divider />
      {currentAccount && (
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title='Utxos' value={currentAccount.utxos.length} />
          </Col>
          <Col span={12}>
            <Statistic title='Balance' value={currentAccount.balance} />
          </Col>
        </Row>
      )}
      <List
        itemLayout='horizontal'
        dataSource={
          currentAccount ? currentAccount.utxos : multisigAccount.utxos
        }
        renderItem={(utxo: Partial<MultisigUtxo>) => (
          <List.Item
            key={utxo.id}
            actions={[
              <Button type='link' onClick={() => setCurrentUtxo(utxo)}>
                Detail
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    assetOptions.find(
                      ({ node: asset }) => asset.assetId === utxo.assetId,
                    ).node.iconUrl
                  }
                ></Avatar>
              }
              title={utxo.amount}
              description={utxo.state}
            />
          </List.Item>
        )}
      />
      <Drawer
        placement='bottom'
        height='70%'
        visible={currentUtxo}
        onClose={() => setCurrentUtxo(null)}
      >
        {currentUtxo && <UtxoDetail utxo={currentUtxo} />}
      </Drawer>
    </React.Fragment>
  );
}
