const express = require('express');
const router = express.Router();
const alumni = require('./alumni');

router.use((req,res,next)=>{
    if (req.headers['app-origins']) {
        next();
    } else {
        res.json('direct access not allowed');
    }
});
router.use('/alumni',alumni);
module.exports = router;
