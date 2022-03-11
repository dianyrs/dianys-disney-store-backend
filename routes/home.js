const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    res.render('home/index', {
        data: {
            success: true,
            message: 'Hello World!!!'
        }
    });

});

module.exports = router;
