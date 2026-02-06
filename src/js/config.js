/**
 * Configuración global de la aplicación
 * Este archivo contiene todas las constantes y configuración necesaria
 */

const CONFIG = {
    // URL de la API en Google Apps Script
    API_URL: "https://script.google.com/a/macros/autonoma.edu.co/s/AKfycbwCrPIKE83uUMXGxIGKuLuxerEz73n3Zess4rVQFCXAWcSJUGUZoH8ZvVDMaqCV87vk/exec",
    
    // Campos esperados del backend (Google Sheets)
    FIELDS: {
        FIRST_NAME: "Primer Nombre",
        SECOND_NAME: "Segundo Nombre",
        FIRST_LAST_NAME: "Primer Apellido",
        SECOND_LAST_NAME: "Segundo Apellido"
    },
    
    // Tiempos de espera
    TIMEOUT: 10000, // 10 segundos
};

// Mensajes de error
const ERRORS = {
    UNAUTHORIZED: "No estás autorizado para acceder a esta información",
    NETWORK_ERROR: "Error de conexión. Intenta más tarde",
    PARSE_ERROR: "Error al procesar los datos",
    TIMEOUT: "La solicitud tardó demasiado tiempo",
};
