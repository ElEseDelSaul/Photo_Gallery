const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    public_id: { type: String }
}, {
    timestamps: true
})

module.exports = model('Photo', PhotoSchema);