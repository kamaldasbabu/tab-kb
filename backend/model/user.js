const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


var schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

    schema.statics.hashPassword = (password)=>{
        return bcrypt.hashSync(password, 10);
    }
    schema.methods.isValid = (hashedpassword)=> {
        return bcrypt.compareSync(hashedpassword, this.password);
    }
module.exports = mongoose.model('User', schema);