'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    /** 获取文章列表 */
    async getArticleList() {
        const { ctx, app } = this;
        const sql = `select article.id as id, 
                    article.title as title, 
                    article.introduce as introduce,
                    FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                    article.count as count,
                    type.type as type, 
                    type.sort as sort 
                    from article left join type on article.type_id = type.id`
        const data = await app.mysql.query(sql)
        ctx.body = {
            data,
            status: 0,
            msg: 'ok'
        };
    }
    /** 获取文章详情 */
    async getArticleById() {
        const { ctx, app } = this;
        const id = ctx.params.id
        const sql = `select article.id as id, 
                            article.title as title, 
                            article.introduce as introduce,
                            article.count as count,
                            FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                            article.content as content,
                            type.type as type, 
                            type.id as type_id, 
                            type.sort as sort 
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

    /** 根据类别id获取文章列表 */
    async getListById() {
        const { ctx, app } = this;
        const id = ctx.params.id
        const sql = `select article.id as id, 
                            article.title as title, 
                            article.introduce as introduce,
                            FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                            article.count as count,
                            type.type as type, 
                            type.sort as sort 
                    from article left join type on article.type_id = type.id where type_id = ${id}`
        const data = await app.mysql.query(sql)
        ctx.body = {
            data,
            status: 0,
            msg: 'ok'
        };
    }
}

module.exports = HomeController;
