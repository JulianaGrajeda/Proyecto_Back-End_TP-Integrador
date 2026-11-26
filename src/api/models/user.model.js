/*==========================
	Modelos de usuario
==========================*/
import connection from "../database/db.js";


// Obtener usuario admin
const selectAdminUser = (email) => {
    // Nos comunicamos con la BBDD
    const sql = "SELECT id, email, password FROM admin WHERE email = ?";
    return connection.query(sql, [email]);
}


// Crear usuario admin
const createAdminUser = (email, password) => {
    const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
    return connection.query(sql, [email, password]);
}


export default {
    selectAdminUser,
    createAdminUser
}