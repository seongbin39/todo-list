const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, require: true, trim: true },
    age: { type: Number, require: true },
    email: { type: String, require: true, trim: true },
    todos: { type: Array, require: true, trim: true }
})