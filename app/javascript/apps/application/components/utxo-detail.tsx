import React from 'react';
import { Descriptions } from 'antd';

export function UtxoDetail(props: { utxo: any }) {
  const { utxo } = props;
  return (
    <Descriptions title='Utxo Detail'>
      <Descriptions.Item label='Id'>{utxo.id}</Descriptions.Item>
      <Descriptions.Item label='Type'>{utxo.type}</Descriptions.Item>
      <Descriptions.Item label='UserId'>{utxo.userId}</Descriptions.Item>
      <Descriptions.Item label='assetId'>{utxo.assetId}</Descriptions.Item>
      <Descriptions.Item label='transactionHash'>
        <span style={{ wordBreak: 'break-all' }}>{utxo.transactionHash}</span>
      </Descriptions.Item>
      <Descriptions.Item label='outputIndex'>
        {utxo.outputIndex}
      </Descriptions.Item>
      <Descriptions.Item label='amount'>{utxo.amount}</Descriptions.Item>
      <Descriptions.Item label='threshold'>{utxo.threshold}</Descriptions.Item>
      <Descriptions.Item label='members'>
        {utxo.members.join('\n')}
      </Descriptions.Item>
      <Descriptions.Item label='state'>{utxo.state}</Descriptions.Item>
      <Descriptions.Item label='memo'>{utxo.memo}</Descriptions.Item>
      <Descriptions.Item label='signedBy'>
        <span style={{ wordBreak: 'break-all' }}>{utxo.signedBy}</span>
      </Descriptions.Item>
      <Descriptions.Item label='signedTx'>
        <blockquote
          style={{ wordBreak: 'break-all', padding: 10, background: '#efefef' }}
        >
          {utxo.signedTx}
        </blockquote>
      </Descriptions.Item>
    </Descriptions>
  );
}
