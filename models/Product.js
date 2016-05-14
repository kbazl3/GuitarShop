var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    make: {
        type: String
        // required: true,
        // unique: true,
        // index: true
    },
    price: {
        type: Number
        // required: true,
        // min: 0
    },
    image: {
        type: String
        // required: true
    },

    model: {
        type: String
    },
    summary: {
        type: String
    },
    condition: {
        type: String
    },
    category: {
        type: String
    },
    buyInDate: { type: Date, default: new Date()}
});

module.exports = mongoose.model("Product", productSchema);
