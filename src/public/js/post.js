const contenedorProductos = document.getElementById("products-container");
const createProductForm = document.getElementById("createProductForm");
const urlBase = "http://localhost:3000";

function validarFormulario(data){
    const errores = [];

    if (!data.nombre_prod || data.nombre_prod.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres.");
    }

    if (!data.precio_prod || data.precio_prod <= 0) {
        errores.push("El precio debe ser un número mayor a 0.");
    }

    if (!data.categoria) {
        errores.push("Debe seleccionar una categoria.");
    }

    return errores;

}

function mostrarListaErrores(array){
    let htmlErrores = "<div class='errores-container'>";

    array.forEach(error => {
        htmlErrores += `<p class="mensaje-error">${error}</p>`
    });

    htmlErrores += "</div>";

    contenedorProductos.innerHTML = htmlErrores;
}

function mostrarMensaje(estado, mensaje){
    contenedorProductos.innerHTML = `
        <p class="mensaje ${estado}">${mensaje}</p>
    `;
}

createProductForm.addEventListener("submit", async event => {

    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    //convertimos el objeto formData en un objeto literal JavaScript
    const formObj = Object.fromEntries(formData.entries());
    console.log(formObj);

    //pasamos algunos datos al formato correspondiente
    formObj.precio_prod = Number(formObj.precio_prod);
    formObj.nombre_prod = formObj.nombre_prod?.trim() ?? "";
    formObj.descripcion_prod = formObj.descripcion_prod?.trim() ?? "";
    formObj.marca = formObj.marca?.trim() ?? "";
    formObj.imagen = formObj.imagen?.trim() ?? "";

    const errores = validarFormulario(formObj);

    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores);
    }

    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });

        console.log(response);

        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        console.log(data.message);
        let mensajeCompleto = `${data.message} con id ${data.id}`;
        mostrarMensaje("exito", mensajeCompleto);

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al enviar los datos");
    }

});