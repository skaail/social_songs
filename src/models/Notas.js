const mongoose = require('mongoose');

const notasSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    album: {
        type: String,
        required: true
    },

    nota: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
      }
})

notasSchema.pre('save', async function() {
    try {
        const user = await mongoose.model('User').findByIdAndUpdate(
            this.author,
            { $push: {notas: this._id}},
            { new: true}
        )
    } catch (err) {
        console.log(err)
    }
})

const Notas = mongoose.model('Notas', notasSchema)

module.exports(Notas)