const jwt = require("jsonwebtoken");


const common = require("./common");
const patientModel = require("../models/patient");


const create = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);

    let patient = patientModel.Patient();
    patient.name = req.body.name;
    patient.dob = req.body.dob;
    patient.user_id = user.id;
    patient.hospital_id = req.body.hospital_id;
    patient.unit = req.body.unit;

    patient.save()
        .then(
            () =>
            {
                res.json({message: "Patient created successfully"});
            })
        .catch(
            (err) =>
            {
                if(err.code === 11000)
                    res.status(400).json({message: "Patient already exists"});
                else
                    res.status(500).json(common.errorResponse(err));
            });
};


const fetch = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);

    patientModel
        .Patient
        .find({user_id: user.id})
        .then(
            (result) =>
            {
                if(result)
                {
                    let patients = [];
                    result.forEach(
                        (patient) =>
                        {
                        patients.push(
                            {
                                patient_details:
                                    {
                                        id: patient.id,
                                        name: patient.name,
                                        dob: patient.dob
                                    },
                                user_id: patient.user_id,
                                hospital_id: patient.hospital_id,
                                unit: patient.unit})
                        });
                    res.json({patients: patients});
                }
                else
                {
                    res.status(404).json({message: "Patient not found"});
                }
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
        fetch: fetch
    };