function doGet() {
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