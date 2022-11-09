const mongoose = require('mongoose');

async function ConnectDB(mongoURL) {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDB;