const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const db_host = "MONGODB_HOST" in process.env ? process.env.MONGODB_HOST : "localhost";
const db_port = "MONGODB_PORT" in process.env ? process.env.MONGODB_PORT : "27017";
const db_name = "MONGODB_NAME" in process.env ? process.env.MONGODB_NAME : "covconnect";
const db_user = "MONGODB_USER" in process.env ? process.env.MONGODB_USER : "covconnectUser";
const db_pass = process.env.MONGODB_PASSWORD;
const sv_host = "SERVER_HOST" in process.env ? process.env.SERVER_HOST : "localhost";
const sv_port = "SERVER_PORT" in process.env ? process.env.SERVER_PORT : "8080";
const jwt_secret = process.env.JWT_SECRET;
const email = "EMAIL" in process.env ? process.env.EMAIL : "covconnect.live@gmail.com";
const email_secret = process.env.EMAIL_SECRET;

if(null in [jwt_secret, db_pass, email_secret])
{
    console.log("Mandatory environment variables: [JWT_SECRET, MONGODB_PASSWORD, EMAIL_SECRET]")
    process.exit(1);
}

const common = require("./controller/common");
common.setSecret(jwt_secret);
common.initializeMailer(email, email_secret);

const dbRoute = "mongodb://" + db_user + ":" + db_pass + "@" + db_host + ":" + db_port + "/" + db_name;

mongoose.connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true, 'useCreateIndex': true});

let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./routes/api")(app);

app.listen(
    sv_port, sv_host,
        () =>
        {
            console.log("Listening on host: " + sv_host + " and port: " + sv_port);
        });

module.exports = app;
