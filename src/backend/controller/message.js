const mongoose = require("mongoose");


const common = require("./common");
const messageModel = require("../models/message");
const hospitalModel = require("../models/hospital");


async function create(req, res)
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type === "blocked")
    {
        res.status(405).json({message: "User not allowed to send messages"});
        return;
    }

    try
    {
        let message = messageModel.Message();
        message.user_id = user.id;
        message.patient_id = req.body.patient_id;
        message.hospital_id = req.body.hospital_id;
        message.message = req.body.message;
        await message.save();

        res.json({message: "Message created successfully"});
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


async function fetch(req, res)
{
    const user = common.fetchPayloadFromToken(req);
    let query = {};

    if(req.query.hasOwnProperty("status") && req.query.status !== undefined)
        query["status"] = parseInt(req.query.status);
    else
        query["status"] = 1;

    try
    {

        if(user.type === "user")
        {
            query["user_id"] = user.id;

            if(req.query.hasOwnProperty("patient_id"))
                query["patient_id"] = req.body.patient_id;

            let messages = await messageModel.Message.find(query);

            if(messages)
            {
                let message_list = [];

                messages.forEach(
                    message =>
                    {
                        message_list.push({
                                              user_id   : message.user_id,
                                              patient_id: message.patient_id,
                                              hospital_id : message.hospital_id,
                                              message     : message.message
                                          });
                    });

                res.json({messages: message_list});
            }
            else
                res.status(404).json({message: "Messages not found"});
        }
        else if(user.type === "hospital_admin")
        {
            try
            {
                let hospital = await hospitalModel.Hospital.findOne({user_id: user.id});
                query["hospital_id"] = mongoose.Types.ObjectId(hospital.id);
            }
            catch(err)
            {
                res.status(400).json({message: "No hospital found."});
            }

            let messages = await messageModel.Message.aggregate(
                [
                    {
                        $match: query
                    },
                    {
                        $lookup: {
                            from        : 'users',
                            localField  : 'user_id',
                            foreignField: '_id',
                            as          : 'user'
                        }
                    },
                    {
                        $lookup: {
                            from        : 'patients',
                            localField  : 'patient_id',
                            foreignField: '_id',
                            as          : 'patient'
                        }
                    }
                ]);

            if(messages)
            {
                let message_list = [];

                messages.forEach(
                    message =>
                    {
                        message_list.push({
                                              user_name   : message.user[0].name,
                                              patient_name: message.patient[0].name,
                                              patient_unit: message.patient[0].unit,
                                              patient_dob : message.patient[0].dob,
                                              hospital_id : message.hospital_id,
                                              message     : message.message
                                          });
                    });

                res.json({messages: message_list});
            }
            else
                res.status(404).json({message: "Messages not found"});
        }
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


async function deleteMessages(req, res)
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type !== "admin")
    {
        res.status(405).json({message: "Operation not allowed"});
        return;
    }

    try
    {
        let result = await messageModel.Message.deleteOne({id: req.body.id});

        if(result)
            res.json({message: "Message deleted successfully."})
        else
            res.status(404).json({message: "Messages not found"});
    }
    catch(err)
    {
        res.status(500).json(common.errorResponse(err));
    }
}


async function markDelivered(req, res)
{
    const user = common.fetchPayloadFromToken(req);

    if(user.type !== "hospital_admin")
    {
        res.status(405).json({message: "Operation not allowed"});
    }

    let result = await messageModel.Message.updateMany();
}


module.exports =
    {
        create: create,
        fetch: fetch,
        deleteMessages: deleteMessages
    };
