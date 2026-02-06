/**
 * Aplicación simple para obtener datos del Apps Script
 */

function updateStatus(message, type = 'loading') {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = type;
}

function displayData(data) {
    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = '<h3>Respuesta del servidor:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
}

async function fetchData() {
    if (!CONFIG.API_URL || CONFIG.API_URL.includes('TU_DEPLOYMENT_ID')) {
        updateStatus('⚠️ Falta configurar la URL del Apps Script en config.js', 'error');
        return;
    }

    try {
        updateStatus('⏳ Obteniendo datos...', 'loading');
        const response = await fetch(CONFIG.API_URL);
        const data = await response.json();
        updateStatus('✅ Datos obtenidos correctamente', 'success');
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
        updateStatus('❌ Error: ' + error.message, 'error');
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', fetchData);
