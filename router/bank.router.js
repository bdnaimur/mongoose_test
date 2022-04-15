const express = require('express');

const router = express.Router();
const Bank = require('../model/bank.model');

router.post('/addBank', async (req, res) => {

    try {
        let bank = new Bank(req.body);
        console.log(bank);
        const data = await bank.save()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/banks', async (req, res) => {

    try {
        const data = await Bank.find()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.delete('/banks/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Bank.findByIdAndDelete({_id: id})
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.patch('/banks/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let bank = await Bank.findOne({ _id: id });
      if (!bank) {
        res.status(404).json({
          status: false,
          message: 'No Bank Found',
        });
      }
      Object.keys(req.body).forEach((el) => {
        bank[el] = req.body[el];
      });
      bank = await bank.save();
      res.status(200).json({
        status: true,
        data: { bank },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });

module.exports = router;