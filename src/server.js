// Imports of pakages;
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import {join, dirname} from "path";
import {fileURLToPath} from "url";

// Imports of important files from the FileSystem;
import userRouter from "./users/index.js";

// Global Middlewares;
const server = express();
const PORT = process.env.PORT || 3002;
server.use(express());
server.use(cors());
server.use(express.json());

//  Server Route;
server.use("/users", userRouter);

// Cloud MongoDB server:
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log(
        "✅ Server is running at PORT: ",
        PORT,
        " and is connected to the MongoDB cloud DB"
      );
    })
  );

//  Error Middlewares;

//  Server working console;
console.table(listEndpoints(server));

server.on("error", (error) => {
  console.log("❌ Server is not running on the port: ", PORT);
});
