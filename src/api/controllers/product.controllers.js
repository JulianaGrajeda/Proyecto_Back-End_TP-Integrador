/*===============================
	Controladores de producto
===============================*/
import ProductModels from "../models/product.models.js"; // Importamos los modelos



// Obtener todos los productos activos
export const getActiveProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectActiveProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No hay productos activos"
            });
        }


        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos activos: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener productos activos"
        });
    }
}


// GET all products -> Obtener todos los productos

export const getAllProducts = async (req, res) => {
    try {
        
        const [rows, tables] = await ProductModels.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener productos"
        });
    }
}

// GET product by id -> Obtener producto por id

export const getProductById = async (req, res) => {
    try {

        const [rows] = await ProductModels.selectProductById(req.id);

        if (!rows.length) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener producto por id"
        });
    }
}


// POST -> Crear producto

export const createProduct = async (req, res) => {

    try {
        const { category, image, name, price } = req.body;

        const [rows] = await ProductModels.insertNewProduct(name, image, category, price);


        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.log("Error creando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear un producto"
        });
    }
}

// PUT -> Modificar producto

export const modifyProduct = async (req, res) => {
    try {
        const { id, name, image, price, category, active } = req.body;
        const numericId = Number(id);

        if (!Number.isInteger(numericId) || numericId <= 0) {
            return res.status(400).json({
                message: "El id debe ser un numero entero positivo"
            });
        }

        const [result] = await ProductModels.updateProduct(name, image, price, category, active, numericId);

        console.log(result);

        // Optimizacion 4: Verificamos si realmente se actualizo algo
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro el producto con id ${id}`
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} actualizado correctamente`
        });


    } catch (error) {
        console.log("Error modificando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al modificar un producto"
        });
    }
}



// DELETE -> Eliminar producto

export const removeProduct = async (req, res) => {
    try {
        
        const [result] = await ProductModels.deleteProduct(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch (error) {
        console.log("Error eliminando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al eliminar producto"
        });
    }
}