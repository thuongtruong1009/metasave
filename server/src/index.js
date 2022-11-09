const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const key = require('./config');
const ConnectDB = require('./config');
const router = require('./routes/main')

const { port, mongoURL } = key;

const app = express();

ConnectDB(mongoURL);

app.use(cors())
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});