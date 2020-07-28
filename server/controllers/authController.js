const jwt = require('jsonwebtoken');
const fs = require('fs');
var User = require('../models/user');
const COLLECTION = 'users';

const privateKey = fs.readFileSync('./private.key', 'utf-8');
const publicKey = fs.readFileSync('./public.key', 'utf-8');

exports.login = async (req, res, next) => {
    //credentials
    //
    const uname = req.body.username;
    const password = req.body.password;

    //verify credentials
    //
    let docRef = await User.findOne({ 'username': uname }, (err, user) => {
        if (err) throw new Error;
        if (user === null) {
            //user does not exist
            //
            res.status(400).json({ message: 'User or password does not match.' });
        } else {
            //verify password if user exists
            //
            if (user.validPassword(password)) {
                //password is valid, generate the token
                //
                const token = jwt.sign({}, privateKey, {
                    algorithm: "RS256",
                    expiresIn: "1h",//expires in 1 hour
                    subject: uname
                });
                let d = new Date();
                //set token property of authorized user in db
                //
                user.token = token;
                user.save();
                //send token back to client
                //
                res.status(200).json({
                    bearer: token,
                    expiresIn: d.getTime() + 3600000//expires in 1 hour
                });
            } else {
                //password is invalid
                //
                res.status(400).json({ message: 'User or password does not match.' });
            }
        }
    })
}

exports.verifyToken = async (req, res, next) => {
    //authorize the current user token or something
    //
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const bearer = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(bearer, publicKey, async function (err, decoded) {
            if (err) {
                //invalid token
                //
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                //token is valid
                //
                const uname = decoded.sub;
                //check that the decoded token is the same as the token assigned to the given user
                //
                let docRef = await User.findOne({ 'username': uname }, (err, user) => {
                    if (err) {
                        //invalid token
                        //
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                    if (user === null) {
                        //invalid token
                        //
                        return res.status(401).json({ message: 'Invalid token' });
                    } else {
                        if (user.validJwt(bearer)) {
                            //valid token
                            //
                            next();
                        } else {
                            //invalid token
                            //
                            return res.status(401).json({ message: 'Invalid token' });
                        }
                    }
                });
            };
        });
    } else {
        return res.status(400).send();
    }
}

exports.authController;