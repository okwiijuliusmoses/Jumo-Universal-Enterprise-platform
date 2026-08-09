import { faapEnterpriseEngine } from "./FAAPEnterpriseEngine";

function downloadFile(
  filename: string,
  content: string,
  mimeType: string,
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

export function exportFAAPToExcel() {
  const content = faapEnterpriseEngine.exportExcelCompatible();

  downloadFile(
    `JUMO-FAAP-Financial-Report-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`,
    content,
    "text/csv;charset=utf-8",
  );
}

export function exportFAAPToWord() {
  const content = faapEnterpriseEngine.exportWordCompatible();

  downloadFile(
    `JUMO-FAAP-Financial-Report-${new Date()
      .toISOString()
      .slice(0, 10)}.doc`,
    content,
    "application/msword",
  );
}
