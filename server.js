import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v4 as uuid } from "uuid";
import dialogflow from '@google-cloud/dialogflow';

const app = express();

dotenv.config();
// Define the PORT
const PORT = process.env.port || 8080;

// express was initialized
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

const http = createServer(app);
// const io = new Server(http);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on('message', ({ userMessage }) => {
    console.log(userMessage);
    const callapibot = async (projectId = process.env.PROJECT_ID) => {
      try {
        const sessionId = uuid();
        const sessionClient = new dialogflow.SessionsClient({
          keyFilename: "./tg-ai-bot-1095671727d8.json",
        });
        console.log(projectId, sessionId);
        const sessionPath = sessionClient.projectAgentSessionPath(
          projectId,
          sessionId
        );
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: userMessage,
              languageCode: "en-US",
            },
          },
        };
        const responses = await sessionClient.detectIntent(request);

        console.log("Detected intent");
        const result = responses[0].queryResult.fulfillmentText;
        io.emit("message", { note: result });
        console.log(result);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    callapibot();
    // io.emit('note', { note: "hello avni" })
  })
})
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

app.get("/", function (req, res) {
  console.log("in backend");
});

import userRoutes from "./routes/user.js";
import galleryRoutes from "./routes/gallery.js";
import expeditionRoutes from "./routes/expedition.js";

app.use('/', userRoutes);
app.use('/', galleryRoutes);
app.use('/', expeditionRoutes);

// app.listen(4000,function(){
//   console.log(4000);
// })
http.listen(PORT, function () {
  console.log("Server is listening to port ", PORT);
});
