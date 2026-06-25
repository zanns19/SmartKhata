const express = require('express');
const app = express()
const port = 3000
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(()=>
    console.log("connected to DB")
).catch((err)=>
    console.log(err)
)

const khataSchema = new mongoose.Schema({
    name: String,
    note: String,
    date: Date,
    amount: Number,
});
const KhataModel = mongoose.model('Khata', khataSchema);

app.get('/', async(req, res) => {
    try{
        const khatas = await KhataModel.find();
        res.json(khatas);
    } catch(err){
        res.status(500).json({message: err.message});
    }
    
});
app.post('/', async(req, res) => {
    try {
        const khatas = await KhataModel.create({
            name: req.body.name,
            note: req.body.note,
            date: req.body.date,
            amount: req.body.amount
        });
        res.json({success: true, data: khatas});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});
app.delete('/', async(req, res) => {
    try{
        const khata = await KhataModel.deleteOne({
            _id: req.body._id
        });
        res.send({success: true, message: "Khata deleted successfully"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
});
app.put("/", async (req, res) => {
    try {
        await KhataModel.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    name: req.body.name,
                    note: req.body.note,
                    date: req.body.date,
                    amount: req.body.amount
                }
            }
        );

        res.send({
            success: true,
            message: "Updated Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})