import { Result } from 'antd';
import React from 'react';

export function ErrorPage() {
  return <Result status='error' title='Opps...' />;
}
