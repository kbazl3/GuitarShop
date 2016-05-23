var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    make: String,
    price: Number,
    image: String,
    model: String,
    summary: String,
    condition: String,
    category: String,
    buyInDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Product", productSchema);
