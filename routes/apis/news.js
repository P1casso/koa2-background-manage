const router = require('koa-router')()
const testController = require('../../controller/testController')
const adminController = require("../../controller/adminController");
const indexController = require("../../controller/indexController");
const apiJwtCheck = require("../../middleWare/oauthCheck");
 const oauthCheck = require("../../middleWare/oauthCheck")
// router.prefix('/api/user')
router.get('/getNewsByTypeNum/:newsTypeId/:newsNum',testController.getNewsByTypeNum)
// router.get('/deleteArticle/:articleId',adminController.deleteArticle)
// router.get('/news/:id',indexController.viewNew)
// router.post('/loginGetToken',adminController.loginGetToken)
// router.get('/userInfo/:id',indexController.getUserInfoById)
// router.all('*',oauthCheck.apiJwtCheck)
module.exports = router