import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { USER_API_URL } from "../constants/env"

export const generarBoletaPDF = async (venta) => {

  let productosVenta = await axios.get(`${USER_API_URL}/detalle_venta/por_venta/${venta.id_venta}`)

  productosVenta = productosVenta.data

  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(16);
  doc.text("Boleta de Venta", 80, 15);

  let direccion =""

  if(venta.direccion_envio == null){
    let response = await axios.get(`${USER_API_URL}/tienda/${venta.sucursal_retiro}`)
    direccion = response.data.direccion
  } else {
    direccion = venta.direccion_envio
  }

  let metodo_pago = venta.id_tipo_pago == 1 ? "Crédito o débito" : "Transferencia electrónica" 

  // Datos de la venta
  doc.setFontSize(12);
  doc.text(`Fecha: ${venta.fecha}`, 14, 30);
  doc.text(`Dirección de envío: ${direccion}`, 14, 38);
  doc.text(`Método de pago: ${metodo_pago}`, 14, 46);

  // Tabla de productos
  const productos = productosVenta.map((prod) => [
    prod.nombre,
    prod.cantidad,
    `$${prod.precio_venta.toLocaleString()}`,
    `$${(prod.precio_venta * prod.cantidad).toLocaleString()}`,
  ]);

  let total_bruto = 0

  productosVenta.forEach((prod) => {
    total_bruto = total_bruto + (prod.precio_venta * prod.cantidad)
  });

  let total_con_descuento = total_bruto - (total_bruto * venta.descuento / 100)

  let envio = venta.id_tipo_entrega == 1 ? 2500 : 0

  let total_neto = total_con_descuento + envio


  autoTable(doc, {
    startY: 55,
    head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
    body: productos,
  });

  // Totales
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Total Bruto: $${total_bruto.toLocaleString()}`, 14, finalY);
  doc.text(`Descuento: ${venta.descuento.toLocaleString()}%`, 14, finalY + 8);
  doc.text(`Total con descuento: ${total_con_descuento.toLocaleString()}`, 14, finalY + 16);
  doc.text(`Envío: ${envio.toLocaleString()}`, 14, finalY + 24);
  doc.text(
    `Total Neto: $${total_neto.toLocaleString()}`,
    14,
    finalY + 32
  );

  // Descargar el PDF
  doc.save(`boleta_venta_con_id_${venta.id_venta}.pdf`);
};
