var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var adminSchema = new Schema({
    username: String,
    email: String,
    password: String
});

adminSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});

adminSchema.methods.verifyPassword = function(reqBodyPassword) {
    var user = this;
    return bcrypt.compareSync(reqBodyPassword, user.password);
};


module.exports = mongoose.model("Admins", adminSchema);
