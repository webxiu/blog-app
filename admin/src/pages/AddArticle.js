import '../static/css/AddArticle.css'

import { Button, Col, DatePicker, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { addArticle, articleTypeList, getArticleById, updateArticle } from '../api/admin'

import marked from 'marked'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑...') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(undefined) //选择的文章类别

  useEffect(() => {
    getTypeInfo()
    //获得文章ID
    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getUpdateArticleById(tmpId)
    }
  }, [props.match.params.id])

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  //从中台得到文章类别信息
  const getTypeInfo = () => {
    articleTypeList({}).then(res => {
      setTypeInfo(res.data)
    }).catch(err => {
      console.log('err', err)
    })
  }

  // //从中台得到文章信息
  const getUpdateArticleById = (id) => {
    getArticleById(id).then(res => {
      const data = res.data
      setArticleTitle(data.title)
      setArticleContent(data.content)
      setMarkdownContent(marked(data.content))
      setIntroducemd(data.introduce)
      setIntroducehtml(marked(data.introduce))
      setShowDate(data.create_time)
      setSelectType(data.type_id)
    })
  }

  //保存文章  (不退出页面是修改)
  const saveArticle = () => {
    // markedContent()  //先进行转换
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }

    let dataProps = {}
    const datetext = showDate.replace('-', '/')

    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.content = articleContent
    dataProps.introduce = introducemd
    dataProps.create_time = (new Date(datetext).getTime()) / 1000

    if (articleId === 0) {// 添加文章
      dataProps.count = Math.ceil(Math.random() * 100) + 1000
      addArticle(dataProps).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.isScuccess) {
          message.success('文章发布成功')
        } else {
          message.error('文章发布失败');
        }
      })
    } else {// 修改文章
      dataProps.id = articleId
      updateArticle(dataProps).then(res => {
        message.success('修改成功')
      }).catch(() => {
        message.error('修改失败');
      })
    }
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                value={articleTitle} placeholder="博客标题"
                onChange={e => setArticleTitle(e.target.value)}
                size="large" />
            </Col>
            <Col span={4}>
              <Select value={selectedType} size="large" placeholder="请选择分类" onChange={(value) => setSelectType(value)}>
                {typeInfo?.map((item, index) => <Option key={item.id} value={item.id}>{item.type}</Option>)}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }} >
              </div>
            </Col>
          </Row>

        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <br /><br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
              </div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle
