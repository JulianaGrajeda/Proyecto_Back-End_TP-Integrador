const inputEmail = document.getElementById("emailUser");
const inputPassword = document.getElementById("passwordUser");
const btnAccesoRapido = document.getElementById("btn-acceso-rapido");

btnAccesoRapido.addEventListener("click", () => {
    inputEmail.value = "usuario_tester@gmail.com";
    inputPassword.value = "prueba123";
});