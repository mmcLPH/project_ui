'use client';
import React from 'react';
// import {Link} from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Typography, Card } from 'antd';
import { useRouter } from 'next/navigation';
const { Title } = Typography;
import './index.scss'
import { Grenze } from 'next/font/google';


const backStyle: React.CSSProperties = {

  color: '#7dbcea',
  backgroundColor: '',
  width: '100%',
  height: '100%',

};

let login =false

export default function Page() {
  // const {loginStore} =useStore()

  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    //value store all the form data: username , password
    if (values.username === 'green' && values.password === '123456'){
      login =true
      console.log('it is :  ',login)
      router.push('/councildashboard')
    }

    // loginStore.getToken({
    //   mobile: values.username,
    //   code: values.password,
    // })
  };

  return (
    <div className='login'>
      <h5>just a demo, enter username:green, password: 123456, it will redirect to council dashboard page</h5>

      <Row className='row' justify={'center'} align={'middle'}>
        {/* <Col span={8}>

        </Col> */}
        <Col span={8}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // validateTrigger={['onBlur']}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true, message: 'Please input your Username!'
                },
                // {
                //   pattern: /^1[3-9]\d{9}$/,
                //   message: 'please the correct type of username'
                // }

              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              validateTrigger={['onBlur']}
              rules={[
                {
                  required: true, message: 'Please input your Password!'
                },
                {
                  len: 6,
                  message: 'the password length is 6',
                  validateTrigger: 'onBlur'
                }

              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Log in
              </Button>
              Or <a href="">Reset password</a>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col span={8}>

        </Col> */}
      </Row>
    </div>
  )
}