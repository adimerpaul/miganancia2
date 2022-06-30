<template>
  <div>
    <q-header bordered class="text-black bg-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="this.store.leftDrawerOpen = !this.store.leftDrawerOpen"/>
        <q-toolbar-title class="text-bold">
          Mi Ganancia
        </q-toolbar-title>
<!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>
    <q-page class="">
      <div class="row">
        <div class="col-12 col-md-2"></div>
        <div class="col-12 col-md-8">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="login" label="Ingresar" class="full-width" />
              <q-tab name="registro" label="Registrarse" class="full-width"/>
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="login">
                <div class="text-h6">Ingresar al Sistema </div>
                <div class="text-subtitle2 text-grey">Por favor colocar email y contraseña </div>
                <q-form @submit.prevent="login">
                  <div class="row">
                    <!--                  <div class="col-12">-->
                    <!--                    <q-uploader-->
                    <!--                      @added  ="uploadFile"-->
                    <!--                      auto-upload-->
                    <!--                      max-files="1"-->
                    <!--                      url=""-->
                    <!--                    />-->
                    <!--                  </div>-->
                    <div class="col-12 ">
                      <q-input type="email" outlined v-model="email" label="Email*" hint="Porfavor ingresar email" :rules="rule">
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input outlined v-model="password" label="password*" :type="isPwd ? 'password' : 'text'" hint="Porfavor ingresar password" :rules="rule">
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 q-py-md">
                      <q-btn label="INGRESAR" color="primary" icon="login" class="full-width" type="submit"/>
                      <q-btn label="Registrate" color="secondary" icon="how_to_reg" @click="tab='registro'" class="full-width q-mt-xs" />
                      <div class="text-caption q-py-xs">
                        <a target="_blank" href="https://api.whatsapp.com/send?phone=59169603027&text=olvide mi contraseña">Olvidate tu contraseña?</a>
                      </div>

                    </div>
                  </div>
                </q-form>
              </q-tab-panel>
              <q-tab-panel name="registro">
                <div class="text-h6">Crear un nuevo negocio</div>
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
                <q-form @submit.prevent="registrar">
                  <div class="row">
                    <div class="col-12">
                      <!--                    color="purple-12"-->
                      <!--                    <q-input outlined type="email" v-model="user.email" label="Email*" hint="Porfavor ingresar email" :rules="rule" required>-->
                      <!--                      <template v-slot:prepend>-->
                      <!--                        <q-icon name="email" />-->
                      <!--                      </template>-->
                      <!--                    </q-input>-->
                      <q-select
                        dense
                        outlined
                        hint="Seleccionar una categoria"
                        v-model="user.tipos"
                        :options="optionstipo"
                        label="Tipo de negocio *"
                      >
                        <template v-slot:option="scope">
                          <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                              <q-icon :name="scope.opt.icon" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ scope.opt.label }}</q-item-label>
                              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="precision_manufacturing"/>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.nombre" label="Nombre del negocio*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required>
                        <template v-slot:prepend>
                          <q-icon name="factory" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.direccion" label="Dirección del negocio" hint="Porfavor ingresar direccion" >
                        <template v-slot:prepend>
                          <q-icon name="share_location" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.ciudad" label="Ciudad donde se ubica el negocio" hint="Porfavor ingresar ciudad" >
                        <template v-slot:prepend>
                          <q-icon name="location_city" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined type="email" v-model="user.email" label="Email*" hint="Porfavor ingresar email" :rules="rule" required>
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>
                    </div>

                    <!--                  <div class="col-12 ">-->
                    <!--                    <q-input dense outlined v-model="user.carnet" label="Carnet o NIT*" hint="Porfavor ingresar carnet o nit" :rules="rule">-->
                    <!--                      <template v-slot:prepend>-->
                    <!--                        <q-icon name="credit_card" />-->
                    <!--                      </template>-->
                    <!--                    </q-input>-->
                    <!--                  </div>-->
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.name" label="Nombre completo*" hint="Porfavor ingresar nombre completo" :rules="rule">
                        <template v-slot:prepend>
                          <q-icon name="people" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.password" label="password*" :type="isPwd ? 'password' : 'text'" hint="Porfavor ingresar contraseña" :rules="rule">
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 ">
                      <q-input dense outlined v-model="user.password_confirmation" label="Password confirmation*" :type="isPwd ? 'password' : 'text'" hint="Porfavor vuelva a escribir su contraseña" :rules="rule">
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </div>
                    <!--                  <div class="col-12 ">-->
                    <!--                    <q-select use-input @filter="filterFn" dense outlined v-model="user.unit" label="Unidad*" :optionstipo="units" option-label="nombre"  hint="Porfavor ingresar unidad"  >-->
                    <!--                      <template v-slot:prepend>-->
                    <!--                        <q-icon name="home" />-->
                    <!--                      </template>-->
                    <!--                    </q-select>-->
                    <!--                  </div>-->
                    <!--                  <div class="col-12">-->
                    <!--                    <q-input dense outlined v-model="user.direccion" label="Direccion*" hint="Direccion de donde vives" :rules="rule">-->
                    <!--                      <template v-slot:prepend>-->
                    <!--                        <q-icon name="home" />-->
                    <!--                      </template>-->
                    <!--                    </q-input>-->
                    <!--                  </div>-->
                    <div class="col-12 text-center flex flex-center">
                      <q-uploader
                        accept=".jpg, .png"
                        @added="uploadFile"
                        auto-upload
                        max-files="1"
                        label="Ingresar el logo de su empresa"
                        flat
                        bordered
                      />
                    </div>
                    <div class="col-12">
                      <div class="text-caption text-grey">Te recomendamos que la imagen tenga un tamaño de 500 x 500 px en formato PNG y pese máximo 2MB.</div>
                    </div>
                    <div class="col-12 q-py-md">

                      <q-btn label="Crea tu cuenta" color="primary" icon="login" class="full-width" type="submit"/>
                      <q-btn label="Ingresa" color="secondary" icon="how_to_reg" @click="tab='login'" class="full-width q-mt-xs" />
                      <div class="text-caption q-py-xs">
                        <a target="_blank" href="https://api.whatsapp.com/send?phone=59169603027&text=olvide mi contraseña gamo">Olvidate tu contraseña?</a>
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <div class="col-12 col-md-2">
        </div>
      </div>
    </q-page>
  </div>
