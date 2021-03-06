import IndexPage from "pages/IndexPage";
import Home from "pages/Home";
import Inventario from "pages/Inventario";
import Deudas from "pages/Deudas";
import Venta from "pages/Venta";
import Usuarios from "pages/Usuarios";
import RealizarPedido from "pages/RealizarPedido";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: IndexPage },
      { path: 'home', component: Home,meta: {requiresAuth: true}},
      { path: 'inventario', component: Inventario,meta: {requiresAuth: true}},
      { path: 'deudas', component: Deudas,meta: {requiresAuth: true}},
      { path: 'venta', component: Venta,meta: {requiresAuth: true}},
      { path: 'usuarios', component: Usuarios,meta: {requiresAuth: true}},
      { path: 'realizarpedido', component: RealizarPedido,meta: {requiresAuth: true}},
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
