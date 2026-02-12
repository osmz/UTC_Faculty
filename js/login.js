/**
 * login.js - Lógica del formulario de login
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const claveInput = document.getElementById("clave");
  const loginError = document.getElementById("loginError");
  const loginCargando = document.getElementById("loginCargando");

  /**
   * Maneja el envío del formulario
   */
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const clave = claveInput.value.trim();

    console.log("🔐 Intentando login con usuario:", usuario);

    // Validación básica
    if (!usuario || !clave) {
      mostrarError(loginError, "Por favor completa todos los campos");
      return;
    }

    // Mostrar cargando, ocultar error
    loginCargando.style.display = "block";
    loginError.style.display = "none";

    // Llamar a la función de login
    console.log("📡 Enviando credenciales...");
    const resultado = await login(usuario, clave);

    console.log("📥 Respuesta del servidor:", resultado);

    loginCargando.style.display = "none";

    if (!resultado.success) {
      mostrarError(loginError, resultado.error);
      claveInput.value = ""; // Limpiar contraseña
      return;
    }

    // ✅ Login exitoso
    console.log("✅ Login exitoso, guardando datos...");
    // Guardar datos en sessionStorage
    sessionStorage.setItem("docentes", JSON.stringify(resultado.docentes));
    sessionStorage.setItem("usuario", usuario);
    sessionStorage.setItem("logueado", "true");

    console.log("🚀 Redirigiendo a docentes.html...");
    // Redirigir a docentes.html
    window.location.href = "docentes.html";
  });

  /**
   * Mostrar mensaje de error
   */
  function mostrarError(elemento, mensaje) {
    elemento.textContent = "❌ " + mensaje;
    elemento.style.display = "block";
  }

  // Enfocar en el input de usuario al cargar
  usuarioInput.focus();
});
