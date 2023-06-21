const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ status: 'Success' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


const uri = "mongodb+srv://mhShohan:mhshohan@mern.fqnmn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // await client.db("quiz").collection('qna').insertMany(qna);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/all', async (req, res) => {
            const quiz = await client.db("quiz").collection('qna').aggregate([{ $sample: { size: 5 } }]).toArray();
            res.json({ status: 'Success', quiz });
        });
    } finally {

    }
}
run().catch(console.dir);
