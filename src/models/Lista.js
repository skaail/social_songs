const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    album: {
        type: String,
        required: true
    },

    band: {
        type: String,
        required: true
    },

    art: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userList = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [itemSchema]
})

const UserLista = mongoose.model("UserLista", userList)
module.exports = UserLista