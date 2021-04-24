import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

class BasicLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to='/'>
              <Icon type="pie-chart" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/list'>
              <Icon type="desktop" />
              <span>List</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/about'>
              <Icon type="file" />
              <span>About</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    );
  }
}

export default BasicLayout;
