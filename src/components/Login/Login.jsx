import React from 'react';
import "./style.scss";
import { FaKey, FaGoogle, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
import { Form, Input, Button, Checkbox,Divider } from 'antd';

const Login = () => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
    
      const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className=" login_contaner">
           
            <Divider plain><FaKey size={15} style={{ marginLeft: 5}} /> يمكنك الدخول عن طريق </Divider>
            <div className="div_all_bt">

           
            <div className="btn_login_by btn_google">جوجل <FaGoogle size={15} style={{ marginRight: 5}} /></div>
            <div className="btn_login_by btn_tweter" >تويتر <FaTwitterSquare size={15} style={{ marginRight: 5}} /></div>
            <div className="btn_login_by">الفيس بوك <FaFacebookSquare size={15} style={{ marginRight: 5}} /></div>
            <div className="divder"></div>

            </div>
            <Divider plain>تسجيل الدخول</Divider>
           
            <Form  {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
            <Form.Item
        label="البريد الألكتروني"
        name="username"
        rules={[{ required: true, message: 'يرجى ادخال البريد الالكتروني!' , type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="كلمة المرور"
        name="password"
        rules={[{ required: true, message: 'يرجى ادخال كلمة المرور!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>تذكرني</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          تسجيل الدخول
        </Button>
      </Form.Item>
            </Form>
      
            <Divider plain>ليس لديك حساب</Divider>
            <Button type="primary" htmlType="submit">
          تسجيل 
        </Button>

        
        <a style={{margin:10}} className="login-form-forgot" href="/">
          نسيت كلمة المرور
        </a>

        

        </div>
    )
}

export default Login
