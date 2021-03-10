const mongoose = require('mongoose');
var restaurantSchema = new mongoose.Schema({
    resId: {
        type: Number,
        required: true
    },
    resName: {
        type: String,
        required: true
    },
    resAddress :{
        type: String,
        required: true
    },
    resPin: {
        type: Number, required: true
    },
    resRating :{
        type: Number,
        
    }

});

module.exports = mongoose.model('Restaurant', restaurantSchema);
