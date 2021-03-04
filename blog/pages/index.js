import { Breadcrumb, Col, List, Row } from "antd";
import {
  CalendarOutlined,
  FireOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import Advert from "../components/Advert";
import Author from "../components/Author";
import Footer from "../components/Footer";
import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import ReactMarkdown from 'react-markdown'
import { articleList } from './api/index'

// import marked from "marked";
// import MarkNav from 'markdown-navbar'; //提供目录


export default function Home() {
  const [mylist, setMylist] = useState([]);
  useEffect(() => {
    getArticleList();
  }, []);

  const getArticleList = () => {
    articleList().then((res) => {
      setMylist(res.data);
    }).catch(err => {
      console.log('err', err)
    })
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="main">
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div>
              <div className="bread-nan">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="/">首页</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/">视频教程</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={(item) => (
                  <List.Item>
                    <div className="list-title">
                      <Link
                        href={{ pathname: "/detailed", query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <CalendarOutlined /> {item.create_time}
                      </span>
                      <span>
                        <FolderOutlined /> {item.type}
                      </span>
                      <span>
                        <FireOutlined /> {item.count}人
                      </span>
                    </div>
                    {/* <div
                      className="list-context"
                      dangerouslySetInnerHTML={{
                        __html: marked(item.content || ""), 
                      }}
                      
                    ></div> */}
                    <div className="detailed-content" >
                      <ReactMarkdown
                        source={item.introduce}
                        escapeHtml={false}
                      />
                    </div>
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
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
