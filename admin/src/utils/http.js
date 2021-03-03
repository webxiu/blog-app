import axios from 'axios'
import { message } from 'antd'
// import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import stringify from 'qs/lib/stringify'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://127.0.0.1:7002',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // const token = 'fkajfkajflajf_fkjafk' //getToken()
    // // if (token) {
    // //     config.headers.common['Authorization'] = token
    // // }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(response => {
  const res = response.data
  // if (response.headers.authorization) {
  //     store.dispatch('user/set_token', response.headers.authorization)
  // }

  console.log('响应拦截===', res)
  if (res.status === 0) {
    return res
  } else {
    if (res.status === 401) {
      // store.dispatch('user/resetToken').then(() => {
      //     Message.error('token过期，请重新登录')
      //     location.reload()
      //     location.href = '/login'
      // })
      // localStorage.removeItem('openId')
      message.error(res.msg || 'token过期，请重新登录')
      // window.location.href = '/login'
    } else {
      // message.error(res.msg || 'token过期，请重新登录')
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  }
}, err => {
  if (err.status !== 0) {
    message.error(err.msg || '网络错误')
  }
  return Promise.reject(err)
})

/**
 * 清除请求空传参
 * @param {Object} config
//  */
// function delUndefined(ob) {
//   for (const e in ob) {
//     if (typeof (ob[e]) === 'undefined' || ob[e] === null) {
//       delete ob[e]
//     } else if (ob[e].constructor === Object) {
//       if (Object.keys(ob[e]).length === 0) {
//         delete ob[e]
//       } else {
//         delUndefined(ob[e])
//       }
//     } else if (ob[e].constructor === Array) {
//       ob[e].map(function (seg) {
//         if (typeof (seg) === 'object') {
//           delUndefined(seg)
//         }
//       })
//     } else {
//       if (typeof (ob[e]) === 'string') {
//         ob[e] = ob[e].replace(/(^\s*)|(\s*$)/g, '')
//       }
//     }
//   }
//   return ob
// }

/**
 * http请求
 * @param {Object} config
 */
// const http = function (config) {
//     const params = { url: config.url, method: config.method }
//     if (config.hasOwnProperty('data')) {
//         params.data = delUndefined(config.data)
//     }
//     if (config.hasOwnProperty('params')) {
//         params.params = delUndefined(config.params)
//         params.paramsSerializer = params => {
//             return stringify(params)
//         }
//     }
//     return service(params)
// }


// export default http
export default service
