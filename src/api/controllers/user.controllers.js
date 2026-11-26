/*===============================
	Controladores de usuario
===============================*/

import UserModels from "../models/user.model.js";
import bcrypt from "bcrypt"; // Importamos bcrypt

// Creacion de usuarios admin
export const createUserAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("post", {
                title: "Crear",
                error: "Todos los campos son obligatorios al crear un admin"
            });
        }


        // Indicamos las rondas de sal (cantidad de veces que aleatorizamos los caracteres)
        const saltRounds  = 10;

        // Hasheamos (ciframos) el password recibido en el req.body (ej: hasheamos "homero")
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModels.createAdminUser(email, hashedPassword);

        return res.render("post", {
            title: "Crear",
            exito: "Usuario creado exitosamente"
        });
        

    } catch (error) {
        console.log("Error en el registro de usuarios admin: ", error);

        return res.status(500).render("post", {
            title: "Crear",
            error: "No se pudo crear el usuario admin"
        });
    }
}