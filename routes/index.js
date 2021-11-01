const router = require('koa-router')()
const indexController = require('../controller/indexController')
const oauthCheck = require('../middleWare/oauthCheck')
router.get('/', indexController.index)
router.get('/login', indexController.login)
router.get('/register', indexController.register)
router.post('/checkLogin', indexController.checkLogin)
router.get('/home', oauthCheck.sessionCheck)
router.get('/home', indexController.home)

router.get('/logout', indexController.logout)
router.get('/userManage', oauthCheck.sessionCheck)
router.get('/userManage', indexController.userManage)
module.exports = router
