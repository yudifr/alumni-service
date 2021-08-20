const express = require('express');
const router = express.Router();
const alumni = require('./alumni');
const alumniController = require('../controllers/alumniController');
const db = require('../database/pool');


router.use((req,res,next)=>{
    if (req.headers['app-origins']) {
        next();
    } else {
        res.json('direct access not allowed');
    }
});

router.use('/alumni',alumni);

module.exports = router;