# Sistema de Información de Docentes

## 📋 Descripción
Aplicación web que permite visualizar la información personal de docentes usando Google Sheets + Google Apps Script.

## 🏗️ Estructura del Proyecto

```
UTC_Faculty/
├── Data.gsheet              # Google Sheet con los datos de docentes
├── index.html               # Página principal (HTML)
├── src/                     # Carpeta de código fuente
│   ├── css/
│   │   └── styles.css       # Estilos de la aplicación
│   ├── js/
│   │   ├── config.js        # Configuración global
│   │   ├── api.js           # Cliente para comunicarse con la API
│   │   └── app.js           # Lógica principal de la aplicación
│   ├── images/              # Imágenes (para futuros usos)
└── README.md                # Este archivo
```

## 🔄 Flujo de la Aplicación

1. **Frontend (HTML/CSS/JavaScript)**
   - El usuario abre `index.html`
   - La aplicación muestra un estado de carga
   - JavaScript se comunica con la API

2. **Backend (Google Apps Script)**
   - Valida que el usuario esté autorizado
   - Lee los datos de la hoja "Hoja" en Google Sheets
   - Devuelve los datos en formato JSON

3. **Comunicación**
   - Fetch realiza una solicitud GET al URL de la API
   - La API valida el usuario autenticado en Google
   - Si está autorizado, devuelve los datos
   - Si no está autorizado, devuelve un error

## 📁 Descripción de Archivos

### `index.html`
- Estructura HTML de la página
- 4 campos para mostrar: Primer Nombre, Segundo Nombre, Primer Apellido, Segundo Apellido
- Importa los archivos CSS y JS en orden correcto

### `src/css/styles.css`
- Estilos responsivos
- Diseño moderno con gradientes
- Animaciones suaves para mejor UX

### `src/js/config.js`
- URL de la API
- Nombres de los campos esperados de Google Sheets
- Mensajes de error centralizados

### `src/js/api.js`
- Clase `APIClient` que maneja las llamadas a la API
- `fetchTeacherData()`: Obtiene los datos del docente
- `extractTeacherInfo()`: Procesa los datos para mostrarlos

### `src/js/app.js`
- Clase `App` que maneja la lógica principal
- `init()`: Inicia la aplicación
- Maneja la visualización de estados (cargando, datos, error)

## 🔑 Campos Esperados en Google Sheets

Asegúrate de que la hoja "Hoja" tenga estas columnas:
- `Primer Nombre`
- `Segundo Nombre`
- `Primer Apellido`
- `Segundo Apellido`

Si los nombres de las columnas son diferentes, actualiza el objeto `FIELDS` en `config.js`.

## 📝 Próximos Pasos

1. ✅ Visualizar información personal (actual)
2. ⬜ Mostrar todas las columnas de docentes
3. ⬜ Crear una tabla/lista de todos los docentes
4. ⬜ Agregar búsqueda y filtros
5. ⬜ Agregar más funcionalidades

## 🚀 Cómo Usar

1. Asegúrate de que el URL de la API esté correcto en `src/js/config.js`
2. Abre `index.html` en un navegador
3. Deberías ver tu información personal cargada

## ⚠️ Notas Importantes

- Recuerda que Google Apps Script maneja la autenticación automáticamente
- Los usuarios deben estar en la lista `allowedUsers` en el script
- Si cambias los nombres de las columnas en Google Sheets, actualiza `config.js`
- El timeout está configurado en 10 segundos

## 📧 Información de Contacto

Para hacer cambios en el backend o agregar nuevos campos, coordina con el equipo de desarrollo.
