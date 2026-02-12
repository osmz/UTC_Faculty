/**
 * docentes.js - Búsqueda y visualización de docentes
 */

let allDocentes = [];

document.addEventListener("DOMContentLoaded", function () {
  // Verificar si el usuario está logueado
  if (!sessionStorage.getItem("logueado")) {
    window.location.href = "index.html";
    return;
  }

  // Cargar docentes desde sessionStorage
  const docentesJSON = sessionStorage.getItem("docentes");
  if (docentesJSON) {
    allDocentes = JSON.parse(docentesJSON);
  }

  // Elementos del DOM
  const inputBusqueda = document.getElementById("busqueda");
  const btnBuscar = document.getElementById("btnBuscar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const btnLogout = document.getElementById("btnLogout");
  const divResultadoContainer = document.getElementById("resultadoContainer");
  const divResultadosMultiplesContainer = document.getElementById("resultadosMultiplesContainer");
  const divListaResultados = document.getElementById("listaResultados");
  const divError = document.getElementById("error");
  const usuario = document.getElementById("usuarioSpan");

  // Mostrar usuario logueado
  const usuarioLogueado = sessionStorage.getItem("usuario");
  if (usuario) {
    usuario.textContent = usuarioLogueado;
  }

  /**
   * Buscar docente
   */
  function buscarDocente() {
    const termino = inputBusqueda.value.trim().toLowerCase();

    if (!termino) {
      divError.style.display = "none";
      divResultadoContainer.style.display = "none";
      divResultadosMultiplesContainer.style.display = "none";
      return;
    }

    const resultados = allDocentes.filter(doc => {
      const nombre = (doc["Nombre Completo"] || "").toLowerCase();
      const numId = (doc["Número de Identificación"] || "").toString().toLowerCase();
      const departamento = (doc["Departamento"] || "").toLowerCase();
      const nombre1 = (doc["Primer Nombre"] || "").toLowerCase();
      const apellido1 = (doc["Primer Apellido"] || "").toLowerCase();

      return (
        nombre.includes(termino) ||
        numId.includes(termino) ||
        departamento.includes(termino) ||
        nombre1.includes(termino) ||
        apellido1.includes(termino)
      );
    });

    if (resultados.length === 0) {
      mostrarError("❌ No se encontró ningún docente con ese criterio");
      divResultadoContainer.style.display = "none";
      divResultadosMultiplesContainer.style.display = "none";
      return;
    }

    // Si hay UN SOLO resultado
    if (resultados.length === 1) {
      divResultadosMultiplesContainer.style.display = "none";
      mostrarDocente(resultados[0]);
      divError.style.display = "none";
      divResultadoContainer.style.display = "block";
      return;
    }

    // Si hay MÚLTIPLES resultados
    mostrarListaResultados(resultados);
    divError.style.display = "none";
    divResultadoContainer.style.display = "none";
  }

  /**
   * Mostrar lista de docentes para seleccionar
   */
  function mostrarListaResultados(resultados) {
    divListaResultados.innerHTML = "";

    resultados.forEach((doc) => {
      const item = document.createElement("div");
      item.style.cssText = `
        background: white;
        border: 2px solid #0069A3;
        border-radius: 6px;
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;

      item.innerHTML = `
        <div>
          <div style="font-weight: bold; color: #0069A3; font-size: 14px;">${doc["Nombre Completo"] || "—"}</div>
          <div style="color: #666; font-size: 12px;">ID: ${doc["Número de Identificación"] || "—"} | ${doc["Departamento"] || "—"}</div>
          <div style="color: #999; font-size: 11px;">${doc["Cargo"] || "—"}</div>
        </div>
        <button style="
          background: #0069A3;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        ">Ver</button>
      `;

      item.addEventListener("mouseenter", () => {
        item.style.background = "#e3f2fd";
        item.style.borderColor = "#F4D73B";
        item.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.background = "white";
        item.style.borderColor = "#0069A3";
        item.style.boxShadow = "none";
      });

      item.addEventListener("click", () => {
        mostraDocenteYOcultarLista(doc);
      });

      divListaResultados.appendChild(item);
    });

    divResultadosMultiplesContainer.style.display = "block";
  }

  /**
   * Mostrar docente seleccionado
   */
  function mostraDocenteYOcultarLista(doc) {
    mostrarDocente(doc);
    divResultadosMultiplesContainer.style.display = "none";
    divResultadoContainer.style.display = "block";
    window.scrollTo(0, 0);
  }

  /**
   * Llenar formulario con datos del docente
   */
  function mostrarDocente(doc) {
    // Encabezado
    document.getElementById("cargo").textContent = doc["Cargo"] || "—";
    document.getElementById("nombreCompleto").textContent = doc["Nombre Completo"] || "—";

    // Información Personal
    document.getElementById("tipoId").textContent = doc["Tipo de Identificación"] || "—";
    document.getElementById("numeroId").textContent = doc["Número de Identificación"] || "—";
    document.getElementById("lugarExp").textContent = doc["Lugar de Expedición"] || "—";
    document.getElementById("fechaExp").textContent = formatearFecha(doc["Fecha de Expedición"]);
    document.getElementById("nombre1").textContent = doc["Primer Nombre"] || "—";
    document.getElementById("nombre2").textContent = doc["Segundo Nombre"] || "—";
    document.getElementById("apellido1").textContent = doc["Primer Apellido"] || "—";
    document.getElementById("apellido2").textContent = doc["Segundo Apellido"] || "—";
    document.getElementById("fechaNac").textContent = formatearFecha(doc["Fecha de Nacimiento"]);
    document.getElementById("edad").textContent = doc["Edad"] || "—";
    document.getElementById("contacto").textContent = doc["Número de Contacto"] || "—";
    document.getElementById("rh").textContent = doc["RH"] || "—";
    document.getElementById("genero").textContent = doc["Genero"] || "—";

    // Información Laboral
    document.getElementById("departamento").textContent = doc["Departamento"] || "—";
    document.getElementById("estado").textContent = doc["Estado"] || "—";
    document.getElementById("dedicacion").textContent = doc["Dedicación"] || "—";
    document.getElementById("estatus").textContent = doc["Estatus"] || "—";
    document.getElementById("fechaNovedad").textContent = doc["Fecha de la Novedad"] || "—";
    document.getElementById("correoIns").textContent = doc["Correo Institucional"] || "—";
    document.getElementById("correoPersonal").textContent = doc["Correo Personal"] || "—";

    // Formación Académica
    document.getElementById("nivelFormacion").textContent = doc["Máximo Nivel de Formación"] || "—";
    document.getElementById("areaConocimiento").textContent = doc["Área de Conocimiento"] || "—";
    document.getElementById("titulo").textContent = doc["Titulo Obtenido"] || "—";
    document.getElementById("institucion").textContent = doc["Institución"] || "—";
    document.getElementById("pais").textContent = doc["Pais"] || "—";
  }

  /**
   * Mostrar error
   */
  function mostrarError(mensaje) {
    divError.textContent = mensaje;
    divError.style.display = "block";
  }

  /**
   * Limpiar búsqueda
   */
  function limpiar() {
    inputBusqueda.value = "";
    divError.style.display = "none";
    divResultadoContainer.style.display = "none";
    divResultadosMultiplesContainer.style.display = "none";
    inputBusqueda.focus();
  }

  /**
   * Cerrar sesión
   */
  function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }

  // Event listeners
  btnBuscar.addEventListener("click", buscarDocente);
  btnLimpiar.addEventListener("click", limpiar);
  btnLogout.addEventListener("click", logout);
  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarDocente();
  });

  // Enfocar en input de búsqueda al cargar
  inputBusqueda.focus();
});
