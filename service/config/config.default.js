/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614184376741_4570';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'blog',
    },
    // default configuration for all databases
    default: {

    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: { enable: false },
    // domainWhiteList: ['http://admin.yuming.cn', 'http://blog.yuming.cn']
    domainWhiteList: ['*']
  };

  config.cors = {
    // origin: '*', // 前端请求开启withCredentials:true, 不能使用通配符*
    // origin: 'http://127.0.0.1:3000', // 只允许这个域进行访问接口
    credentials: true, // 开启认证  允许cook跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  return {
    ...config,
    ...userConfig,
  };
};
