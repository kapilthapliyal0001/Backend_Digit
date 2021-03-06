// Imports of pakages;
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

// Imports of important files from the FileSystem;
import userRouter from "./users/index.js";

// Global Middlewares;
const server = express();
const PORT = process.env.PORT || 3002;
server.use(express());
server.use(cors());
server.use(express.json());

// Cross Origin Playform Verification;
const whiteList = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
  process.env.FRONTEND_URL3,
  process.env.FRONTEND_URL4,
  process.env.FRONTEND_URL5,
];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("NOT allowed by cors");
        callback(new Error("Not Allowed by cors"));
      }
    },
  })
);

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
