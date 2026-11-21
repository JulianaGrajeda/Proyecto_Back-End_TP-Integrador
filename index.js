/* ================================
            Importaciones
===================================*/
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express(); // Creamos una instacia de express y la almacenamos en app
const PORT = environments.port;

/* ================================
            Endpoints
===================================*/

app.get("/", (req, res) => {
    res.send("Hola mundo! desde un servidor de Express.js");
});

//GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
    const result = await connection.query("SELECT * FROM products");

    console.log(result);

}); // Todo lo de SELECT * FROM products


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});