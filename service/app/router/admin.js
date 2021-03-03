module.exports = app => {
    const { router, controller, middleware } = app;
    const adminauth = middleware.adminauth()
    router.post('/admin/login', controller.admin.default.login)
    router.get('/admin/getTypeList', adminauth, controller.admin.default.getTypeList)
    router.post('/admin/addArticle', adminauth, controller.admin.default.addArticle)
    router.post('/admin/updateArticle', adminauth, controller.admin.default.updateArticle)
    router.get('/admin/getArticleList', adminauth, controller.admin.default.getArticleList)
    router.post('/admin/deleteArticle', adminauth, controller.admin.default.deleteArticle)
    router.get('/admin/getArticleById/:id', adminauth, controller.admin.default.getArticleById)
}