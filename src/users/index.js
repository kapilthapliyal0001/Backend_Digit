import express from "express";
import createError from "http-errors";

// Modal from mongoloose;
import UserModel from "./schema.js";

const userRouter = express.Router();

// User Routes

//  POST the players Result;
userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const _id = await newUser.save();
    console.log(newUser);
    res.status(201).send({_id});
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      next(
        createError(
          500,
          "An error has occured while posting the data of the user! "
        )
      );
    }
  }
});

// GET the player names;
userRouter.get("/", async (req, res, next) => {
  try {
    const names = await UserModel.find();
    console.log(names);
    res.send(names);
  } catch (error) {
    console.log(error);
    next(
      createError(500, "An Error has occured while searching for the user!")
    );
  }
});

export default userRouter;
