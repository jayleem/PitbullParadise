//Mongoose
const mongoose = require('mongoose');

//Schema
var adoptableSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        maxLength: 255
    },
    breed: {
        type: String,
        required: true,
        maxLength: 255
    },
    age: {
        type: Number,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true,
        collation: {
            locale: 'en',
            strength: 2,
        }
    },
    traits: {
        type: [String]
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adoptionFee: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true
    },
    hasMedicalNeeds: {
        type: Boolean,
        required: true
    },
    healthDesc:  {
        type: String,
        required: true
    },
    intakeDate: {
        type: Date,
        required: true
    },
    notes: {
        type: [String]
    }
});

const adoptableDb = mongoose.connection.useDb('adoptable');
//Compile and Export model from schema
module.exports = adoptableDb.model('Adoptable', adoptableSchema);