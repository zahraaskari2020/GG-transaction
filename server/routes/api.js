const express=require('express');
const { getTransactions, loadTransactions, detailTransaction, updateComments} = require('../controllers/transaction');
const router=express.Router();

router.get('/transactions',getTransactions);
router.post('/transaction/load',loadTransactions);
router.post('/detail-transaction',detailTransaction);
router.put('/update-comment',updateComments);

module.exports = router;