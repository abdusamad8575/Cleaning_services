const express = require('express');
const {fetchData,orderDetails,fetchOrderDetails,statusUpdate}= require('../controller/userController')
const router = express.Router();

router.get('/fetchData',fetchData)
router.get('/orderDetails',fetchOrderDetails)
router.post('/orderDetails',orderDetails)
router.patch('/statusUpdate/:orderId', statusUpdate);



module.exports = router;
   