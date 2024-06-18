const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = {};
        query.status = {
            $in: ["COMPLETED", "IN PROGRESS", "REJECTED"]
          };
        if (startDate && endDate) {
            query.date = {
              $gte: new Date(startDate).getTime(),
              $lte: new Date(endDate).getTime()
            };
        }

        const transactions = await Transaction.find(query).sort({date:1});
        
        let result = [];
        transactions.forEach(transaction => {
            result.push ({
                id:transaction.id,
                date:new Date(transaction.date).toISOString().slice(0, 10),
                comments: transaction.comments
            })
        })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.detailTransaction = async (req, res) => {
    try {
        const transactionId = req.body.id;
        const transaction = await Transaction.findOne({id:transactionId});
       
        res.status(200).json({
            id:transaction.id,
            date: await this.formatDate(transaction.date),
            comments:transaction.comments
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateComments = async (req,res) => {
    try {
        const transactionId = req.body.id;
        const comments = req.body.comments;
        await Transaction.updateOne(
            { id: transactionId },
            {comments:comments}
          );
       
        res.status(200).json({
            message : "transaction updated successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.loadTransactions = async (req, res) => {
   
    try {
        const data = req.body.data;
        await Transaction.insertMany(data);
        res.status(200).json({ message: 'Transactions loaded successfully',});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.formatDate = async (timestamp)=> {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
