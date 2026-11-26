const productosContainer = document.getElementById("contenedor-productos");

productosContainer.addEventListener("click", async event => {
    const deleteButton = event.target.closest("[data-delete-product]");
    if (!deleteButton) {
        return;
    }

    const productCard = deleteButton.closest(".card-producto");
    const updateForm = deleteButton.closest(".updateProduct-container");
    const productId = deleteButton.dataset.deleteProduct;
    if ((!productCard && !updateForm) || !productId) {
        return;
    }

    if (!window.confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
        return;
    }

    deleteButton.disabled = true;

    try {
        const response = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
            method: "DELETE"
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "No se pudo eliminar el producto.");
        }

        if (updateForm) {
            window.location.href = "/dashboard/principal";
            return;
        }

        productCard.remove();

        if (!productosContainer.querySelector(".card-producto")) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "productos-vacios";
            emptyMessage.textContent = "No hay productos para mostrar.";
            productosContainer.append(emptyMessage);
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        deleteButton.disabled = false;
        window.alert(error instanceof Error ? error.message : "No se pudo eliminar el producto.");
    }
});
