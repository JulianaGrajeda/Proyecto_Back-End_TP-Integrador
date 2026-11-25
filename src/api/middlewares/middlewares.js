// Middleware para filtrar ids no validos
const validateId = (req, res, next) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		return res.status(404).json({
			message: "El id debe ser un numero entero positivo"
		})
	}

	req.id = id;
	next();
}

// Middleware para validar los campos del formulario
const validateProduct = (req, res, next) => {
	const categoriasValidas = ["food", "drink"];

	const { nombre_prod, imagen, precio_prod, categoria } = req.body;
	const errores = [];

	if (!nombre_prod || !imagen || !precio_prod || !categoria) {
		errores.push("Faltan campos requeridos");
	}

	if (typeof nombre_prod !== "string" || nombre_prod.trim().length < 2) {
		errores.push("El nombre debe tener al menos 2 caracteres");
	}


	if (typeof precio_prod !== "number" || precio_prod <= 0) {
		errores.push("El precio debe ser un numero mayor a 0");
	}


	if (!categoriasValidas.includes(categoria)) {
		errores.push("Categoria invalida");
	}


	if (errores.length > 0) {
		console.log(errores);
		return res.status(400).json({
			message: "Datos invalidos",
			listaErrores: errores
		});
	}

	next();
}

export {
    validateId,
    validateProduct
}