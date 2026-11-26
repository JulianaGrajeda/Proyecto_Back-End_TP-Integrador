/*==========================
	Modelos de producto
==========================*/
import connection from "../database/db.js";


// Traer productos activos
const selectActiveProducts = () => {
    const sql = "SELECT id, nombre_prod AS name, precio_prod AS price, imagen AS image, categoria AS category, activo AS active FROM products WHERE activo = 1";
    return connection.query(sql);
}


// Traer todos los productos
const selectAllProducts = () => {

    const sql = "SELECT id, nombre_prod AS name, precio_prod AS price, imagen AS image, categoria AS category, activo AS active FROM products";
    return connection.query(sql);
};




// Traer producto por id
const selectProductById = (id) => {
    const sql = "SELECT id, nombre_prod AS name, precio_prod AS price, imagen AS image, categoria AS category, activo AS active FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}


// Crear nuevo producto
const insertNewProduct = (nombre_prod, imagen, category, precio_prod) => {

    const sql = "INSERT INTO products (nombre_prod, imagen, categoria, precio_prod) VALUES (?, ?, ?, ?)"
    return connection.query(sql, [nombre_prod, imagen, category, precio_prod]);
}


// Actualizar producto
const updateProduct = (nombre_prod, imagen, precio_prod, category, active, id) => {
    const sql = "UPDATE products SET nombre_prod = ?, imagen = ?, precio_prod = ?, categoria = ?, activo = ? WHERE id = ?";

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