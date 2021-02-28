module.exports = app => {
    const { router, controller } = app;
    router.get('/home/index', controller.home.default.index)
    router.get('/home/getArticleList', controller.home.default.getArticleList)
    router.get('/home/getArticleById/:id', controller.home.default.getArticleById)
    router.get('/home/getTypeList', controller.home.default.getTypeList)
    router.get('/home/getListById/:id', controller.home.default.getListById)
}