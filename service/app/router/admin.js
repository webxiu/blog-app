module.exports = app => {
    const { router, controller } = app;
    router.get('/admin/index', controller.admin.default.index)
    router.get('/admin/list', controller.admin.default.list)
}