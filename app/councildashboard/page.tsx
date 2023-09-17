'use client';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Typography,Layout, Space} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
import { useRouter } from 'next/navigation';

const h1Style: React.CSSProperties = {
  textAlign: 'center',
  // color: '#ffffff',
  color:'#7dbcea',
  height: 240,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '',
};
const h2Style: React.CSSProperties = {
  textAlign: 'center',
  // color: '#ffffff',
  color:'#7dbcea',
  height: 80,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '',
};
const backgrounfStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#ffffff',
  height: 780,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const titleStyle: React.CSSProperties = {
  color: '#fff',
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 720,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
const rowStyle: React.CSSProperties = {
  textAlign: 'center',
  height:500,
};
const buttonStyle: React.CSSProperties = {
  // color: '#fff',
  height: 300,
  width:300,
  fontSize: 30,
  backgroundColor: '#7dbc',
}

export default function Page(){
  const router = useRouter();
    return (
      
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>
        <Title style={titleStyle}> Coucil Dashboard</Title>
      </Header>
      <Content style={contentStyle } > 
      
      <Row justify={'center'} align={'middle'} style={rowStyle} >
      <Col span={8} >
      <Button style={buttonStyle} type="primary" onClick={()=> router.push('./councildashboard/binmanage')} htmlType="submit" className="login-form-button" shape='round' size='large'>
          Bin management
        </Button>
      </Col>
      <Col span={8}>
      <Button style={buttonStyle} type="primary" htmlType="submit" className="login-form-button" shape='round' size='large'>
          Item classification
        </Button>
      </Col> 
      <Col span={8}>
      <Button style={buttonStyle} type="primary" htmlType="submit" className="login-form-button" shape='round'>
          Special collection
        </Button>
      </Col>     
    </Row>
      </Content>

    </Layout> 
  </Space>
      
      
    )
}