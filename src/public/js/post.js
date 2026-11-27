const contenedorProductos = document.getElementById("contenedor-productos");
const createProductForm = document.getElementById("createProductForm");
const urlBase = "http://localhost:3000";

const mensajeConfirmacion = document.getElementById("mensajes")?.dataset.successMessage;
if (mensajeConfirmacion) {
    window.alert(mensajeConfirmacion);
}

function validarFormulario(data){
    const errores = [];

    if (!data.name || data.name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres.");
    }

    if (!data.price || data.price <= 0) {
        errores.push("El precio debe ser un número mayor a 0.");
    }

    if (!data.category) {
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
    formObj.price = Number(formObj.price);
    formObj.name = formObj.name?.trim() ?? "";
    formObj.image = formObj.image?.trim() ?? "";

    const errores = validarFormulario(formObj);

    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores);
    }

    const submitButton = createProductForm.querySelector('input[type="submit"]');
    submitButton.disabled = true;

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
            console.error(data.listaErrores);
            return mostrarListaErrores(data.listaErrores || [data.message]);
        }

        console.log(data.message);
        let mensajeCompleto = `${data.message} con id ${data.productId}`;
        window.alert(mensajeCompleto);
        createProductForm.reset();

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al enviar los datos");
    } finally {
        submitButton.disabled = false;
    }

});