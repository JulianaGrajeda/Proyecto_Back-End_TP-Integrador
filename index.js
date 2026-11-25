/* ================================
            Importaciones
===================================*/
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

// import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {viewRoutes} from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
// import session from "express-session";



/* ================================
                CONFIG
===================================*/

const {port, session_key} = environments;
const app = express(); // Creamos una instacia de express y la almacenamos en app
const PORT = port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

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

/*
    Parseamos el JSON que enviamos de formularios para recibirlos
    como objetos
*/

app.use(express.json()); 

app.use(express.static(join(__dirname, "src/public")));



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

    //Con los placeholders ? hacemos que nuestras consultas sean seguras.
    const sql = `SELECT * FROM products WHERE products.id = ?`;
    const [rows] = await connection.query(sql, [id]);

    console.log(rows);


    res.status(200).json({
        payload: rows
    });
});

// POST PRODUCT -> CREAR PRODUCTO
app.post("api/products", async (req, res) => {

    //Extraemos los datos del from dentro del cuerpo de la petición
    console.log(req.body);
    const { name, description, price, category, brand, image} = req.body;

    const sql = "INSERT INTO products ( nombre_prod, descripcion_prod, precio_prod, categoria, marca, imagen) VALUES (?,?,?,?,?,?)";

    await connection.query(sql, {name, description, price, category, brand, image});

    res.status(201).json({
        message : "Producto creado con éxito"
    });
});

/*=====================
	Rutas
=====================*/

app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});