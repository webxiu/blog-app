import http from '../../utils/http'
export function getList(data) {
  return http({
    url: '/admin/list',
    method: 'get',
    params: data
  })
}

export function createAction(data) {
  return http({
    url: '/admin/create',
    method: 'post',
    data
  })
}

