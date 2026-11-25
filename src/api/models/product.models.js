/*==========================
	Modelos de producto
==========================*/
import connection from "../database/db.js";


// Traer productos activos
const selectActiveProducts = () => {
    const sql = "SELECT id, nombre_prod, precio_prod, imagen FROM products WHERE products.active = 1";
    return connection.query(sql);
}


// Traer todos los productos
const selectAllProducts = () => {

    const sql = "SELECT id, nombre_prod, precio_prod, imagen FROM products";
    return connection.query(sql);
};




// Traer producto por id
const selectProductById = (id) => {
    const sql = "SELECT id, nombre_prod, precio_prod, imagen, active FROM products WHERE products.id = ?";
    return connection.query(sql, [id]);
}


// Crear nuevo producto
const insertNewProduct = (nombre_prod, imagen, category, precio_prod) => {

    const sql = "INSERT INTO products (nombre_prod, imagen, category, precio_prod) VALUES (?, ?, ?, ?)"
    return connection.query(sql, [nombre_prod, imagen, category, precio_prod]);
}


// Actualizar producto
const updateProduct = (nombre_prod, imagen, precio_prod, category, active, id) => {
    const sql = "UPDATE products SET nombre_prod = ?, imagen = ?, precio_prod = ?, category = ?, active = ? WHERE id = ?";

    return connection.query(sql, [nombre_prod, imagen, precio_prod, category, active, id]);
}


// Eliminar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}



export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts
}