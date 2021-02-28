import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/list.css'
import { getListById } from '../pages/api/index'
import Link from 'next/link'
import { withRouter } from 'next/router'

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";

const MyList = ({ router }) => {
  const [mylist, setMylist] = useState([]);
  useEffect(() => {
    const id = router.query.id
    if (id) {
      getArticleList(id);
    }
  }, [router.query.id]);

  const getArticleList = (id) => {
    getListById(id).then((res) => {
      setMylist(res.data);
    }).catch(err => {
      console.log('err', err)
    })
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.create_time}</span>
                    <span><FolderOutlined /> {item.name}</span>
                    <span><FireOutlined />  {item.count}人</span>
                  </div>
                  <div className="list-context">{item.content}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />

    </>
  )

}

export default withRouter(MyList);
