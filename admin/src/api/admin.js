import http from '../utils/http'

// 文章分类option
export function articleTypeList(data) {
  return http({
    url: '/admin/getTypeList',
    method: 'get',
    params: data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }
  })
}
// 文章列表
export function articleList(data) {
  return http({
    url: '/admin/getArticleList',
    method: 'get',
    params: data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }
  })
}

// 添加文章
export function addArticle(data) {
  return http({
    url: '/admin/addArticle',
    method: 'post',
    data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }//可以不要
  })
}
// 修改文章
export function updateArticle(data) {
  return http({
    url: '/admin/updateArticle',
    method: 'post',
    data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }
  })
}
// 根据 id 获取文章
export function getArticleById(data) {
  return http({
    url: '/admin/getArticleById/' + data,
    method: 'get',
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }
  })
}
// 删除文章
export function deleteArticle(data) {
  return http({
    url: '/admin/deleteArticle',
    method: 'post',
    data,
    withCredentials: true,
    header: { 'Access-Control-Allow-Origin': '*' }
  })
}

