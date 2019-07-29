const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    images: Array
});

module.exports = mongoose.model('Item',itemSchema); 