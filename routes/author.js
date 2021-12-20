const router = require('koa-router')()
const authorController = require("../controller/authorController");
const oauthCheck = require("../middleWare/oauthCheck");

router.prefix('/author')

router.get('/',oauthCheck.authorCheck)
router.get('/',authorController.index)

router.get('/articleManage',oauthCheck.authorCheck)
router.get('/articleManage', authorController.articleManage)

router.get('/addArticles',oauthCheck.authorCheck)
router.get('/addArticles', authorController.addArticles)

router.post('/saveArticle',oauthCheck.authorCheck)
router.post('/saveArticle',authorController.saveArticle)

router.get('/editArticle',oauthCheck.authorCheck)
router.get('/editArticle',authorController.editArticle)

router.post('/updateArticle',oauthCheck.authorCheck)
router.post('/updateArticle',authorController.updateArticle)

router.get('/deleteArticle',oauthCheck.authorCheck)
router.get('/deleteArticle',authorController.deleteArticle)

router.get('/CommentMe',oauthCheck.authorCheck)
router.get('/CommentMe',authorController.commentMe)

module.exports = router