import express from "express";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.get("/", ProductController.test);

export default router;
