var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    make: {type: String, required: true, unique: true},
    price: {type: Number, required: true, unique: true},
    image: {type: String, required: true, unique: true},
    model: {type: String, required: true, unique: true},
    summary: {type: String, required: true, unique: true},
    condition: {type: String, required: true, unique: true},
    category: {type: String, required: true, unique: true},
    buyInDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Product", productSchema);
