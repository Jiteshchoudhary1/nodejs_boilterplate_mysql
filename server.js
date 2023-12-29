require("dotenv").config({
    path: ".env",
});
const database = require("./models/index").sequelize;


const express = require("express");
const app = express();
const configuration = require("./configuration/index");
const { port } = configuration.config.app;
const cors = require("cors");
const HttpStatus = require("http-status");

app.use(express.json());
app.use(cors());

//db connection
database
    .authenticate()
    .then(async () => {
        console.log("Database connected successfully");
        await database.sync({ force: false });
    })
    .catch((error) => {
        console.log("error in dbConnection", error);
    });

require('./route/')(app);

app.use((req, res, next) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        data: null,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            data: null,
            message: err.error.message,
        });
    } else {
        return res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: null,
            message: err.message || "Internal server error",
        });
    }
});


app.listen(port, (err, res) => {
    if (err) {
        console.log(`error on server running`, err);
    } else {
        console.log(`server is running on port ${port}`);
    }
});
