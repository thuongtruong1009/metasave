const express = require('express');
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const { mongoURL } = require('./environment.config');
const ConnectDB = require('./db.config');
const router = require('../routes/index')

const app = express();

ConnectDB(mongoURL);

const corsOptions = {
    origin: "http://localhost:3001"
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/api', router)
require('../routes/auth.router')(app);
require('../routes/user.router')(app);

module.exports = app;