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
    /** 获取文章列表 */
    async getArticleList() {
        const { ctx, app } = this;
        const sql = `SELECT article.id as id, 
                    article.title as title, 
                    article.type_id as type_id,
                    article.introduce as introduce,
                    FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                    article.count as count,
                    type.type as type
                    FROM article LEFT JOIN type on article.type_id = type.id 
                    ORDER BY article.id DESC`
        const data = await app.mysql.query(sql)
        ctx.body = {
            data,
            status: 0,
            msg: 'ok'
        };
    }

    /** 添加文章 */
    async addArticle() {
        const { ctx, app } = this;
        const articleInfo = ctx.request.body
        const { insertId, affectedRows } = await app.mysql.insert('article', articleInfo) // type: 数据表
        ctx.body = {
            data: {
                insertId,
                isScuccess: affectedRows === 1
            },
            status: 0,
            msg: 'ok'
        };
    }

    /** 修改文章 */
    async updateArticle() {
        const { ctx, app } = this;
        const articleInfo = ctx.request.body
        const { affectedRows } = await app.mysql.update('article', articleInfo) // type: 数据表
        ctx.body = {
            data: null,
            status: 0,
            msg: affectedRows === 1 ? '修改成功' : '修改失败',
        };
    }
    /** 通过 id 获取文章 */
    async getArticleById() {
        const { ctx, app } = this;
        const id = ctx.params.id
        if (!id) {
            ctx.body = {
                data: null,
                status: 400,
                msg: 'error',
            };
            return
        }
        const sql = `select article.id as id, 
                            article.title as title, 
                            article.introduce as introduce,
                            FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                            article.content as content,
                            article.count as count,
                            type.id as type_id 
                    from article left join type on article.type_id = type.id where article.id = ${id}`
        const data = await app.mysql.query(sql)
        if (data[0]) {
            ctx.body = {
                data: data[0],
                status: 0,
                msg: 'ok'
            };
        } else {
            ctx.body = {
                data: null,
                status: 0,
                msg: 'ok'
            };
        }
    }
    /** 删除文章 */
    async deleteArticle() {
        const { ctx, app } = this;
        const { id } = ctx.request.body
        const { affectedRows } = await app.mysql.delete('article', { 'id': id })
        ctx.body = {
            data: null,
            status: 0,
            msg: affectedRows === 1 ? '删除成功' : '删除失败',
        };
    }

}

module.exports = AdminController;
