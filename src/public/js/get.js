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

function renderizarProducto(producto){
    console.table(producto);

    let htmlProducto = `
        <ul class="lista-container">
            <li class="lista-producto">
                <img src="${producto.imagen}" alt="${producto.nombre_prod}" class="lista-producto_img">
                <p>
                    ID: ${producto.id} 
                    Nombre: ${producto.nombre_prod} 
                    <strong> 
                        Precio: $${producto.precio_prod}
                    </strong>
                </p>
            </li>
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;

}

function mostrarError(string){
    contenedorProductos.innerHTML = `
        <p class="mensaje error">${string}</p>
    `;
}