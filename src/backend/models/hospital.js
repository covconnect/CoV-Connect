const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Hospital = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        units: {type: Array, default: []},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

module.exports = { Hospital : mongoose.model("Hospital", Hospital) };
