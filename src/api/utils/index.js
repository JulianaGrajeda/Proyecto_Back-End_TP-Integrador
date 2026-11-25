// Logica para trabajar con archivos y rutas de proyecto
import { join } from "path";

// Apuntar hasta la carpeta raiz del servidor -> "/"
const __dirname = join(import.meta.dirname, "../../../");

export {
    __dirname,
    join
}

