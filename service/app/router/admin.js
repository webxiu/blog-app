module.exports = app => {
    const { router, controller, middleware } = app;
    const adminauth = middleware.adminauth()
    router.post('/admin/login', controller.admin.default.login)
    router.post('/admin/getTypeList', adminauth, controller.admin.default.getTypeList)
}