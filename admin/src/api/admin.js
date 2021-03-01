import http from '../utils/http'

// 文章分类
export function articleTypeList(data, config) {
  return http({
    url: '/admin/getTypeList',
    method: 'get',
    params: data,
    ...config
  })
}
// 添加文章
export function addArticle(data, config) {
  return http({
    url: '/admin/addArticle',
    method: 'post',
    data,
    ...config
  })
}
// 修改文章
export function updateArticle(data, config) {
  return http({
    url: '/admin/updateArticle',
    method: 'post',
    data,
    ...config
  })
}

