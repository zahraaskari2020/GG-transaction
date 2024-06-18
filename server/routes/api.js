const express=require('express');
const { getTransactions, loadTransactions} = require('../controllers/transaction');
const router=express.Router();

router.get('/transaction',getTransactions);
router.post('/transaction/load',loadTransactions);

module.exports = router;