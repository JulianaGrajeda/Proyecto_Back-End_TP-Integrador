// RUTAS DE PRODUCTO

import { Router } from "express";
import {validateId, validateProduct} from "../middlewares/middlewares.js";
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct} from "../controllers/product.controllers.js";

const router = Router();

// <--- GET --->

router.get("/activo", getActiveProducts);

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

// <--- POST --->

router.post("/", validateProduct, createProduct);

// <--- DELETE --->
router.get("/:id", validateId, removeProduct);

export default router;