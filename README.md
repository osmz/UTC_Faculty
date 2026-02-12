# Sistema de Información de Docentes

## 📋 Descripción
Aplicación web de control de acceso que permite visualizar información completa de docentes de la Universidad Autónoma de Manizales. El sistema utiliza un formulario de login seguro contra Google Apps Script y Google Sheets como base de datos.

**Arquitectura:**
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (GitHub Pages)
- **Backend:** Google Apps Script con validación de credenciales
- **Base de Datos:** Google Sheets con hojas "docentes" y "usuarios"

---

## 🏗️ Estructura del Proyecto

```
UTC_Faculty/
├── index.html               # 🔐 Página de login (usuario + contraseña)
├── docentes.html            # 👥 Página de información de docentes
├── css/
│   └── styles.css           # Estilos compartidos (login + docentes)
├── js/
│   ├── api.js               # Funciones de comunicación con API
│   ├── login.js             # Lógica del formulario de login
│   └── docentes.js          # Búsqueda y visualización de docentes
├── codigo.gs                # Code de Google Apps Script (para referencia)
├── README.md                # Este archivo
└── Data.gsheet              # Google Sheet con datos (referencia)
```

---

## 🔄 Flujo de Autenticación

```
┌─────────────┐
│ index.html  │  ← Usuario abre el sitio
└──────┬──────┘
       │
       ▼
┌──────────────────────────────┐
│ Ingresa usuario + contraseña │  ← login.js captura datos
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ login() en api.js                │
│ Envía POST a Apps Script         │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Apps Script (codigo.gs)          │
│ - validarUsuario()               │
│ - Compara contra hoja "usuarios" │
└──────┬───────────────────────────┘
       │
       ├─ ✅ Válido → Devuelve array de docentes
       │
       └─ ❌ Inválido → Devuelve { error: "..." }
       │
       ▼
┌──────────────────────────────────┐
│ login.js recibe respuesta         │
│ - Si OK: Guarda en sessionStorage │
│ - Redirige a docentes.html        │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ docentes.html                    │
│ - Carga docentes de session      │
│ - Muestra buscador               │
│ - Botón "Cerrar Sesión"          │
└──────────────────────────────────┘
```

---

## 📁 Descripción de Archivos

### `index.html` - Página de Login
**Responsabilidad:** Autenticación del usuario
- Formulario con campos: Usuario y Contraseña
- Validación de campos (no vacíos)
- Muestra estado de carga mientras se valida
- Mensaje de error si credenciales son inválidas
- Estilos responsivos y seguros

### `docentes.html` - Página de Docentes
**Responsabilidad:** Búsqueda y visualización
- Buscador por: nombre, cédula, departamento
- Muestra lista si hay múltiples coincidencias
- Perfil completo en 3 secciones:
  - 👤 **Información Personal** (ID, nombres, apellidos, edad, etc.)
  - 💼 **Información Laboral** (departamento, cargo, correos, etc.)
  - 🎓 **Formación Académica** (nivel, título, institución, etc.)
- Botón "Cerrar Sesión" que borra datos y vuelve a login

### `css/styles.css` - Estilos Generales
**Responsabilidad:** Diseño visual de ambas páginas
- **Login:** Centrado, tarjeta moderna, colores institucionales
- **Docentes:** Contenedor flexible, grid responsivo
- **Colores:** #0069A3 (azul institucional), #F4D73B (amarillo)
- **Tipografía:** Arial, estilos claros y legibles
- **Responsive:** Adapta a móvil, tablet y desktop

### `js/api.js` - Comunicación con Backend
**Responsabilidad:** Conectar frontend ↔ Apps Script
- `login(usuario, clave)` → Valida credenciales, retorna docentes
- `formatearFecha(fechaISO)` → Convierte yyyy-mm-dd a yyyy/mm/dd
- Errores claros si hay problemas de conexión

### `js/login.js` - Lógica del Login
**Responsabilidad:** Manejar el formulario de autenticación
- Captura el evento `submit` del formulario
- Valida que usuario y clave no estén vacíos
- Llama a `login()` de api.js
- Si es exitoso: Guarda datos en `sessionStorage` y redirige
- Si falla: Muestra el error y permite reintentar

