const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Message = new Schema(
    {
        user_id: {type: Schema.Types.ObjectId, required: true},
        patient_id: {type: Schema.Types.ObjectId, required: true},
        hospital_id: {type: Schema.Types.ObjectId, required: true},
        message: {type: String, required: true},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

module.exports = { Message: mongoose.model("Message", Message) };