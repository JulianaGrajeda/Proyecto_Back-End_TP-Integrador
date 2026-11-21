//Importamos el módulo mysql2 en modo promesas para poder hacer peticiones asíncronas a la BBDD

import mysql2 from "mysql2/promise";

//Importamos de environments la información de la conexión a la base de datos
import environments from "../config/environments.js";

//usamos el destructuring para extraer el objeto database
const { database } = environments;

//Creamos la conexión a la base de datos (crear un grupo de conexiones o pool)
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;