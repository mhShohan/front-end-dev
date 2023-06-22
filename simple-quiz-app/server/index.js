const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Quiz = require('./QNA');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    return res.json({ status: 'Success' });
});

app.get('/all', async (req, res) => {
    try {
        const quiz = await Quiz.aggregate([{ $sample: { size: 5 } }]);
        return res.status(200).json({ status: 'Success', quiz });
    } catch (error) {
        console.log(error);
    }
});

const uri = "mongodb+srv://mhShohan:mhshohan@mern.fqnmn.mongodb.net/quiz?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});


