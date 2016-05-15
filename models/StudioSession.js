var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var studioSessionSchema = new Schema({
        firstName: String,
        lastName: String,
        phone: Number,
        email: String,
        Instructor: String,
        date: Object,
        detail: String,
        dateCreated: {type: Date, default: new Date()}
    });


module.exports = mongoose.model("StudioSession", studioSessionSchema);
