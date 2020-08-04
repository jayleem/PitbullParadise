const Adoptable = require('../models/adoptable');
const COLLECTION = 'adoptables';

exports.getDogByIdAsync = async (req, res) => {
    //Query params
    //
    let query = {};
    let id = req.params.id;
    query['id'] = req.params.id;

    //MongoDB Query
    //
    const docRef = await Adoptable.findOne(query)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(401).json('Failed getting docs');
        });
}

exports.getDogsByQueryAsync = async (req, res) => {
    //Query params
    //
    let query = {};
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
        query = { $or: [{ id: regex }, { name: regex }, { gender: regex }, { breed: regex }, { traits: regex }] };
    };

    //MongoDB Query
    //
    const docRef = Adoptable.find(query).sort({ 'intakeDate': -1 })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(401).json('Failed getting docs');
        });
};

exports.getAllDogsAsync = async (req, res) => {
    //skip/limit vars 
    //
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    //MongoDB Query
    //
    const data = await Adoptable.find({}).skip(skip).limit(limit).sort({ 'intakeDate': -1 })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(401).json('Failed getting docs')
        });
};

exports.getFeaturedDogAsync = async (req, res) => {

    //Query vars
    //
    query = {};
    query['isFeatured'] = true;

    //MongoDB Query
    //
    const docRef = await Adoptable.findOne(query)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(401).json('Failed getting docs')
        });
}

exports.getDocCountAsync = async(req,res) => {
    const docCount = await Adoptable.find({}).countDocuments();
    res.status(200).json(docCount);
}

exports.getAnalyticsReportAsync = async (req, res) => {
    //MongoDB Query used for analytics portion of admin panel
    //
    var report = null;
    const countAdoptables = await Adoptable.find({}).countDocuments();
    const countMales = await Adoptable.find({ 'gender': new RegExp('^' + 'male' + '$', "i") }).countDocuments();
    const countFemales = await Adoptable.find({ 'gender': new RegExp('^' + 'female' + '$', "i") }).countDocuments();
    const countPuppies = await Adoptable.find({ 'age': { $gt: 0, $lt: 2 } }).countDocuments();
    const countAdults = await Adoptable.find({ 'age': { $gt: 2, $lt: 6 } }).countDocuments();
    const countSeniors = await Adoptable.find({ 'age': { $gt: 6, $lt: 99 } }).countDocuments();

    //breeds
    //
    let breedsArr = [];
    const countDistinctBreeds = await Adoptable.aggregate([{ $group: { _id: "$breed", count: { "$sum": 1 } } }])
        .then(docs => {
            docs.forEach(doc => {
                breedsArr.push([doc._id, doc.count]);
            })
        });
    //types
    //
    let typesArr = [];
    const countDistinctTypes = await Adoptable.aggregate([{ $group: { _id: { $toLower: "$type" }, count: { "$sum": 1 } } }])
        .then(docs => {
            docs.forEach(doc => {
                typesArr.push([doc._id, doc.count]);
            })
        });
    //intake dates
    //
    let intakeDatesArr = [];
    const intakeDatesRef = await Adoptable.aggregate([
        {
            "$project": {
                "intakeDate": { "$toDate": "$intakeDate" }
            }
        },
        {
            "$group": {
                "_id": { "$dateToString": { "format": "%Y-%m", "date": "$intakeDate" } },
                "count": { "$sum": 1 }
            }
        }
    ])
        .then(docs => {
            docs.forEach(doc => {
                intakeDatesArr.push([doc._id, doc.count]);
            })
        });
    //sort the intakesDatesArr
    //
    intakeDatesArr.sort(([a], [b]) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return (dateA == dateB ? 0 : dateA > dateB ? 1 : -1);
    })
    //generate file report
    //
    report = {
        adoptables: {
            total: countAdoptables,
            totalMales: countMales,
            totalFemales: countFemales,
            totalPuppies: countPuppies,
            totalAdults: countAdults,
            totalSeniors: countSeniors,
            breeds: breedsArr,
            types: typesArr,
            intakeDates: intakeDatesArr
        }
    }
    //console.log(report.adoptables);

    if (report === null) {
        res.status(400).json('Failed generating report.');
    } else {
        res.status(200).json(report);
    }
};

exports.dogController;