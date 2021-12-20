const router = require('koa-router')()

const adminController = require("../../controller/adminController");
const userController = require("../../controller/userController");
const oauthCheck = require("../../middleWare/oauthCheck");
const indexController = require("../../controller/indexController");
// router.all('*',oauthCheck.apiJwtCheck)
// router.post('/loginGetToken',userController.loginGetToken)
// router.get('/userInfo/:id',userController.getUserInfoById)
router.get('/myInfo',oauthCheck.sessionCheck)
router.get('/myInfo',userController.myInfo)
router.get('/editInformation',oauthCheck.sessionCheck)
router.get('/editInformation',userController.editInfo)
// router.get('/updateInformation',userController.updateInformation)
router.post('/updateInformation',userController.updateInformation)

// router.post('/updateUser', userController.updateUser)
router.get('/editInfo', userController.editInfo);

router.get('/editUser', userController.editInfo)
router.post('/editUser', userController.editInfo)
router.get('/myComment', userController.myComment)

router.get('/authorApply',userController.authorApply);
router.get('/becomeAuthor',userController.becomeAuthor);
router.post('/becomeAuthor',userController.becomeAuthor);
module.exports = router