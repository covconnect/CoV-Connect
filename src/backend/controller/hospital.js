const short_uuid = require("short-uuid");
const bcrypt = require("bcrypt");


const common = require("./common");
const hospitalModel = require("../models/hospital");
const userModel = require("../models/user");


async function create(req, res)
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type !== "admin")
    {
        res.status(401).json({message: "Unathorized access"});
        return;
    }

    let hospitalAdmin = userModel.User();
    let password = short_uuid.generate();

    try
    {
        hospitalAdmin.name = req.body.name;
        hospitalAdmin.email = req.body.email;
        hospitalAdmin.passhash = bcrypt.hashSync(password, 10);
        hospitalAdmin.status = 1;
        hospitalAdmin.type = "hospital_admin";

        await hospitalAdmin.save();
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
        return;
    }

    try
    {
        let hospital = hospitalModel.Hospital();
        hospital.name = req.body.name;
        hospital.email = req.body.email;
        hospital.address = req.body.address;
        hospital.units = req.body.units;
        hospital.user_id = hospitalAdmin.id;

        await hospital.save();
        common.sendCredentialsToHospital(req.body.email, password);
    }
    catch(err)
    {
        if(err.code === 11000)
            res.status(400).json({message: "Hospital already exists"});
        else
            res.status(500).json(common.errorResponse(err));

        return;
    }

    res.json({message: "Hospital created successfully"});
}


async function fetch(req, res)
{
    try
    {
        let hospitals = await hospitalModel.Hospital.find();

        if(hospitals)
        {
            let hospital_list = [];

            hospitals.forEach(
                (hospital) =>
                {
                    hospital_list.push(
                        {
                            id: hospital.id,
                            name: hospital.name,
                            email: hospital.email,
                            address: hospital.address,
                            units: hospital.units})
                });

            res.json({hospitals: hospital_list});
        }
        else
        {
            res.status(404).json({message: "Hospital not found"});
        }
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


async function update (req, res)
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type !== "admin")
    {
        res.status(401).json({message: "Unathorized access"});
        return;
    }

    let updates = {};

    if(req.body.hasOwnProperty("units") && req.body.units !== null)
        updates["units"] = req.body.units;

    if(req.body.hasOwnProperty("address") && req.body.address !== null)
        updates["address"] = req.body.address;

    if(updates === {})
    {
        res.json({message: "Hospital updated successfully"});
        return;
    }

    try
    {
        await hospitalModel
            .Hospital
            .updateOne({id: req.body.id, user_id: user.id}, {$set: updates});

        res.json({message: "Hospital updated successfully"});
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


module.exports =
    {
        create: create,
        fetch: fetch,
        update: update
    };
