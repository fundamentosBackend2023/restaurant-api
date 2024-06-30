const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    spentAmount: {
        type: Number,
        min: 100
    }
});

const clientModel = model('clients', clientSchema);

module.exports = clientModel;