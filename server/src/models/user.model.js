const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        salt: String
    })
)

module.exports = User