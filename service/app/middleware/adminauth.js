module.exports = options => {
    return async function adminauth(ctx, next) {
        console.log(ctx.session.openId)
        await next()
        // if (ctx.session.openId) {
        //     await next()
        // } else {
        //     ctx.body = { data: null, status: 401, msg: '没有登录' }
        // }
    }
}
