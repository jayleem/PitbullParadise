var mongoose = require('../models/adoptable');
const COLLECTION = 'adoptables';

//Get data sent from the /api/admin/create route
//
exports.createDogAsync = async (req, res) => {
    const data = JSON.parse(req.query.data);
    const id = data.id;
    const regex = new RegExp('^' + id + '$', "i");

    if (data) {
        //check that doc doesn't exist
        //
        const doc = await mongoose.db.collection(COLLECTION).findOne({ 'id': regex });
        //logic for inserting new document
        //
        if (!doc) {
            const docRef = await mongoose.db.collection(COLLECTION).insertOne(data)
                .then(() => {
                    res.status(200).json({ 'message': `Document with id ${id} was created successfully`, type: 'success' });
                })
                .catch(err => {
                    res.status(200).json({ 'message': `Error processing request document with id ${id} was not created`, type: 'error' });
                })
        } else {
            res.status(200).json({ 'message': `Error document containing id ${id} already exists`, type: 'error' });
        }
    }
    //emit db changes to clients
    //
    var io = req.app.get('socketio');
    io.emit('created', { 'msg': `Document ${id} created` });
}

//delete dog by id sent from the /api/admin/delete/:id route
//
exports.deleteDogByIdAsync = async (req, res) => {
    const id = req.params.id;
    const regex = new RegExp('^' + id + '$', "i");

    const docRef = await mongoose.db.collection(COLLECTION).findOneAndDelete({ 'id': regex })
        .then(() => {
            res.status(200).json({ 'message': `Document with id ${id} was deleted successfully`, type: 'success' });
        })
        .catch(err => {
            res.status(200).json({ 'message': `No document with id ${id} was found`, type: 'error' });
        })
    //emit db changes to clients
    //
    var io = req.app.get('socketio');
    io.emit('deleted', { 'msg': `Document ${id} was deleted` });
}

//delete all dogs sent from the /api/admin/delete route
//
exports.deleteAllDogAsync = async (req, res) => {
    const data = await mongoose.db.collection(COLLECTION).find({});
    const count = await mongoose.db.collection(COLLECTION).find({}).count();
    if (data) {
        await mongoose.db.collection(COLLECTION).deleteMany();
        res.status(200).json({ 'message': `${count} documents were deleted successfully`, type: 'success' });
    }
    //emit db changes to clients
    //
    var io = req.app.get('socketio');
    io.emit('deleted', { 'msg': `All Documents were deleted` });
}

//Update document with data sent from the /api/admin/update route
//
exports.updateDogByIdAsync = async (req, res) => {
    //convert stringified JSON back to JSON object
    //
    const data = JSON.parse(req.query.data);

    //update the document which contains the dogs id
    //
    if (data) {
        const doc = await mongoose.db.collection(COLLECTION)
            .findOneAndUpdate(
                { 'id': data.id },
                {
                    $set:
                    {
                        id: data.id,
                        age: data.age,
                        name: data.name,
                        type: data.type,
                        breed: data.breed,
                        birthdate: data.birthdate,
                        gender: data.gender,
                        traits: data.traits,
                        image: data.image,
                        description: data.description,
                        adoptionFee: data.adoptionFee,
                        isFeatured: data.isFeatured,
                        hasMedicalNeeds: data.hasMedicalNeeds,
                        healthDesc: data.healthDesc,
                        intakeDate: data.intakeDate,
                        notes: data.notes,
                    }
                },
                (err) => {
                    if (!err) {
                        res.status(200).json({ 'message': `Document with id ${data.id} was updated successfully`, type: 'success' });
                    } else {
                        res.status(200).json({ 'message': `No document with id ${data.id} was found`, type: 'error' });
                    }
                })
    }
    //emit db changes to clients
    //
    var io = req.app.get('socketio');
    io.emit('updated', { 'msg': `Document ${id} was updated` });
}

