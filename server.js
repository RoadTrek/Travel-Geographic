const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();
// Define the PORT
const PORT = process.env.port || 8080;

//models

const user = require("./models/user.js");
const gallery = require("./models/gallery.js");
// express was initialized
const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// Defining the app.use parts
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));

app.use(cookieParser());
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

const key = process.env.key;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: CONNECTION_URL,
      mongooseConnection: mongoose.connection,
      collection: "sessions",
      ttl: 24 * 60 * 60 * 1000,
    }),
    secret: key,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
  })
);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

// importing routes
// import userRoutes from './routes/user.js';
// app.use('/', userRoutes);

app.get("/", function (req, res) {
  console.log("in backend");
});

app.post("/signup", function (req, res) {
  user.findOne({ email: req.body.email }, async function (err, currentUser) {
    if (err) {
      console.log(err);
    }
    if (currentUser) {
      res.status(201).json({ msg: "This Email has already been registered." });
    }
    if (!currentUser) {
      if (req.body.password === "") {
        res.status(201).json({ msg: "Enter a valid password." });
      }
      await bcrypt.hash(
        req.body.password,
        10,
        async function (err, hashedPassword) {
          if (err) {
            console.log(err);
          }
          const newUser = new user({
            name: req.body.name,
            password: hashedPassword,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
          });
          await newUser.save();
        }
      );
      res.status(200).json({ username: req.body.username });
    }
  });
});

app.post("/login", function (req, res) {
  const enteredDetails = {
    email: req.body.email,
    password: req.body.password,
  };
  user.findOne(
    { email: enteredDetails.email },
    async function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          bcrypt.compare(
            enteredDetails.password,
            foundUser.password,
            function (err, result) {
              if (result === true) {
                if (foundUser.email === "tg.official.1001@gmail.com") {
                  const token = jwt.sign({ _id: foundUser._id, type: 1 }, key);
                  req.session.value = token;
                  res.status(200).json(foundUser);
                } else {
                  const token = jwt.sign({ _id: foundUser._id, type: 2 }, key);
                  req.session.value = token;
                  res.status(200).json(foundUser);
                }
              } else {
                res.status(201).json({ msg: "Enter correct password" });
              }
            }
          );
        } else {
          res.status(201).json({ msg: "email id does not exist" });
        }
      }
    }
  );
});

app.get("/user", async (req, res) => {
  try {
    const cookie = req.session.value;
    const claims = jwt.verify(cookie, key);

    user.findOne({ _id: claims._id }, function (err, currentUser) {
      if (err) {
        console.log(err);
      } else {
        if (currentUser) {
          var { _id, password, ...details } = currentUser._doc;
          res.status(200).json(details);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/logout", function (req, res) {
  req.session.value = "NA";
  req.session.destroy();
  console.log("Cookie deleted");
  res.status(200).json("logout successfully");
});

app.post("/gallery", async function (req, res) {
  const url = req.body.secure_url;
  console.log(url);
  const newImage = new gallery({
    imageUrl: url,
  });
  await newImage.save();
});

app.get("/image", function (req, res) {
  try {
    const cookie = req.session.value;
    const claims = jwt.verify(cookie, key);
      gallery.find({}, {}, function (err, data) {
        res.status(200).json({ image: data,type:claims.type });
      });
    
  } catch (error) {
    console.log(error);
  }
  
});

app.get("/expedition", function (req, res) {
  try {
    const cookie = req.session.value;
    const claims = jwt.verify(cookie, key);
      gallery.find({}, {}, function (err, data) {
        res.status(200).json({ image: data,type:claims.type });
      });
  } catch (error) {
    console.log(error);
  }
  
});

app.get("/trek", function (req, res) {
  try {
    const cookie = req.session.value;
    const claims = jwt.verify(cookie, key);
      gallery.find({}, {}, function (err, data) {
        res.status(200).json({ image: data,type:claims.type });
      });
  } catch (error) {
    console.log(error);
  }
  
});
// Listening to the port PORT.
app.listen(PORT, function () {
  console.log("Server is listening to port ", PORT);
});
// app.listen(PORT, LOCAL_ADDRESS, () => {
//     // const address = app.address();
//     console.log('server listening at', PORT);
// });
