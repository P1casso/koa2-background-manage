const router = require('koa-router')()
const indexController = require('../controller/indexController')

router.get('/', indexController.index)

router.get('/login', indexController.login)

router.get('/logout', indexController.logout)

router.get('/CheckLogin', indexController.checkLogin)
router.post('/CheckLogin', indexController.checkLogin)

router.get('/register', indexController.register)

router.post('/registerCheck', indexController.registerCheck)

router.get('/registerSuccess', indexController.registerSuccess)

router.get('/viewNew', indexController.viewNew)

router.get('/moreAboutSoccer', indexController.showMoreAboutSoccer)

router.get('/moreAboutGame', indexController.showMoreAboutGame)

router.post('/submitComments', indexController.submitComments)

router.post('/searchArticle', indexController.searchArticle)

router.get('/error', indexController.error)

module.exports = router
