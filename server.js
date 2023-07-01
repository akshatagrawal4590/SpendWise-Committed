const express = require("express");
const dbConnect = require("./dbConnect.js");
const app = express();
const port = 4000;
app.use(express.json());
const userRoute = require("./routes/userRoute.js");
const transactionsRoute = require("./routes/transactionsRoute.js");

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionsRoute);

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});