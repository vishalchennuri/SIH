const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Regex to check if the phone number is exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10 digit phone number!`
        }
    },
    password: {
        type: String,
        required: true
    }
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
