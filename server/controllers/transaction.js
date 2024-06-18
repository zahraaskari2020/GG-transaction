const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const startTimestamp = Date.parse(startDate);
        const endTimestamp =Date.parse(endDate);
        const transactions = await Transaction.find({
            date: { $gte: startTimestamp, $lte: endTimestamp } ,
            status : { $in: ["COMPLETED", "IN PROGRESS", "REJECTED"] } 
        }).sort ({date:1});
        const formattedTransactions = transactions.map(transaction => ({
            ...transaction._doc,
            date: new Date(transaction.date).toISOString().slice(0, 10)
        }));
        res.json(formattedTransactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loadTransactions = async (req, res) => {
   
    try {
        const data = req.body.data;
        await Transaction.insertMany(data);
        res.status(201).json({ message: 'Transactions loaded successfully',});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
