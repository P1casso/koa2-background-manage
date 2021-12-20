const router = require('koa-router')()
const adminController = require("../controller/adminController");
const oauthCheck = require("../middleWare/oauthCheck");

router.prefix('/admin')

router.get('/', oauthCheck.adminCheck)
router.get('/', adminController.index)

router.get('/login', adminController.login)

router.post('/CheckLogin', adminController.checkLogin)
router.get('/CheckLogin', adminController.checkLogin)

router.get('/addUser', oauthCheck.adminCheck)
router.get('/addUser', adminController.addUser)


router.post('/searchArticle', adminController.searchArticle)

router.get('/CarouselManage', oauthCheck.adminCheck)
router.get('/CarouselManage', adminController.carouselManage)

router.post('/searchUser', adminController.searchUser)

router.get('/deleteUser', adminController.deleteUser)

router.post('/saveUser', adminController.saveUser)

router.get('/logout', adminController.logout)

router.post('/updateUser', adminController.updateUser)

router.get('/userManage', oauthCheck.adminCheck)
router.get('/userManage', adminController.userManage)

router.get('/articleManage', oauthCheck.adminCheck)
router.get('/articleManage', adminController.articleManage)

router.get('/commentManage', oauthCheck.adminCheck)
router.get('/commentManage', adminController.commentManage)

router.get('/deleteComment', adminController.deleteComment)

router.get('/articleManage', oauthCheck.adminCheck)
router.get('/articleManage', adminController.articleManage)

router.get('/editUser', adminController.editUser)

router.get('/previewArticle', adminController.previewArticle)

router.get('/resetUserPass', adminController.resetUserPass)

router.get('/approved', adminController.approved)

router.get('/violation', adminController.violation)

router.get('/setCarousel', adminController.setCarousel)

router.get('/cancelCarousel', adminController.cancelCarousel)
module.exports = router