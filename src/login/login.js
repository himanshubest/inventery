import React, { useState } from 'react'
import { Form, Button, Input, Spin } from "antd";
import { REQUEST_LOGIN } from '../api/apicall';
import { getBody } from '../api/common';
import { apiUserData } from '../apimodels/loginuser';
import auth from '../api/auth';
import {  useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'antd/dist/reset.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const submitdata = (value) => {
    setLoading(true);
    REQUEST_LOGIN(value, (err, res) => {
      if (err) {
        
        toast.error("Could not connect to the internet "+err.message);
        setLoading(false);
        return;
      }
      //const apiKey = res.headers['apikey'];
     
      let data = getBody(res);
      if (data.status.isSuccess) {
        toast.success('User Login success', {

          autoClose: 3000, // 3 seconds
        });
        
        const apiResponse ={
          companyName: data?.data?.companyName,
          contactNo: data?.data?.contactNo,
          firstName: data?.data?.firstName,
          imagePath: data?.data?.imagePath,
          inventoryPermissionIds: data?.data?.inventoryPermissionIds,
          inventoryUserId: data?.data?.inventoryUserId,
          lastName: data?.data?.lastName
      };
      
        
        (new auth).setApiKey(res.headers['x-unique-key'], data.token);
        
        (new auth).setUserData(JSON.stringify(apiResponse));
        setUserData(apiResponse);
        setLoading(false);
        navigate('/DeviceMaster');
      }
      else
      {
        toast.error(data.status.message);
        setLoading(false);
        return;
      }
    })

  }

  return (
    <>
      {
        loading ? (<Spin size="large" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />) : (<div className="main-wrapper login-body">
          <div className="login-wrapper">
            <div className="container">
              <img className="img-fluid logo-dark mb-2 logo-color" src="wwwroot/assets/img/logo.webp" alt="Logo" />
              <img className="img-fluid logo-light mb-2" src="wwwroot/assets/img/logo2-white.png" alt="Logo" />

              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <h1>Login</h1>
                    <p className="account-subtitle">Access to our dashboard</p>

                    <Form
                      autoComplete="off"
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 14 }}
                      onFinish={(values) => submitdata(values)}

                    >

                      <div className="input-block mb-3">
                        <label htmlFor="userName" className="form-label">
                          User Name
                        </label>
                        <Form.Item
                          name="userName"

                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                            { whitespace: true }
                          ]}
                          hasFeedback
                        >
                          <Input placeholder="Type your name" style={{ width: '380px', fontSize: '15px' }} />
                        </Form.Item>

                      </div>

                      <div className="input-block mb-3">
                        <label className="form-control-label">Password</label>
                        <div className="pass-group">
                          <Form.Item
                            name="Password"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your Password",
                              },
                              { whitespace: true }
                            ]}
                            hasFeedback

                          >
                            <Input.Password placeholder="Type your password" style={{ width: '380px', fontSize: '15px' }} />
                          </Form.Item>

                        </div>
                      </div>

                      <div className="input-block mb-3">
                        <div className="row">
                          <div className="col-6">
                            <div className="form-check custom-checkbox">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"

                              />
                              <label className="custom-control-label" htmlFor="rememberMe">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <a className="forgot-link" href="/about">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                      </div>


                      <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                          Login
                        </Button>
                      </Form.Item>
                      <div className="text-center dont-have">
                        Don't have an account yet? <a href="register.html">Register</a>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>)
      }
    </>


  );  // Render your actual component after activity completes


};

export default Login;
