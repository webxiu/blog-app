'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    // 判断用户名密码是否正确
    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body
        const sql = `select username from user where username = '${username}' and password = '${password}'`;
        const res = await app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            const openId = new Date().getTime()
            ctx.session.openId = { openId }
            ctx.body = {
                data: { openId },
                status: 0,
                msg: '登录成功'
            }

        } else {
            ctx.body = {
                data: null,
                status: 400,
                msg: '登录失败'
            }
        }
    }
    /** 获取分类类型 */
    async getTypeList() {
        const { ctx, app } = this;
        const data = await app.mysql.select('type') // type: 数据表
        ctx.body = {
            data,
            status: 0,
            msg: 'ok'
        };
    }
}

module.exports = AdminController;
