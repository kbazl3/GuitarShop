var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var lessonSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    email: {type: String, required: true},
    Instructor: String,
    date: Object,
    detail: String,
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Lesson", lessonSchema);
