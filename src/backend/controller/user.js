const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");


const common = require("./common");
const userModel = require("../models/user");


async function create(req, res)
{
    try
    {
        let user = userModel.User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.passhash = bcrypt.hashSync(req.body.password, 10);
        user.verification_code = uuid.v4();
        //user.status = 2;

        await user.save();

        // common.sendVerificationMail(result.id, user.email, user.verification_code);
        res.json({message: "User created successfully. " +
                           "Activate your account using the email received."});
    }
    catch(err)
    {
        if(err.code === 11000)
            res.status(400).json({message: "User already exists"});
        else
            res.status(500).json(common.errorResponse(err));
    }
}


async function login(req, res)
{
    let email = req.body.email;
    let password = req.body.password;

    try
    {
        let result = await userModel.User.findOne({email: email});

        if(result)
        {
            if(bcrypt.compareSync(password, result.passhash))
            {
                const token_data = {id: result._id, email: result.email, name: result.name,
                    dob: result.dob, type: result.type};

                const token = jwt.sign(token_data, common.fetchSecret(), {expiresIn: "24h"});
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
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


async function verifyAccount(req, res)
{
    try
    {
        let result = await userModel.User
                                    .updateOne({_id: req.query.user_id,
                                                   verification_code: req.query.verification_code},
                                               {$set: {status: 1}});
        if(result.nModified === 1)
            res.send("Account activated. Login to continue.");
        else
            res.status(400).send("Account cannot be found.");
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


module.exports =
    {
        create: create,
        login: login,
        verifyAccount: verifyAccount
    };
