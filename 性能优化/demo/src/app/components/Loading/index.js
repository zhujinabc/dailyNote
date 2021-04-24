import React from 'react';
import { Spin } from 'antd';

const Loading = () => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <Spin size="large" tip="加载中..." />
  </div>
);

export default Loading;