exports.setFeaturedAsync = async (req, res) => {
    let id = req.params.id;

    //first promise update the document containing the dogs id passed as a paramater
    //
    const promise1 = await mongoose.db.collection(COLLECTION)
        .findOneAndUpdate(
            { 'id': id },
            {
                $set:
                {
                    isFeatured: true,
                }
            });

    //second promise update documents not equal to the dogs id passed as a paramater
    //
    const promise2 = await mongoose.db.collection(COLLECTION)
        .updateMany(
            { 'id': { $ne: id } },
            {
                $set:
                {
                    isFeatured: false,
                }
            });

    //promises array
    //
    Promise.all([promise1, promise2])
        .then(() => {
            res.status(200).json({ 'message': `Document with id ${id} was updated successfully`, type: 'success' });
        })
        .catch(err => {
            res.status(200).json({ 'message': `No document with id ${id} was found`, type: 'error' });
        });
    //emit db changes to clients
    //
    var io = req.app.get('socketio');
    io.emit('updated', { 'msg': `All documents were updated.` });
}




//***************************************************************************************************************//
//******************************************** TEST DATA ********************************************************//
//***************************************************************************************************************//

//Used to generate the dogs id
//
function randomString(length) {
    let id = "",
        possible = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
}

//generate n number of dogs sent from th /api/admin/test/:count route
//
exports.generateTestDataAsync = async (req, res) => {
    let n = req.params.count;
    let nameArr = ['Abracadabra', 'Alchemy', 'Android', 'Bailey', 'Baja', 'Basil', 'Blunder', 'Cargo', 'Cashmere', 'Charade', 'Dank', 'Doodle', 'Doglet',
        'Echo', 'Eclipse', 'Edge', 'Faust', 'Frog', 'Face', 'Gizmo', 'Goblin', 'Ghost', 'Hog', 'Hobbit', 'Hero', 'Hunter', 'Indigo', 'Jackpot', 'Jazz',
        'Java', 'Jedi', 'Sith', 'Jupiter', 'Kermit', ' Kiwi', 'Kenya', 'Moose', 'Kibbles', 'Laser', 'Lambchop', 'Kujo', 'Okuma', 'Lemon', 'Magpie',
        'Marble', 'Mole', 'Abby', 'Lira', 'Nina', 'Nacho', 'Myth', 'Nudge', 'Chicken', 'Nugget', 'Drumstik', 'Spanky', 'Sparky', 'Snuffles', 'Dogzilla',
        'Taurus', 'Zoom', 'Zulu', 'Porkchop', 'Rusty', 'Ruby', 'Pirate', 'Diesel', 'Fish', 'Gator', 'Pistol', 'Pepper', 'Salt', 'Waldo', 'Pizza', 'Hotdog',
        'Teemo', 'Gnar', 'Yuumi', 'Shadow', 'Spectre', 'Iggy', 'Stitch', 'Dooby', 'Warwick', 'Nutmeg', 'Adrian', 'Ash', 'Alaska', 'India', 'Butters', 'Boomer',
        'Brownie', 'Button', 'Chewie', 'Coco', 'Frosty', 'Link', 'Zelda', 'Micah', 'Gray', 'Nova', 'Phoenix', 'Pookie', 'Rebel', 'Rascal', 'Shaggy', 'Sky',
        'Squirt', 'Sage', 'Runt', 'Grunt', 'Scout', 'Riley', 'Scrappy', 'Quinn', 'Cashew', 'Peanut', 'Pistachio', 'Cookie', 'Onyx', 'Oreo', 'Patches'];
    let type = 'Dog';
    let breedArr = ['American Pitbull Terrier', 'Staffordshire Bull Terrier', 'Pitbull X'];
    let mm = Math.floor(Math.random() * 12);
    let dd = Math.floor(Math.random() * 28);
    let yy = Math.floor(Math.random() * 20) + 2010; //2000-2020
    let genderArr = ['Male', 'Female'];
    let traitsArr = ['Kid Friendly', 'Cat Friendly', 'Dog Friendly'];
    let healthDesc = '';
    let imagesArr = [
        "https://images.unsplash.com/photo-1496888177643-0e1435eae172?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1583080937460-23d7ca8bf69c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1535479572772-4b963399c626?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1550206574-96bbd259b685?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80",
        "https://images.unsplash.com/photo-1579054979848-a5d73972ed97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80http://unsplash.com/photos/LVNAdgLzwtc",
        "https://images.unsplash.com/photo-1587790311640-50b019663f01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80",
        "https://images.unsplash.com/photo-1544159294-d746bbc6fc95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1496888177643-0e1435eae172?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        "https://images.unsplash.com/photo-1560293918-bd3b0f367889?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1087&q=80",
        "https://images.unsplash.com/photo-1591433174292-7795af5f7e2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1554327414-e3321ac39633?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1285&q=80",
        "https://images.unsplash.com/photo-1536861814235-a655fb93cbf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1576604062155-4aaf7b81fabd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        "https://images.unsplash.com/photo-1501224307784-d38c497e1fd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1541752055735-35f0bae2795d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80",
        "https://images.unsplash.com/photo-1529956650128-bca881be2e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1477973770766-6228305816df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
        "https://images.unsplash.com/photo-1559179817-8343a3fe1bc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
        "https://images.unsplash.com/photo-1569528580739-233379161b1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    ];
    let imagesPuppyArr = [
        "https://images.unsplash.com/photo-1559096996-540df6c31ae1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1593336687463-bcf825596edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1559096996-73fc537f9296?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1572984586016-c18a165a7a96?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1549034731-236da9f9af38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1585407729321-cc7bb0c41533?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
    ];
    let descArr = [
        "Ur givin me a spook extremely cuuuuuute mlem, heckin angery woofer. Porgo corgo h*ck wow such tempt clouds puggo, blop long water shoob such treat borking doggo long bois borkf, doggo you are doin me a concern you are doing me the shock mlem. Wrinkler snoot shoober long water shoob wow very biscit pupper the neighborhood pupper, bork clouds puggorino pupper. Super chub waggy wags borkdrive aqua doggo such treat tungg, maximum borkdrive woofer many pats sub woofer thicc maximum borkdrive, smol borking doggo with a long snoot for pats length boy shibe vvv. Most angery pupper I have ever seen long water shoob what a nice floof doggorino long water shoob, ruff big ol long doggo. Boofers heckin ruff doge, boof heckin good boys blop lotsa pats, mlem big ol.",
        "Shooberino heck very hand that feed shibe very good spot, pats. Borking doggo big ol pupper wow such tempt super chub borkf, snoot noodle horse puggo. Bork fat boi dat tungg tho maximum borkdrive pupper puggorino, maximum borkdrive yapper tungg. Shooberino shoober most angery pupper I have ever seen very good spot shooberino boof noodle horse fluffer, ur givin me a spook fluffer pupperino clouds puggorino.",
        "Ruff super chub big ol tungg porgo heckin pupper, porgo waggy wags fluffer extremely cuuuuuute. Shibe many pats borking doggo many pats fat boi wow such tempt, ur givin me a spook puggorino heckin angery woofer borkdrive boofers heckin good boys, corgo noodle horse what a nice floof heckin angery woofer. Boofers most angery pupper I have ever seen woofer, heckin. big ol pupper super chub porgo.  Much ruin diet the neighborhood pupper shoober most angery pupper I have ever seen, such treat boofers lotsa pats smol, h*ck waggy wags. You are doing me a frighten dat tungg tho corgo stop it fren fat boi shoob, length boy h*ck pupperino. Length boy ur givin me a spook lotsa pats doggo the neighborhood pupper doge waggy wags fat boi, long doggo heckin maximum borkdrive very taste wow tungg. Fat boi heck wow such tempt long water shoob much ruin diet doggorino, tungg ur givin me a spook heckin.",
        "Long doggo what a nice floof very jealous pupper big ol pupper dat tungg tho shoob h*ck fat boi, heck pupperino fat boi you are doin me a concern heckin. Pupperino big ol very good spot smol borking doggo with a long snoot for pats dat tungg tho smol borking doggo with a long snoot for pats stop it fren puggo snoot big ol pupper, vvv smol borking doggo with a long snoot for pats adorable doggo much ruin diet shibe aqua doggo he made many woofs. Shoob heck doing me a frighten doge borking doggo wow such tempt clouds porgo long bois sub woofer, borkf stop it fren shibe dat tungg tho lotsa pats long woofer wrinkler. Maximum borkdrive blop very good spot smol maximum borkdrive, vvv dat tungg tho lotsa pats. long woofer doggo sub woofer. Waggy wags wow very biscit vvv extremely cuuuuuute, doggo borkf. Heckin doing me a frighten wrinkler I am bekom fat ruff, shoob heckin angery woofer thicc, noodle horse long woofer yapper.",
        "Waggy wags puggorino fat boi stop it fren, the neighborhood pupper fat boi. Super chub tungg shibe thicc heckin, waggy wags floofs long bois thicc, you are doing me the shock fat boi he made many woofs. Fluffer tungg what a nice floof most angery pupper I have ever seen dat tungg tho, puggorino tungg.  Yapper mlem aqua doggo ruff doge, heckin angery woofer noodle horse floofs. Extremely cuuuuuute I am bekom fat many pats blep, pupperino very jealous pupper. very hand that feed shibe ruff. Blep waggy wags smol borking doggo with a long snoot for pats shoob, long woofer. Heckin good boys big ol pupper borking doggo wrinkler shibe pupperino shibe I am bekom fat doggorino, shoob heckin good boys and girls shibe very good spot borking doggo most angery pupper I have ever seen puggorino. Aqua doggo waggy wags snoot adorable doggo mlem, dat tungg tho doge. Fluffer doggo very good spot, shoob."
    ];

    return new Promise(async (resolve, reject) => {
        let adoptables = [];
        try {
            for (let i = 0; i < n; i++) {

                let id = randomString(16);
                let name = nameArr[Math.floor(Math.random() * nameArr.length)];
                let type = 'Dog';
                let breed = breedArr[Math.floor(Math.random() * breedArr.length)];
                let age = Math.floor(Math.random() * 13);
                age === 0 ? age += Math.round((Math.random() + 0.2) * 10) / 10 : age = age;
                let birthdate = `${mm}/${dd}/${yy}`;
                let gender = genderArr[Math.floor(Math.random() * genderArr.length)];
                let traits = [traitsArr[Math.floor(Math.random() * traitsArr.length)]];
                let image = age < 1 ? imagesPuppyArr[Math.floor(Math.random() * imagesPuppyArr.length)] : imagesArr[Math.floor(Math.random() * imagesArr.length)];
                let description = descArr[Math.floor(Math.random() * descArr.length)];
                let adoptionFee = 200.00;
                let isFeatured = i == 0 ? true : false;
                let hasMedicalNeeds = i % 6 == 0 ? true : false;
                let healthDesc = hasMedicalNeeds ? 'Description of dogs medical requirements.' : 'No known health issues.';

                //generate random intake date
                //
                let startDate = new Date(2015, 1, 1);
                let endDate = new Date();
                let intakeDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).getTime();

                var adoptable = {
                    id: id,
                    name: name,
                    type: type,
                    breed: breed,
                    age: age,
                    birthdate: birthdate,
                    gender: gender,
                    traits: traits,
                    image: image,
                    description: description,
                    adoptionFee: adoptionFee,
                    isFeatured: isFeatured,
                    hasMedicalNeeds: hasMedicalNeeds,
                    healthDesc: healthDesc,
                    intakeDate: intakeDate,
                    notes: []
                };
                adoptables.push(adoptable);
            }
            for (adoptable in adoptables) {
                await mongoose.db.collection(COLLECTION).insertOne(adoptables[adoptable]);
            }
            res.status(200).json({ 'message': `${adoptables.length} documents created successfully`, type: 'success' });
            resolve();
        }
        catch (err) {
            console.log(err);
        }
        //emit db changes to clients
        //
        var io = req.app.get('socketio');
        io.emit('updated', { 'msg': `Generated test data.` });
    });
}

exports.adminController;