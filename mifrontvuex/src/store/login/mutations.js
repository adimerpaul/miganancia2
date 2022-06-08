/*
export function someMutation (state) {
}
*/
export function auth_request(state){
  state.status = 'loading'
}
export function categorias_request(state,data){
  state.categorias=data
}
export function dialogCreateProducto_request(state,data){
  state.dialogCreateProducto=data
}
export function categoria_request(state,data){
  state.categoria=data
}
// export function negocios_request(state,data){
//   state.negocios=data
// }
// export function negocio_request(state,data){
//   state.negocio=data
// }
export function productos_request(state,data){
  state.productos=data
}
export function producto_request(state,data){
  state.producto=data
}
export function negocios_request(state,data){
  state.negocios=data.user.negocios
  // // state.user=data.user
  // // state.negocio=
  // console.log(data.user)
  // console.log(state.user.minegocio)
  let ne = state.negocios.find(n=>n.id===data.user.minegocio)
  // console.log(ne)
  state.negocio= ne
}
export function auth_success(state, data){
  // console.log(data)
  state.status = 'success'
  state.token = data.token
  state.user = data.user
  // state.negocios = data.user.negocios
  // // console.log(data.user)
  // let ne= data.user.negocios.find(n=>n.id===data.user.minegocio)
  // // console.log(ne)
  // state.negocio= ne
  // state.boolusuarios=data.user.permisos.find(p=>p.id===1)!=undefined
  // state.boolrecepcion=data.user.permisos.find(p=>p.id===2)!=undefined
  // state.booldesignacion=data.user.permisos.find(p=>p.id===3)!=undefined
  // state.boolseguimiento=data.user.permisos.find(p=>p.id===4)!=undefined
  // state.boolmisrecepciones=data.user.permisos.find(p=>p.id===5)!=undefined
  // state.inventario=data.user.permisos.find(p=>p.id===4)!=undefined
  // state.ventadetalle=data.user.permisos.find(p=>p.id===5)!=undefined
  // state.historialventadetalle=data.user.permisos.find(p=>p.id===6)!=undefined
  // state.ventalocal=data.user.permisos.find(p=>p.id===7)!=undefined
  // state.historialventalocal=data.user.permisos.find(p=>p.id===8)!=undefined
  // state.empleados=data.user.permisos.find(p=>p.id===9)!=undefined
  // state.reportes=data.user.permisos.find(p=>p.id===10)!=undefined
  // state.gastos=data.user.permisos.find(p=>p.id===11)!=undefined
  // state.historialprestamo=data.user.permisos.find(p=>p.id===12)!=undefined
  // state.historialventa=data.user.permisos.find(p=>p.id===13)!=undefined
  // state.anular=data.user.permisos.find(p=>p.id===14)!=undefined
}
export function   auth_error(state){
  state.status = 'error'
}
export function salir(state){
  state.status = ''
  state.token = ''
  state.user = {}
  state.negocios = []
  state.negocio={}
  // state.boolusuarios=false
  // state.boolrecepcion=false
  // state.boolseguimiento=false
  // state.user={unit:{}}
  // state.booldesignacion=false
  // state.boolmisrecepciones=false
  // state.ventadetalle=false
  // state.historialventadetalle=false
  // state.ventalocal=false
  // state.historialventalocal=false
  // state.empleados=false
  // state.reportes=false
  // state.gastos=false
  // state.historialprestamo=false
  // state.historialventa=false
  // state.anular=false
}
