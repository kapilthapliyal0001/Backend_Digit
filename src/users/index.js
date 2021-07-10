import express from "express";
import createError from "http-errors";

// Modal from mongoloose;
import UserModel from "./schema.js";

const userRouter = express.Router();

// User Routes

//Get the old visitor count;
userRouter.get("/:id", async (req, res, next) => {
  try {
    const names = await UserModel.findById(req.params.id);
    console.log(names);
    res.send(names);
  } catch (error) {
    console.log(error);
    next(
      createError(500, "An Error has occured while searching for the user!")
    );
  }
});

// Update the visitor number;
userRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateVisitor = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateVisitor) {
      res.send(updateVisitor);
    } else {
      next(createError(404, `User with _id ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An error has occured while searching for the user"));
  }
});

export default userRouter;
