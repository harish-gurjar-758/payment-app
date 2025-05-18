const express = require('express');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { senderId, receiverUpiId, amount } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ upiId: receiverUpiId });

    if (!sender || !receiver || sender.balance < amount) {
        return res.status(400).json({ error: "Transaction failed" });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await Transaction.create({ sender: sender.upiId, receiver: receiver.upiId, amount, type: 'send' });
    await Transaction.create({ sender: sender.upiId, receiver: receiver.upiId, amount, type: 'receive' });

    res.json({ success: true });
});

router.get('/history/:upiId', async (req, res) => {
    const { upiId } = req.params;
    const txns = await Transaction.find({
        $or: [{ sender: upiId }, { receiver: upiId }]
    }).sort({ date: -1 });
    res.json(txns);
});

module.exports = router;
