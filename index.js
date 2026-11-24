/* ================================
            Importaciones
===================================*/
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { authRoutes, exportRoutes, productRoutes, saleRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";

const app = express(); // Creamos una instacia de express y la almacenamos en app
const PORT = environments.port;


/* ================================
            Middlewares: 
        entre la req y la res
===================================*/

app.use(cors()); // Middleware que permite todas las solicitudes

//Middleware loger para mostrar por consola las solicitudes de  nuestro servidor

app.use((req,res, next) => {
    let
    fecha  = new Date();

    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString
        ()}] ${req.method} ${req.url}`)

    next();
});



/* ================================
            Endpoints
===================================*/

app.get("/", (req, res) => {
    res.send("Hola mundo! desde un servidor de Express.js");
});

//GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {

    const [rows, tables] = await connection.query("SELECT * FROM products");

    //enviamso una respuesta
    res.status(200).json({
        payload: rows
    });
}); // Todo lo de SELECT * FROM products


app.get("/api/products/:id", async (req, res) => {

    const id = req.params.id;
    // req.body -> de acá recibimos la info de los forms
    // console.log(id);

    const [rows] = await connection.query(`SELECT * FROM products WHERE products.
        id  = ${id}`);

    console.log(rows);


    res.status(200).json({
        payload: rows
    });
});

// app.post("api/products")
// app.put("api/products/:id")
// app.delete("api/products/:id")

/*
    VISTAS EJS

    app.get("/dashboard/principal", async (req, res) => {
        const [rows] = await connection.query(`SELECT * FROM products WHERE products.
        id  = ${id}`);

        res.render({
            vista: index
            productos: rows
        });

        });
*/




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});