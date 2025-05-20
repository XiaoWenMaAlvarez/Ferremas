import Error404 from "../components/comunes/pages/Error404";
import AdminTemplate from "../components/administrador/templates/AdminTemplate";
import AdminHome from "../components/administrador/pages/AdminHome";
import LoginAdmin from "../components/administrador/pages/LoginAdmin";
import ListaVendedores from "../components/administrador/pages/ListaVendedores";
import VendedorTemplate from "../components/vendedor/templates/VendedorTemplate";
import VendedorHome from "../components/vendedor/pages/VendedorHome";
import LoginVendedor from "../components/vendedor/pages/LoginVendedor";
import BodegueroTemplate from "../components/bodeguero/templates/BodegueroTemplate";
import LoginBodeguero from "../components/bodeguero/pages/LoginBodeguero";
import ContadorTemplate from "../components/contador/templates/ContadorTemplate";
import ContadorHome from "../components/contador/pages/ContadorHome";
import LoginContador from "../components/contador/pages/LoginContador";
import ClienteTemplate from "../components/cliente/templates/ClienteTemplate";
import ClienteHome from "../components/cliente/pages/ClienteHome";
import LoginCliente from "../components/cliente/pages/LoginCliente";
import ListaBodegueros from "../components/administrador/pages/ListaBodegueros";
import ListaContadores from "../components/administrador/pages/ListaContadores";
import CrearVendedor from "../components/administrador/pages/CrearVendedor";
import CrearBodeguero from "../components/administrador/pages/CrearBodeguero";
import CrearContador from "../components/administrador/pages/CrearContador";
import RegistroCliente from "../components/cliente/pages/RegistroCliente";
import PedidosPendientes from "../components/bodeguero/pages/PedidosPendientes";
import DetallePedidoPendiente from "../components/bodeguero/pages/DetallePedidoPendiente";
import PagosPorConfirmar from "../components/contador/pages/PagosPorConfirmar";
import DetallePedidoPorPagar from "../components/contador/pages/DetallePedidoPorPagar";
import PedidosPorEntregar from "../components/vendedor/pages/PedidosPorEntregar";
import DetallePorConfirmar from "../components/vendedor/pages/DetallePorConfirmar";
import DetallePedidoPorEntregar from "../components/vendedor/pages/DetallePorEntregar";
import Carrito from "../components/cliente/pages/Carrito";
import MisCompras from "../components/cliente/pages/MisCompras";
import Producto from "../components/cliente/pages/Producto";
import DetalleCompraCliente from "../components/cliente/pages/DetallesCompraCliente";
import { createBrowserRouter } from "react-router-dom";
import SeleccionarEntrega from "../components/cliente/pages/SeleccionarEntrega";
import RealizarPago from "../components/cliente/pages/RealizarPago";
import CompraExitosa from "../components/cliente/pages/CompraExitosa";
import EditarVendedor from "../components/administrador/pages/EditarVendedor";
import EditarBodeguero from "../components/administrador/pages/EditarBodeguero";
import EditarContador from "../components/administrador/pages/EditarContador";
import DescuentoConfirmado from "../components/cliente/pages/DescuentoConfirmado";
import CambiarNombreYPass from "../components/administrador/pages/CambiarNombreYPass";
import EditarPerfil from "../components/cliente/pages/EditarPerfil";
import { Navigate } from "react-router-dom";
import InvitadoTemplate from "../components/invitado/templates/InvitadoTemplate";
import InvitadoHome from "../components/invitado/pages/InvitadoHome";
import Contacto from "../components/invitado/pages/Contacto";
import ProductoInvitado from "../components/invitado/pages/ProductoInvitado";
import ListaCategorias from "../components/invitado/pages/ListaCategorias";
import ListaMarcas from "../components/invitado/pages/ListaMarcas";
import ListaProductosPorCategoria from "../components/invitado/pages/ListaProductosPorCategoria";
import ListaProductosPorMarca from "../components/invitado/pages/ListaProductosPorMarca";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/invitado" />,
  },
  //INVITADO
  {
    path: "/invitado",
    element: <InvitadoTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <InvitadoHome></InvitadoHome>,
      },
      {
        path: "contacto",
        element: <Contacto></Contacto>,
      },
      {
        path: "productos",
        element: <ClienteHome modo="invitado"></ClienteHome>,
      },
      {
        path: "producto/:id",
        element: <ProductoInvitado/>,
      },
      {
        path: "categorias",
        element: <ListaCategorias modo="invitado"></ListaCategorias>,
      },
      {
        path: "marcas",
        element: <ListaMarcas modo="invitado"></ListaMarcas>,
      },
      {
        path: "productos_por_categoria/:id",
        element: <ListaProductosPorCategoria modo="invitado"></ListaProductosPorCategoria>
      },
      {
        path: "productos_por_marca/:id",
        element: <ListaProductosPorMarca modo="invitado"></ListaProductosPorMarca>
      }
    ]
  },
  // ADMINISTRADOR
  {
    path: "/administrador",
    element: <AdminTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <AdminHome/>
      },
      {
        path: "vendedores",
        element: <ListaVendedores/>,
      },
      {
        path: "bodegueros",
        element: <ListaBodegueros/>,
      },
      {
        path: "contadores",
        element: <ListaContadores/>,
      },
      {
        path: "crear_vendedor",
        element: <CrearVendedor/>,
      },
      {
        path: "crear_bodeguero",
        element: <CrearBodeguero/>,
      },
      {
        path: "crear_contador",
        element: <CrearContador/>,
      },
      {
        path: "editar_vendedor/:id",
        element: <EditarVendedor/>,
      },
      {
        path: "editar_bodeguero/:id",
        element: <EditarBodeguero/>,
      },
      {
        path: "editar_contador/:id",
        element: <EditarContador/>,
      },
    ]
  },
  {
    path: "/login-admin",
    element: <LoginAdmin/>
  },
  {
    path: "/administrador/cambiar_nombre_y_pass",
    element: <CambiarNombreYPass/>,
  },

  // VENDEDOR
  {
    path: "/vendedor",
    element: <VendedorTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <VendedorHome/>
      },
      {
        path: "pedidos_por_entregar",
        element: <PedidosPorEntregar/>,
      },
      {
        path: "detalle_por_confirmar/:id",
        element: <DetallePorConfirmar/>,
      },
      {
        path: "detalle_pedido_por_entregar/:id",
        element: <DetallePedidoPorEntregar/>,
      },
    ]
  },
  {
    path: "/login-vendedor",
    element: <LoginVendedor/>
  },

  // BODEGUERO
  {
    path: "/bodeguero",
    element: <BodegueroTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        path: "pedidos_pendientes",
        element: <PedidosPendientes/>,
      },
      {
        path: "detalle_pedido_pendiente/:id",
        element: <DetallePedidoPendiente/>,
      },
    ]
  },
  {
    path: "/login-bodeguero",
    element: <LoginBodeguero/>
  },

  // CONTADOR
  {
    path: "/contador",
    element: <ContadorTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <ContadorHome/>
      },
      {
        path: "pagos_por_confirmar",
        element: <PagosPorConfirmar/>,
      },
      {
        path: "detalle_pedido_por_pagar/:id",
        element: <DetallePedidoPorPagar/>,
      },
    ]
  },
  {
    path: "/login-contador",
    element: <LoginContador/>
  },

  // CLIENTE
  {
    path: "/cliente",
    element: <ClienteTemplate/>,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <ClienteHome modo="cliente"/>
      },
      {
        path: "carrito",
        element: <Carrito/>,
      },
      {
        path: "mis_compras",
        element: <MisCompras/>,
      },
      {
        path: "producto/:id",
        element: <Producto/>,
      },
      {
        path: "detalle_compra/:id",
        element: <DetalleCompraCliente/>,
      },
      {
        path: "seleccionar_entrega",
        element: <SeleccionarEntrega/>,
      },
      {
        path: "realizar_pago",
        element: <RealizarPago/>,
      },
      {
        path: "compra_exitosa/:id",
        element: <CompraExitosa/>,
      },
      {
        path: "descuento_confirmado",
        element: <DescuentoConfirmado/>,
      },
      {
        path: "editar_perfil",
        element: <EditarPerfil/>,
      },
      {
        path: "contacto",
        element: <Contacto/>,
      },
      {
        path: "categorias",
        element: <ListaCategorias modo="cliente"></ListaCategorias>,
      },
      {
        path: "marcas",
        element: <ListaMarcas modo="cliente"></ListaMarcas>,
      },
      {
        path: "productos_por_categoria/:id",
        element: <ListaProductosPorCategoria modo="cliente"></ListaProductosPorCategoria>
      },
      {
        path: "productos_por_marca/:id",
        element: <ListaProductosPorMarca modo="cliente"></ListaProductosPorMarca>
      }
    ]
  },
  {
    path: "/login-cliente",
    element: <LoginCliente/>
  },
  {
    path: "/registro_cliente",
    element: <RegistroCliente/>,
  },

  {
    path: "*",
    element: <Error404/>
  }

])

export default router