### `js/docentes.js` - Lógica de Búsqueda
**Responsabilidad:** Búsqueda y visualización de docentes
- Verifica si usuario está autenticado (redirige a login si no)
- Carga docentes desde `sessionStorage`
- Busca por: nombre completo, cédula, departamento, primer nombre, apellido
- Muestra lista si encuentra múltiples coincidencias
- Renderiza perfil completo al seleccionar docente
- Botón "Logout" que borra sesión

### `codigo.gs` - Backend en Google Apps Script
**Responsabilidad:** Validación segura de credenciales y datos
- `obtenerDocentes()` → Lee hoja "docentes" y retorna JSON
- `validarUsuario(usuario, clave)` → Busca en hoja "usuarios"
- `doPost(e)` → Punto de entrada, valida y retorna docentes o error

---

## 🔐 Estructura de Google Sheets

### Hoja "docentes"
Contiene información de los docentes. Ejemplo de columnas:
```
Nombre Completo | Número de Identificación | Cargo | Departamento | ...
XXXX XXXXX      | XXXXXXXX                 | Prof  | Ingeniería   | ...
```

### Hoja "usuarios"
Contiene credenciales autorizadas:
```
Usuario  | Contraseña   | rol
---------|--------------|----------
XXX      | XXXXX        | Coordinador
XXXXX    | XXXXX        | Coordinador
XXXX     | XXXXX        | Coordinador
```

---

## 🚀 Cómo Usar

### Para Usuarios Finales
1. Abre `index.html` en el navegador
2. Ingresa usuario y contraseña (ej: `XXX` / `XXXXX`)
3. Haz clic en "Iniciar Sesión"
4. Usa el buscador para encontrar docentes
5. Haz clic en "Cerrar Sesión" para salir

### Para Desarrolladores

#### Probar en Local
```bash
# Clonar el repositorio
git clone https://github.com/osmz/UTC_Faculty.git
cd UTC_Faculty

# Abrir index.html en el navegador
# (O usar un servidor local como Live Server de VS Code)
```

#### Actualizar Docentes o Usuarios
1. Edita la hoja correspondiente en Google Sheets
2. Apps Script leerá automáticamente los cambios
3. Los cambios aparecen en la siguiente búsqueda

#### Agregar Nuevos Campos
1. Agrega la columna en Google Sheet
2. El código leerá automáticamente (usa nombres exactos de columnas)
3. En `docentes.html`, agrega un `<div class="campo">` para mostrarlo

---

## ⚠️ Notas Importantes

### Validación de Credenciales
- Las credenciales se validan en **Apps Script** (servidor)
- Nunca se guarda la contraseña en el navegador
- Se usa `sessionStorage` solo para la sesión actual (se borra al cerrar tab)

### Nombres de Columnas
- Deben ser **exactos** (mayúsculas/minúsculas)
- Si cambias una columna en Google Sheet, actualiza `docentes.html`

### Espacios en Blanco
- El código usa `.trim()` para eliminar espacios accidentales
- Válido para usuario: `"XXX"` o `" XXX "`

### Tipos de Datos
- Las contraseñas en Google Sheet se guardan como **texto** (no números)
- Si una contraseña es `XXXX`, escribe `XXXX` (como texto)

---

## 🔧 Debugging

### Ver Logs de Apps Script
1. Abre Apps Script en Google Drive
2. Ve a **Editor** → **Logs** (Ctrl+Enter después de ejecutar)
3. Usa `Logger.log()` para ver qué validacio fallando

### Ver Datos en sessionStorage
En el navegador, abre **DevTools** (F12):
```javascript
console.log(sessionStorage.getItem("docentes"));
console.log(sessionStorage.getItem("usuario"));
```

### Errores Comunes
| Error | Causa | Solución |
|-------|-------|----------|
| "Credenciales inválidas" | Usuario o clave incorrectos | Verifica la hoja "usuarios" en Google Sheet |
| Página en blanco después de login | sessionStorage vacío | Verifica que Apps Script devuelva JSON válido |
| Búsqueda sin resultados | Campo de búsqueda vacío | Intenta con un nombre o cédula |

---

## 📊 Próximos Pasos

- ✅ Sistema de autenticación
- ✅ Búsqueda de docentes
- ✅ Visualización de perfil completo
- ⬜ Exportar información a PDF
- ⬜ Historial de búsquedas
- ⬜ Roles de usuario (admin, coordinador, etc.)

---

## 📧 Contacto

Para reportar errores o solicitar mejoras, contacta al equipo de desarrollo.

**Versión:** 2.0
**Última actualización:** Febrero 2026