</template>
<script>
import {useCounterStore} from "stores/example-store";

export default {
  name:`Login`,
  data(){
    return{
      tab:'login',
      store:useCounterStore(),
      user:{},
      email:'',
      password:'',
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      optionstipo: [
        {
          label: 'Supermercado o tienda de conveniencia',
          value: 'Supermercado o tienda de conveniencia',
          description: 'Establecimiento comercial que venden una variedad de artículos cotidianos',
          icon: 'shopping_cart'
        },
        {
          label: 'Industria o manufactura',
          value: 'Industria o manufactura',
          description: 'Tiendas de conveniencia a los establecimientos comerciales que venden una variedad de artículos',
          icon: 'factory'
        },
        {
          label: 'Servicios de transporte y logística',
          value: 'Servicios de transporte y logística',
          description: 'Movilizar la mercancía a lo largo de la cadena de suministro',
          icon: 'polymer'
        },
      ],
      isPwd:true,
    }
  },
  created() {
    if (this.store.isLoggedIn){
      this.$router.push('/home')
    }
  },
  methods: {
    // toggleLeftDrawer(){
    //   this.store.leftDrawerOpen = !this.store.leftDrawerOpen
    // },
    // miscategorias(){
    //   this.$store.dispatch('login/categorias').then((res) =>{
    //     this.$q.loading.hide()
    //   }).catch(err => {
    //     this.$q.loading.hide();
    //     this.$q.notify({
    //       message:err.response.data.message,
    //       color:'red',
    //       icon:'error'
    //     })
    //   })
    // },
    // misnegocios(){
    //   this.$store.dispatch('login/negocios').then((res) =>{
    //     this.$q.loading.hide()
    //   })
    //   //   .catch(err => {
    //   //   this.$q.loading.hide();
    //   //   this.$q.notify({
    //   //     message:err.response.data.message,
    //   //     color:'red',
    //   //     icon:'error'
    //   //   })
    //   // })
    // },
    // misproductos(){
    //   this.$store.dispatch('login/productos').then((res) =>{
    //     this.$q.loading.hide()
    //   }).catch(err => {
    //     this.$q.loading.hide();
    //     this.$q.notify({
    //       message:err.response.data.message,
    //       color:'red',
    //       icon:'error'
    //     })
    //   })
    // },

    // login () {
    //   this.$q.loading.show()
    //   this.$store.dispatch('login/login', { email:this.email, password:this.password }).then(() =>{
    //     this.$q.loading.hide()
    //     this.miscategorias()
    //     this.misproductos()
    //     // this.misnegocios()
    //     this.$router.push('/home')
    //   }).catch(err => {
    //     this.$q.loading.hide();
    //     // console.log(err.response.data.res)
    //     this.$q.notify({
    //       message:err.response.data.res,
    //       color:'red',
    //       icon:'error'
    //     })
    //   })
    // },
    login(){
        this.$q.loading.show()
        this.$api.post('login', { email:this.email, password:this.password }).then((res) =>{
          console.log(res.data)
          console.log(res.data.perfil)
          this.$q.loading.hide()
          this.store.user=res.data.user
          this.store.perfil=[]
            //res.data.user.permisos.forEach(r => {
             // this.store.permisos.push(r.id);

            //});

          this.store.negocio=res.data.negocio
          localStorage.setItem('tokenmi', res.data.token)
          this.store.isLoggedIn=true
          this.$api.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
          this.$router.push('/home')
        }).catch(err => {
          this.$q.loading.hide();
          this.$q.notify({
            message:err.response.data.res,
            color:'red',
            icon:'error'
          })
        })
    },
    uploadFile (file) {
      let dialog = this.$q.dialog({
        message: 'Subiendo... 0%',
      })
      let percentage = 0
      const fd = new FormData()
      fd.append('file', file[0])
      return new Promise((resolve, reject) => {
        this.$api.post('upload',
          fd,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
              dialog.update({
                message: `Subiendo... ${percentage}%`
              })
              if (percentage>=100){
                dialog.hide()
              }
            }
          })
          .then(res => {
            this.foto=res.data
            resolve(file)
          })
          .catch(err => reject(err))
      })
    },
    registrar(){
      // console.log(this.user.unit_id)
      if (this.user.tipos=='' || this.user.tipos==undefined){
        this.$q.notify({
          message:'Debes seleccionar tipo de negocio',
          color:'red',
          icon:'error'
        })
        return false
      }
      this.$q.loading.show()
      // this.user.unit_id=this.user.unit.id
      this.user.foto=this.foto
      this.user.tipo=this.user.tipos.label
      this.$api.post('/register',this.user).then(res=>{
        this.$q.loading.hide()
        this.store.user=res.data.user
        this.store.negocio=res.data.negocio
        localStorage.setItem('tokenmi', res.data.token)
        this.store.isLoggedIn=true
        this.$api.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
        this.$router.push('/home')
      }).catch(err => {
        this.$q.loading.hide()
        // console.log(err.response.data.errors)
        this.$q.notify({
          message: err.response.data.message,
          color: 'red',
          icon: 'error'
        })
      })
      // this.$store.dispatch('login/register', this.user).then((res) =>{
      //   // console.log(res.data)
      //   // return false
      //   this.miscategorias()
      //   this.misproductos()
      //   // this.misnegocios()
      //   this.$q.loading.hide()
      //   this.$router.push('/home')
      // }).catch(err => {
      //   this.$q.loading.hide();
      //   // console.log(err.response.data.errors)
      //   this.$q.notify({
      //     message:err.response.data.message,
      //     color:'red',
      //     icon:'error'
      //   })
        // let text=''
        // Object.entries(err.response.data.errors).forEach(([key, value]) => {
        //   // console.log(`${key} ${value}`);
        //   text+=' '+`${key}: ${value},`
        // });
        // this.$q.notify({
        //   message:text,
        //   color:'red',
        //   icon:'error'
        // })
      // })
    },
  }

}
</script>
