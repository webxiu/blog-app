import http from '../utils/http'

// 登录
export function login(data) {
  return http({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 文章详情
export function articleDetail(data) {
  return http({
    url: '/admin/home/' + data,
    method: 'get',
    params: data
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
