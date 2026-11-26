const contenedorProductos = document.getElementById("contenedor-productos");
const urlBase = "http://localhost:3000";


// Optimizacion 2: Validacion previa en el cliente
function validarFormulario(data) {
    const errores = []; // Array de errores

    // Validacion name
    if (!data.name || data.name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    // Validacion precio
    if (!data.price || data.price < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // Dejamos validacion image para cuando metamos Multer

    // Validacion category
    if (!data.category) {
        errores.push("Debe seleccionar una categoria");
    }

    return errores;
}


// Optimizacion 3: Mostramos cada error del array como un parrafo independiente
function mostrarListaErrores(array) {
    let htmlErrores = "<div class='errores-container'>";

    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`;
    });

    htmlErrores += "</div>"

    contenedorProductos.innerHTML = htmlErrores;
}



// Optimizacion 4: mostramos visualmente el mensaje (error o exito) para que sea mas claro e intuitivo
function mostrarMensaje(estado, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${estado}">${mensaje}</p>
    `;
}


const idFromQuery = new URLSearchParams(window.location.search).get("id");
if (idFromQuery !== null) {
    const idProd = Number(idFromQuery);
    if (!Number.isInteger(idProd) || idProd <= 0) {
        mostrarMensaje("error", "Ingresa un id valido");
    } else {
        buscarProducto(idProd);
    }
} else {
    mostrarMensaje("error", "Selecciona un producto desde Inicio o búscalo por ID en el encabezado.");
}

async function buscarProducto(idProd) {
    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);

        const data = await response.json();

        // Optimizacion 5: Mostramos errores 400 o 500
        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        const producto = data.payload[0];
        mostrarFormProducto(producto);
        
    } catch (error) {
        console.error("Error al obtener producto: ", error.message);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
}


function mostrarFormProducto(producto) {
    console.table(producto);
    
    let htmlFormProducto = `
    <!-- Formulario PUT product -->
    <section class="updateProduct-container">
        
        <h2>Actualizar producto</h2>
        <p class="updateProduct-id">ID del producto: <strong>${producto.id}</strong></p>
        
        <form id="updateProductForm">
            
            <input type="hidden" name="id" value="${producto.id}">
            
            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="serums" ${producto.category === "serums" ? "selected" : ""}>Serums</option>
                <option value="cremas" ${producto.category === "cremas" ? "selected" : ""}>Cremas</option>
            </select>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>

            <label for="activeProd">Activo</label>
            <select name="active" id="activeProd" required>
                <option value="1" ${Number(producto.active) === 1 ? "selected" : ""}>Activado</option>
                <option value="0" ${Number(producto.active) === 0 ? "selected" : ""}>Desactivado</option>
            </select>

            <div class="update-product-actions">
                <input type="submit" value="Actualizar producto">
                <button class="product-action product-action-delete" type="button" data-delete-product="${producto.id}">Eliminar producto</button>
            </div>

        </form>

    </section>
    `;

    contenedorProductos.innerHTML = htmlFormProducto;

    const updateProductForm = document.getElementById("updateProductForm");

    updateProductForm.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}


async function actualizarProducto(event) {
    
    // Evitado envio por defecto del formulario
    event.preventDefault();

    const formData = new FormData(event.target);

    const formObj = Object.fromEntries(formData.entries());

    // (repetimos la logica de post.html)
    // Optimizacion 6: Parseamos algunos datos para enviarlos en el formato correspondiente
    formObj.price = Number(formObj.price); // Convertimos a number el precio
    formObj.name = formObj.name.trim(); // Limpiamos los espacios en el nombre

    
    // Optimizacion 2: Llamamos a la funcion de validacion
    const errores = validarFormulario(formObj);
    
    // Optimizacion 3: Si hay errores, mostramos mensaje de error y terminamos aca
    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores);
    }


    try {

        const response = await fetch(`${urlBase}/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });

        console.log(response);

        const result = await response.json();
        
        // Optimizacion 5: Mostramos errores 400 o 500
        if (!response.ok) {
            return mostrarMensaje("error", result.message);
        }

        window.alert(result.message || "Producto actualizado correctamente.");
        window.location.href = "/dashboard/principal";

    } catch (error) {
        console.error("Error en la actualizacion del producto: ", error);
        mostrarMensaje("error", "No se pudo actualizar el producto. Intenta nuevamente.");
    }
    

}

