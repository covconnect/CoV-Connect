const jwt = require("jsonwebtoken");


const common = require("./common");
const hospitalModel = require("../models/hospital");


const create = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type !== "admin")
    {
        res.status(401).json({message: "Unathorized access"});
        return;
    }

    let hospital = hospitalModel.Hospital();
    hospital.name = req.body.name;
    hospital.email = req.body.email;
    hospital.address = req.body.address;
    hospital.units = req.body.units;

    hospital.save()
           .then(
               () =>
               {
                   res.json({message: "Hospital created successfully"});
               })
           .catch(
               (err) =>
               {
                   if(err.code === 11000)
                       res.status(400).json({message: "Hospital already exists"});
                   else
                       res.status(500).json(common.errorResponse(err));
               });
};


const fetch = (req, res) =>
{
    hospitalModel
        .Hospital
        .find()
        .then(
            (result) =>
            {
                if(result)
                {
                    let hospitals = [];

                    result.forEach(
                        (hospital) =>
                        {
                            hospitals.push(
                                {
                                    id: hospital.id,
                                    name: hospital.name,
                                    email: hospital.email,
                                    address: hospital.address,
                                    units: hospital.units})
                        });

                    res.json({hospitals: hospitals});
                }
                else
                {
                    res.status(404).json({message: "Hospital not found"});
                }
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


const update = (req, res) =>
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

    hospitalModel
        .Hospital
        .updateOne({id: req.body.id, user_id: user.id}, {$set: updates})
        .then(
            () =>
            {
                res.json({message: "Hospital updated successfully"});
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
        fetch: fetch,
        update: update
    };
