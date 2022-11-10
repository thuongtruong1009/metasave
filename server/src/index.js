const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const key = require('./config/environment.config');
const ConnectDB = require('./config/db.config');
const router = require('./routes/index')

const { port, mongoURL } = key;

const app = express();

ConnectDB(mongoURL);

const corsOptions = {
    origin: "http://localhost:3001"
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/api', router)
require('./routes/auth.router')(app);
require('./routes/user.router')(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});