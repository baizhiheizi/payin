import { IStyles } from '@/shared/interfaces';
import { Spin } from 'antd';
import React from 'react';

const style: IStyles = {
  container: {
    background: 'rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
};

export function LoadingPage() {
  return (
    <div style={style.container}>
      <Spin />
    </div>
  );
}
