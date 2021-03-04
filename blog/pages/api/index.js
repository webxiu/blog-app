import http from '../../utils/http'

// 文章列表
export function articleList(data) {
  return http({
    url: '/home/getArticleList',
    method: 'get',
    params: data
  })
}

// 文章详情
export function articleDetail(data) {
  console.log('data', data)
  return http({
    url: '/home/getArticleById/' + data,
    method: 'get',
    params: data
  })
}
// 文章分类
export function articleTypeList(data) {
  return http({
    url: '/home/getTypeList',
    method: 'get',
    params: data
  })
}
// 根据类别id获取文章列表
export function getListById(data) {
  return http({
    url: '/home/getListById/' + data,
    method: 'get'
  })
}




/**
 * 导出
 * @param {Object} data
 * @param {String} url
 */
export function exportsDownload(data, url) {
  return http({
    url,
    method: 'GET',
    params: data,
    responseType: 'arraybuffer'
  })
}
