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
                            article.content as content,
                            article.count as count,
                            type.name as name, 
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
                            article.content as content,
                            FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time,
                            article.content as content,
                            type.name as name, 
                            type.id as type_id, 
                            type.sort as sort 
                    from article left join type on article.type_id = type.id where article.id = ${id}`
        const data = await app.mysql.query(sql)
        ctx.body = {
            data,
            status: 0,
            msg: 'ok'
        };
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
                            article.content as content,
                            article.count as count,
                            type.name as name, 
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
