const express = require('express');
const router = express.Router();

router.use('/user' , require('./authRoute'));

module.exports = router;

