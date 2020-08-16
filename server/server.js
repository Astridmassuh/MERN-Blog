const express = require("express");
const server = express();
const PORT = process.env.port || 4000;
require("dotenv").config();

const articleRouter = require("./article/router");
const uri = process.env.ATLAS_URI;

const mongoose = require("mongoose");

// connect to the database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// open the connection
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established."));
// to format requests into JSON
server.use(express.json());
// to correctly get the information from submissions
server.use(express.urlencoded({ extended: false }));
//  router to accept any incoming request where the path starts with articles
server.use("/api", articleRouter);

server.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}`)
);
