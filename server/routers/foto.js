const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotocontroller');
const loginmiddle = require('../middleware/login');

router.post('/create', loginmiddle.isLogin, fotoController.createfoto)
router.get('/getall', fotoController.read)
router.delete('/delete/:id', fotoController.delete)
router.put('/like/:id', loginmiddle.isLogin, fotoController.votelike)
router.put('/edit/:id', loginmiddle.isLogin, fotoController.editFoto)
module.exports = router;
