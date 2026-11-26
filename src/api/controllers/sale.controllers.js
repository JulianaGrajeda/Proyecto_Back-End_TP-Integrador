/*===============================
	Controladores de ventas
===============================*/

import SaleModels from "../models/sale.models.js";
import connection from "../database/db.js";


// POST sale -> Crear venta
export const createSale = async (req, res) => {

    try {

        // Recibimos los datos ya parseados del cuerpo de la peticion
        const { date, total_price, user_name, products } = req.body;

        // Validacion minima de datos
        const numericTotal = Number(total_price);
        const validProducts = Array.isArray(products)
            && products.length > 0
            && products.every(productId => Number.isInteger(Number(productId)) && Number(productId) > 0);

        if (!date || !Number.isFinite(numericTotal) || numericTotal <= 0 || !user_name || !validProducts) {
            return res.status(400).json({
                message: "Datos invalidos. Debes enviar date, total_price, user_name y products como array"
            });
        }

        const db = await connection.getConnection();

        try {
            await db.beginTransaction();

            const [saleResult] = await SaleModels.insertNewSale(date, numericTotal, user_name, db);
            const saleId = saleResult.insertId;

            for (const productId of products) {
                await SaleModels.insertIntoProductSales(Number(productId), saleId, db);
            }

            await db.commit();
        } catch (error) {
            await db.rollback();
            throw error;
        } finally {
            db.release();
        }
        
        res.status(201).json({
            message: "Venta registrada con exito"
        });


    } catch (error) {
        console.log("Error creando venta: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear una venta"
        });
    }
}