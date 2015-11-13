/**
 * Created by olli on 08.11.2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getgui', function(req, res, next) {
    res.render('getgui', { title: 'getgui' });
});



module.exports = router;
