/**
 * Módulo principal de la aplicación
 * Maneja la lógica de inicio y actualización de la UI
 */

class App {
    constructor() {
        this.loadingElement = document.getElementById("loading");
        this.teacherInfoElement = document.getElementById("teacherInfo");
        this.errorElement = document.getElementById("error");
        this.errorMessageElement = document.getElementById("errorMessage");
        
        // Elementos de los campos
        this.fields = {
            firstName: document.getElementById("firstName"),
            secondName: document.getElementById("secondName"),
            firstLastName: document.getElementById("firstLastName"),
            secondLastName: document.getElementById("secondLastName")
        };
    }

    /**
     * Inicia la aplicación
     */
    async init() {
        try {
            // Mostrar estado de carga
            this.showLoading();

            // Obtener datos del docente
            const data = await APIClient.fetchTeacherData();
            const teacher = APIClient.extractTeacherInfo(data);

            // Mostrar información
            this.displayTeacherInfo(teacher);
            this.showTeacherInfo();

        } catch (error) {
            console.error("Error:", error);
            this.showError(error.message);
        }
    }

    /**
     * Muestra el estado de carga
     */
    showLoading() {
        this.loadingElement.style.display = "block";
        this.teacherInfoElement.style.display = "none";
        this.errorElement.style.display = "none";
    }

    /**
     * Muestra la información del docente
     */
    showTeacherInfo() {
        this.loadingElement.style.display = "none";
        this.teacherInfoElement.style.display = "block";
        this.errorElement.style.display = "none";
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message Mensaje de error
     */
    showError(message) {
        this.loadingElement.style.display = "none";
        this.teacherInfoElement.style.display = "none";
        this.errorElement.style.display = "block";
        this.errorMessageElement.textContent = message;
    }

    /**
     * Completa los campos con la información del docente
     * @param {Object} teacher Objeto con la información del docente
     */
    displayTeacherInfo(teacher) {
        this.fields.firstName.textContent = teacher.firstName;
        this.fields.secondName.textContent = teacher.secondName;
        this.fields.firstLastName.textContent = teacher.firstLastName;
        this.fields.secondLastName.textContent = teacher.secondLastName;
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();
});
