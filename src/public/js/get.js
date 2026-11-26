const contenedorProductos = document.getElementById("products-container");
const getIdProductForm = document.getElementById("getIdProductForm");
const urlBase = "http://localhost:3000";

getIdProductForm.addEventListener( "submit", async event => {

    //Evitamos el envio por defecto del form
    event.preventDefault();

    const idProd  = Number(event.target.idProd.value.trim());
    // console.log(idProd);


    if (!idProd || idProd<= 0){
        return mostrarError("Ingresa un ID válido.");
    }

    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);

        const data = await response.json();

        if(!response.ok){
            mostrarError(data.message);
            return;
        }


        const producto = data.payload[0];
        renderizarProducto(producto);

    }
    catch (error){
        console.error("Error al obtener el producto:", error.message);
        mostrarError("Error de conexion con el servidor");
    }
});

const idFromQuery = new URLSearchParams(window.location.search).get("id");
if (idFromQuery !== null) {
    getIdProductForm.elements.idProd.value = idFromQuery;
    getIdProductForm.requestSubmit();
}

function renderizarProducto(producto){
    console.table(producto);

    let htmlProducto = `
        <ul class="lista-container">
            <li class="lista-producto">
                <img src="${producto.image}" alt="${producto.name}" class="lista-producto_img">
                <div class="lista-producto_info">
                    <p><strong>ID:</strong> ${producto.id}</p>
                    <p><strong>Nombre:</strong> ${producto.name}</p>
                    <p class="lista-producto_precio"><strong>Precio: $${producto.price}</strong></p>
                </div>
                <button type="button" id="editProduct-button">Editar producto</button>
            </li>
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
    document.getElementById("editProduct-button").addEventListener("click", () => {
        window.location.href = `/dashboard/modificar?id=${encodeURIComponent(producto.id)}`;
    });

}

function mostrarError(string){
    contenedorProductos.innerHTML = `
        <p class="mensaje error">${string}</p>
    `;
}