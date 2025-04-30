const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: [true, "Board id must be present"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "No Content Present"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

const boardModel = mongoose.model("Board", boardSchema)

module.exports = boardModel