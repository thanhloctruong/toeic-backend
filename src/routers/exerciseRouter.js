import express from "express";
import Exercise from "../modelsSchema/exerciseModel.js";
import data from "../mockup/data.js";
import { generateToken, isAuth, isAdmin } from "../../utils/utils.js";

const exerciseRouter = express.Router();
// productRouter.get("/", async (req, res) => {
//   try {
//     const pageSize = 6;
//     const page = Number(req.query.pageNumber) || 1;
//     const name = req.query.name || "";
//     const category = req.query.category || "";
//     const order = req.query.order || "";
//     const min =
//       req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
//     const max =
//       req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
//     const rating =
//       req.query.rating && Number(req.query.rating) !== 0
//         ? Number(req.query.rating)
//         : 0;

//     const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
//     const categoryFilter = category ? { category } : {};
//     const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
//     const ratingFilter = rating ? { rating: { $gte: rating } } : {};
//     const sortOrder =
//       order === "lowest"
//         ? { price: 1 }
//         : order === "highest"
//         ? { price: -1 }
//         : order === "toprated"
//         ? { rating: -1 }
//         : { _id: -1 };
//     const count = await Product.count({
//       ...nameFilter,
//       ...categoryFilter,
//       ...priceFilter,
//       ...ratingFilter,
//     });
//     const products = await Product.find({
//       ...nameFilter,
//       ...categoryFilter,
//       ...priceFilter,
//       ...ratingFilter,
//     })
//       .sort(sortOrder)
//       .skip(pageSize * (page - 1))
//       .limit(pageSize);
//     res.send({ products, page, pages: Math.ceil(count / pageSize) });
//   } catch (error) {}
// });

exerciseRouter.get("/seed", async (req, res) => {
  try {
    await Exercise.remove({});
    const createdExercise = await Exercise.insertMany(data.exercise);
    res.send({ createdExercise });
  } catch (error) {
    res.status(400).send({ message: "cant create" });
  }
});

exerciseRouter.get("/", async (req, res) => {
  try {
    const result = await Exercise.find({});
    res.send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Get list success" });
  }
});

exerciseRouter.post("/join", isAuth, async (req, res) => {
  try {
    const result = await Exercise.findById(req.body.idExercise);
    const data = {
      _id: result._id,
      name: result.name,
      des: result.des.map((item) => {
        return {
          url: item.url,
          question: item.question,
          amountAnswer: item.amountAnswer,
          _id: item._id,
        };
      }),
    };
    res.send({ data: data });
  } catch (error) {
    res.status(400).send({ message: "Get list success" });
  }
});

exerciseRouter.post("/join", isAuth, async (req, res) => {
  try {
    const result = await Exercise.findById(req.body.idExercise);

    res.send({ data: data });
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
export default exerciseRouter;