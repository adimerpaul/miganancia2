/*
export function someGetter (state) {
}
*/
export function isLoggedIn (state) {
  return !!state.token
}

export function authStatus (state) {
  return state.status
}
export function user (state) {
  return state.user
}
export function negocios (state) {
  return state.negocios
}
export function negocio (state) {
  return state.negocio
}
export function productos (state) {
  return state.productos
}
export function producto (state) {
  return state.producto
}
export function categorias (state) {
  return state.categorias
}
export function categoria (state) {
  return state.categoria
}
export function unit (state) {
  return state.user.unit
}
