var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", { useUnifiedTopology: true, useNewUrlParser: true });

const User = require("./userSchema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/api/users", function (req, res) {
    User.find({}).then(function (data) {
        res.json(data);
    }).catch(function (error) {
        console.log(error);
        res.status(400).send(error);
    })
});

app.get("/api/user", function (req, res) {
    User.findOne({ username: req.query.username, password: req.query.password }).then(function (data) {
        res.json(data);
    }).catch(function (error) {
        console.log(error);
        res.status(400).send(error);
    })
});

app.post("/api/user", function (req, res) {
    console.log(req.body);
    User.create(req.body).then(function (data) {
        res.json(data);
    }).catch(error => {
        res.status(400).send(error);
    });
});

var server = app.listen(4000, function () {
    console.log("app running on port.", server.address().port);
});