// import 'antd/dist/antd.css';
import '../static/css/Login.css';

import { Button, Card, Input, Spin, message } from 'antd';
import {
    KeyOutlined,
    UserOutlined
} from "@ant-design/icons";
import React, { useState } from 'react';

import { login } from '../api/login'

function Login(props) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        if (!username) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        login({ username, password })
            .then(res => {
                if (res.status === 0) {
                    localStorage.setItem('openId', res.data.openId)
                    props.history.push('/')
                } else {
                    message.error('用户名密码错误')
                }
            }).catch(err => {
                console.log('err', err)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })


    }

    return (
        <div className="login-div">
            <p style={{ display: 'none' }}>{username + password}</p>
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博客管理后台登录" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="username"
                        size="large"
                        placeholder="请输入用户名"
                        onKeyUp={(e) => e.code === 'Enter' && checkLogin()}
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        onKeyUp={(e) => e.code === 'Enter' && checkLogin()}
                        placeholder="请输入密码"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} >登录</Button>
                </Card>
            </Spin>
        </div>
    )
}


export default Login
