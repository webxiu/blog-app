import http from '../utils/http'

// 文章分类
export function articleTypeList(data, config) {
  return http({
    url: '/admin/getTypeList',
    method: 'post',
    params: data,
    ...config
  })
}

export function createAction(data) {
  return http({
    url: '/admin/xxxxx',
    method: 'post',
    data
  })
}

