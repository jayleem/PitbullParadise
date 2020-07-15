var mongoose = require('../models/adoptable');
const COLLECTION = 'adoptables';

exports.getDogByIdAsync = async (req, res) => {
    //query id param
    //
    let id = req.params.id;

    //Dynamic query object
    //
    query = {};

    //id
    //
    query['id'] = req.params.id;
    mongoose.db.collection(COLLECTION).findOne(query, (err, docs) => {
        if (err) {
            res.json('Failed getting docs');
        } else {
            res.json(docs);
        }
    });
}

exports.getDogsByQueryAsync = async (req, res) => {
    //query object
    //
    let query = {};
    //query vars age, gender, and search terms
    //
    let age = req.query.age;
    let gender = req.query.gender;
    let search = req.query.search;

    //Age
    //
    if (typeof age === 'string') {
        if (age === 'puppy') {
            query['age'] = { $gt: 0, $lt: 2 };
        }
        else if (age === 'adult') {
            query['age'] = { $gt: 2, $lt: 6 };
        }
        else if (age === 'senior') {
            query['age'] = { $gt: 6, $lt: 99 };
        }
    };

    //Gender
    //
    if (typeof gender === 'string') {
        if (gender === 'male') {
            query['gender'] = new RegExp('^' + 'male' + '$', "i")
        }
        else if (gender === 'female') {
            query['gender'] = new RegExp('^' + 'female' + '$', "i")
        }
    };

    //Search terms
    //
    if (typeof search === 'string' && search !== '' && search.length <= 255) {
        let regex = new RegExp(search, "i");
        query = { $or: [{ id: regex }, { name: regex}, { gender: regex }, { breed: regex }, { traits: regex }] };
    };
    const data = mongoose.db.collection(COLLECTION).find(query).sort({'intakeDate':-1});
    data.toArray((err, docs) => {
        if (err) {
            res.json('Failed getting docs');
        } else {
            res.json(docs);
        }
    });
};

exports.getAllDogs = async (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const data = mongoose.db.collection(COLLECTION).find({}).skip(skip).limit(limit).sort({'intakeDate':-1});
    data.toArray((err, docs) => {
        if (err) {
            res.json('Failed getting docs');
        } else {
            res.json(docs);
        }
    });
};

exports.getFeaturedDogAsync = async (req, res) => {

    //Query object
    //
    query = {};

    //isFeatured
    //
    query['isFeatured'] = true;

    mongoose.db.collection(COLLECTION).findOne(query, (err, docs) => {
        if (err) {
            res.json('Failed getting docs');
        } else {
            res.json(docs);
        }
    });
}

exports.dogController;