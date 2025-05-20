import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportarVentasAExcel = (ventas, mes, anio) => {

  if(mes < 10) {
    mes = `0${mes}`
  }

  // 1. Formatear datos para Excel
  const datos = ventas.map((venta) => ({
    "Fecha de Venta": venta.fecha,
    "Total Bruto": venta.total_bruto,
    "Descuento (%)": venta.descuento,
    "Total Neto": venta.total_neto,
  }));

  // 2. Crear hoja y libro
  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Reporte de Ventas");  

  // 3. Convertir a Blob y guardar
  const excelBuffer = XLSX.write(libro, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `reporte_ventas_${mes}/${anio}.xlsx`);
};


export default exportarVentasAExcel