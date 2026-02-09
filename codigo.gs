function doGet() {
  // Lista blanca de correos permitidos (coordination). Reemplaza por los correos reales.
  const ALLOWED_EMAILS = [
    'coord1@autonoma.edu.co',
    'coord2@autonoma.edu.co'
  ];

  // Intentar obtener el email del usuario autenticado
  const userEmail = Session.getActiveUser && Session.getActiveUser().getEmail ? Session.getActiveUser().getEmail() : '';

  // Si hay lista de correos y el usuario no está en ella, devolver 403 JSON
  if (ALLOWED_EMAILS.length > 0) {
    if (!userEmail || ALLOWED_EMAILS.indexOf(userEmail.toLowerCase()) === -1) {
      const payload = { error: 'access_denied', message: 'Acceso denegado: usuario no autorizado.' };
      return ContentService
        .createTextOutput(JSON.stringify(payload))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("docentes");

  const values = sheet.getDataRange().getValues();
  const headers = values.shift();

  const data = values.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i] || "");
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}