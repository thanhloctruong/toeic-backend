import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import data from "../../mockup/data.js";
import User from "../models/userModel.js";
import { generateToken, isAuth, isAdmin } from "../../utils/utils.js";
const userRouter = express.Router();
userRouter.get("/seed", async (req, res) => {
  try {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.status(200).send({ data: createdUsers, message: "create successfull" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } catch (error) {
    res.status(400).send({ message: "Invalid email or password" });
  }
});

// userRouter.post("/signingoogle", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       res.send({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: generateToken(user),
//       });
//       return;
//     } else {
//       console.log(req.body);
//       const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8),
//       });
//       const createdUser = await user.save();
//       res.status(200).send({
//         _id: createdUser._id,
//         name: createdUser.name,
//         email: createdUser.email,
//         isAdmin: createdUser.isAdmin,
//         token: generateToken(createdUser),
//       });
//     }
//   } catch (error) {
//     res.status(400).send({ message: "Invalid email or password" });
//   }
// });

userRouter.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (error) {
    res.status(400).send({ message: "cant create account" });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send({ message: "User not found" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

userRouter.post("/profile", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("--user----", user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

userRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Cant delete USer" });
  }
});

// userRouter.put("/:id", isAuth, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.isAdmin = req.body.isAdmin || user.isAdmin;
//       const updatedUser = await user.save();
//       res.send({ message: "User Updated", user: updatedUser });
//     } else {
//       res.status(404).send({ message: "User Not Found" });
//     }
//   } catch (error) {
//     res.status(404).send({ message: "User Not Found" });
//   }
// });

export default userRouter;
