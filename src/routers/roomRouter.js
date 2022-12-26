import express from "express";
import Room from "../modelsSchema/roomModels.js";
import data from "../mockup/data.js";
import { generateToken, isAuth, isAdmin } from "../../utils/utils.js";

const roomRouter = express.Router();

roomRouter.get("/seed", async (req, res) => {
  try {
    await Room.remove({});
    const createdRoom = await Room.insertMany(data.room);
    res.send({ createdRoom });
  } catch (error) {
    res.status(400).send({ message: "cant create" });
  }
});

roomRouter.get("/", async (req, res) => {
  try {
    const result = await Room.find({});
    res.send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Get list success" });
  }
});

roomRouter.get("/user", isAuth, async (req, res) => {
  try {
    const user = req.user._id;
    console.log("--user----", user);
    const result = await Room.find({ listUser: req.user._id });
    res.send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Get list success" });
  }
});

// productRouter.get(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).send({ message: "Product not found!" });
//     }
//   })
// );
// productRouter.post(
//   "/",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const product = new Product({
//       name: "sample name " + Date.now(),
//       image: "/img/p1.jpg",
//       price: 0,
//       category: "sample category",
//       brand: "sample brand",
//       countInStock: 0,
//       rating: 0,
//       numReviews: 0,
//       description: "sample description",
//     });
//     const createdProduct = await product.save();
//     res.send({ message: "Product Created", product: createdProduct });
//   })
// );
// productRouter.put(
//   "/:id",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//       product.name = req.body.name;
//       product.price = req.body.price;
//       product.image = req.body.image;
//       product.category = req.body.category;
//       product.brand = req.body.brand;
//       product.countInStock = req.body.countInStock;
//       product.description = req.body.description;
//       const updatedProduct = await product.save();
//       res.send({ message: "Product Updated", product: updatedProduct });
//     } else {
//       res.status(404).send({ message: "Product Not Found" });
//     }
//   })
// );
// productRouter.delete(
//   "/:id",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       const deleteProduct = await product.remove();
//       res.send({ message: "Product Deleted", product: deleteProduct });
//     } else {
//       res.status(404).send({ message: "Product Not Found" });
//     }
//   })
// );
export default roomRouter;
