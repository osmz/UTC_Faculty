/**
 * api.js - Comunicación con Google Apps Script
 */

const API_URL = "https://script.google.com/macros/s/AKfycbxJwOw31iLAMVM3M7DkzM4pQCZn4dGRW2FcbBTty78145jHKnIITaWQYLLQ56wgrEp6/exec";

/**
 * login() - Valida usuario y contraseña contra Apps Script
 */
async function login(usuario, clave) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        usuario,
        clave
      })
    });

    if (!response.ok) {
      throw new Error("Error al conectar con el servidor");
    }

    const data = await response.json();

    // Si el servidor retorna un error
    if (data.error) {
      throw new Error(data.error);
    }

    // Si es exitoso, retorna el array de docentes
    return {
      success: true,
      docentes: data
    };

  } catch (err) {
    console.error("❌ Error en login:", err);
    return {
      success: false,
      error: err.message || "Error desconocido"
    };
  }
}

/**
 * formatearFecha() - Convierte fecha ISO a formato yyyy/mm/dd
 */
function formatearFecha(fechaISO) {
  if (!fechaISO) return "—";
  try {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${year}/${mes}/${dia}`;
  } catch (e) {
    return fechaISO;
  }
}
