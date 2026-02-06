/**
 * Módulo para manejar las llamadas a la API
 * Gestiona la comunicación con Google Apps Script
 */

class APIClient {
    /**
     * Obtiene los datos del docente desde la API
     * @returns {Promise<Array>} Array de datos del docente
     */
    static async fetchTeacherData() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

            const response = await fetch(CONFIG.API_URL, {
                method: "GET",
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error(ERRORS.UNAUTHORIZED);
                }
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            // Validar que sea un array
            if (!Array.isArray(data)) {
                throw new Error(ERRORS.PARSE_ERROR);
            }

            return data;

        } catch (error) {
            if (error.name === "AbortError") {
                throw new Error(ERRORS.TIMEOUT);
            }
            if (error.message === ERRORS.UNAUTHORIZED) {
                throw error;
            }
            throw new Error(ERRORS.NETWORK_ERROR);
        }
    }

    /**
     * Extrae la información personal del primer docente
     * @param {Array} data Array de docentes
     * @returns {Object} Objeto con la información del docente
     */
    static extractTeacherInfo(data) {
        if (!data || data.length === 0) {
            throw new Error("No hay datos disponibles");
        }

        const teacher = data[0];

        return {
            firstName: teacher[CONFIG.FIELDS.FIRST_NAME] || "—",
            secondName: teacher[CONFIG.FIELDS.SECOND_NAME] || "—",
            firstLastName: teacher[CONFIG.FIELDS.FIRST_LAST_NAME] || "—",
            secondLastName: teacher[CONFIG.FIELDS.SECOND_LAST_NAME] || "—"
        };
    }
}
