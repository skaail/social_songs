const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Counter = require('./counterSchema')

const userSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },

  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  notas: [{type: mongoose.Schema.Types.ObjectId, ref: "Notas"}]
})

userSchema.pre('save', function (next) {
  const user = this;

  // Check if the document is new, if yes, get the next available ID from the counter
  if (user.isNew) {
    Counter.findByIdAndUpdate(
      { _id: 'userId' }, // Use a unique identifier for the counter
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
      .then((counter) => {
        user._id = counter.sequence_value;
        next();
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    // If the document is not new, proceed without incrementing the counter
    next();
  }
});

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
    } catch (error) {
      return next(error)
    }
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User