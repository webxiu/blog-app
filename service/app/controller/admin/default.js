'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'Admin, egg';
    }
    async list() {
        const { ctx } = this;
        ctx.body = 'Admin/list.8888888';
    }
}

module.exports = AdminController;
