// 1️⃣ Obtener docentes (tu lógica original)
function obtenerDocentes() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("docentes");

  const values = sheet.getDataRange().getValues();
  const headers = values.shift();

  return values.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i] || "");
    return obj;
  });
}

// 2️⃣ Validar usuario y clave
function validarUsuario(usuario, clave) {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("usuarios");

  const data = sheet.getDataRange().getValues();
  data.shift();

  return data.some(row =>
    row[0] === usuario && row[1] === clave
  );
}

// 3️⃣ ÚNICO punto de entrada
function doPost(e) {
  const params = JSON.parse(e.postData.contents);

  const autorizado = validarUsuario(
    params.usuario,
    params.clave
  );

  if (!autorizado) {
    return ContentService
      .createTextOutput(
        JSON.stringify({ error: "Credenciales inválidas" })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(
      JSON.stringify(obtenerDocentes())
    )
    .setMimeType(ContentService.MimeType.JSON);
}