import '../styles/components/header.css'

import { Col, Menu, Row } from 'antd'
import {
    HomeOutlined,
    SmileOutlined,
    YoutubeOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Router from 'next/router'
import { articleTypeList } from '../pages/api/index'

export const Header = () => {
    const [typeList, setTypeList] = useState([]);
    useEffect(() => {
        getAticleTypeList();
    }, []);

    const getAticleTypeList = () => {
        articleTypeList().then((res) => {
            setTypeList(res.data)
        }).catch(err => {
            console.log('err', err)
        })
    };


    //跳转到列表页
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} xl={10}>
                    <span className="header-logo">
                        <Link href={{ pathname: '/' }}>
                            <a>小老弟</a>
                        </Link>
                    </span>
                    <span className="header-text">老家回老家了回家路上</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={10} xl={8}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        {typeList.map(item => {
                            return <Menu.Item key={item.id}>
                                {item.icon === '1' ? <HomeOutlined /> : item.icon === '2' ? <YoutubeOutlined /> : <SmileOutlined />}
                                {item.type}
                            </Menu.Item>
                        })}
                    </Menu>
                </Col>

            </Row>
        </div>
    )
}

export default Header
