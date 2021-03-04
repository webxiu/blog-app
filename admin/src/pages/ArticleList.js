import '../static/css/ArticleList.css'

import { Button, Col, List, Modal, Row, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { articleList, deleteArticle } from '../api/admin'

const { confirm } = Modal;

function ArticleList(props) {
  const [dataSource, setDataSource] = useState([])
  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类别', dataIndex: 'type', key: 'title' },
    { title: '浏览量(人)', dataIndex: 'count', key: 'count' },
    { title: '发布时间', dataIndex: 'create_time', key: 'create_time' },
    {
      title: '操作', dataIndex: 'opt', key: 'opt', align: 'center', render: (text, record) => {
        return <div>
          <Button size="small" type="primary" onClick={() => { updateArticle(record.id) }}>修改</Button>
          <Button size="small" style={{ marginLeft: 8 }} onClick={() => { delArticle(record.id) }} >删除 </Button>
        </div>
      }
    },
  ]

  useEffect(() => { getList() }, [])

  //得到文章列表
  const getList = () => {
    articleList({}).then(res => {
      setDataSource(res.data)
    })
  }

  //删除文章的方法
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        deleteArticle({ id }).then(res => {
          message.success('删除成功')
          getList()
        })
      }
    });
  }

  //修改文章
  const updateArticle = (id, checked) => {
    props.history.push('/admin/add/' + id)
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource}>
      </Table>

    </div>
  )
}

export default ArticleList
