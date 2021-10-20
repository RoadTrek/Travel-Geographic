const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const path = require("path");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();
// Define the PORT
const PORT = process.env.port||8080;
// const { PORT = 8080, LOCAL_ADDRESS = '0.0.0.0' } = process.env


// express was initialized
const app = express();

// Defining the app.use parts
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(morgan("tiny"));

// app.use(cookieParser());
const CONNECTION_URL = process.env.MONGO_URI;
// connecting to the mongoDB
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected");
});

// const key = process.env.key;
// app.use(
//     session({
//         store: MongoStore.create({
//             mongoUrl: CONNECTION_URL,
//             mongooseConnection: mongoose.connection,
//             collection: "sessions",
//             ttl: 24 * 60 * 60 * 1000,
//         }),
//         secret: key,
//         cookie: { maxAge: 24 * 60 * 60 * 1000 },
//         saveUninitialized: false,
//         resave: true,
//     })
// );

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

// // Requiring the models
// const classroom = require("./models/classroomModel.js");
// const student = require("./models/studentModel.js");
// const teacher = require("./models/teacherModel.js");
// const team = require("./models/teamModel.js");

app.get("/", function (req, res) {
    console.log("in backend");
})

// Listening to the port PORT.
app.listen(PORT, function () {
  console.log("Server is listening to port ", PORT);
});
// app.listen(PORT, LOCAL_ADDRESS, () => {
//     // const address = app.address();
//     console.log('server listening at', PORT);
// });