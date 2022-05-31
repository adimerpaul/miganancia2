/*
export function someAction (context) {
}
*/
import {api} from '../../boot/axios'
export function login({commit}, user) {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    // axios({url: 'http://localhost:8000/axios/login', data: user, method: 'POST' })
    api.post(process.env.API+'login', user)
      .then(resp => {
        // console.log(resp.data)
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('tokenmi', token)
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        commit('auth_success', {token, user})
        commit('negocios_request', {token, user})
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('tokenmi')
        reject(err)
      })
  })
}
export function negocios({commit},user_id){
  return new Promise((resolve,reject)=>{
    api.get('negocio').then(res=>{
      // console.log(res.data.user.minegocio)
      commit('negocios_request',res.data)
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function categorias({commit},user_id){
  return new Promise((resolve,reject)=>{
    api.get('categoria').then(res=>{
      // console.log(res.data)
      commit('categorias_request',res.data)
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function productos({commit},user_id){
  return new Promise((resolve,reject)=>{
    api.get('producto').then(res=>{
      // console.log(res.data)
      commit('productos_request',res.data)
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}

export function updateUser({commit},data){
  return new Promise((resolve,reject)=>{
    api.put('user/'+data.id,data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function updateCategoria({commit},data){
  return new Promise((resolve,reject)=>{
    api.put('categoria/'+data.id,data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function createCategoria({commit},data){
  return new Promise((resolve,reject)=>{
    api.post('categoria',data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function updateProducto({commit},data){
  return new Promise((resolve,reject)=>{
    api.put('producto/'+data.id,data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function createProducto({commit},data){
  return new Promise((resolve,reject)=>{
    api.post('producto',data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function register({commit}, user) {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    // axios({url: 'http://localhost:8000/axios/login', data: user, method: 'POST' })
    api.post(process.env.API+'register', user)
      .then(resp => {
        // console.log(resp.data)
        // return false
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('tokenmi', token)
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        commit('auth_success', {token, user})
        commit('negocios_request', {token, user})
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('tokenmi')
        reject(err)
      })
  })
}

export function logout({commit}){
  return new Promise((resolve, reject) => {
    api.post(process.env.API+'logout').then(res=>{
      commit('salir')
      localStorage.removeItem('tokenmi')
      delete api.defaults.headers.common['Authorization']
      resolve()
    }).catch(err => {
      commit('auth_error')
      localStorage.removeItem('tokenmi')
      reject(err)
    })
  })
}
