/*============================
    Rutas de exportacion
============================*/
import { Router } from "express";
import { excelProducts } from "../controllers/export.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

router.get("/products", requireLogin, excelProducts);

export default router;