const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://admin-akshat:akshatmongo@cluster0.uued4pv.mongodb.net/Expense_TrackerApp", {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.on("error", function(err) {
    console.log(err);
});

connection.on("connected", function() {
    console.log("Mongo DB connection successful.");
});