var express = require('express');
var router = express.Router();

var admin = require('../controllers/api/admin');


router.post('/login', admin.login)
router.get('/users', admin.getUsers)
router.post('/users/add', admin.addUser)
router.post('/users/account/save/keys', admin.saveAPIKeys)
router.post('/users/account/save', admin.saveAccount)
router.post('/users/account/status', admin.toggleBotStatus)
router.post('/users/account/', admin.getAccount)
router.use('/', admin.authenticate)

router.get('/loginjwt', admin.loginjwt)


module.exports = router;
