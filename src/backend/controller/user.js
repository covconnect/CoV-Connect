const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");


const common = require("./common");
const userModel = require("../models/user");


const create = (req, res) =>
{
    let user = userModel.User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.passhash = bcrypt.hashSync(req.body.password, 10);
    user.verification_code = uuid.v4();
    //user.status = 2;

    user.save()
        .then(
            (result) =>
            {
                // common.sendVerificationMail(result.id, user.email, user.verification_code);

                res.json({message: "User created successfully. " +
                                   "Activate your account using the email received."});
            })
        .catch(
            (err) =>
            {
                if(err.code === 11000)
                    res.status(400).json({message: "User already exists"});
                else
                    res.status(500).json(common.errorResponse(err));
            });
};


const login = (req, res) =>
{
    let email = req.body.email;
    let password = req.body.password;

    userModel
        .User
        .findOne({email: email})
        .then(
            (result) =>
            {
                if(result)
                {
                    if(bcrypt.compareSync(password, result.passhash))
                    {
                        const token = jwt.sign({id: result._id, email: result.email,
                                                   name: result.name, dob: result.dob,
                                                   type: result.type},
                                               common.fetchSecret(),
                                               {expiresIn: "24h"});
                        res.json({message: "User authenticated successfully", token: token});
                    }
                    else
                    {
                        res.status(401).json({message: "Unauthenticated"});
                    }
                }
                else
                {
                    res.status(404).json({message: "User not found."});
                }
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


const verifyAccount = (req, res) =>
{
    userModel
        .User
        .updateOne({_id: req.query.user_id, verification_code: req.query.verification_code},
                   {$set: {status: 1}})
        .then(
            (result) =>
            {
                if(result.nModified === 1)
                    res.send("Account activated. Login to continue.");
                else
                    res.status(400).send("Account cannot be found.");
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


module.exports =
    {
        create: create,
        login: login,
        verifyAccount: verifyAccount
    };
