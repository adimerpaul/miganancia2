<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="store.leftDrawerOpen" show-if-above bordered>
      <q-list  class="full-width">
        <q-item >
          <q-img src="/logo.png" spinner-color="white" style="height: 28px; max-width: 30px" />
          <q-item-section class="text-center text-bold">Mi Ganancia.com</q-item-section>
        </q-item>
        <q-item v-if="store.isLoggedIn">
          <q-item-section>
            <div > <b>Bienvenido: </b> {{store.user.name}}
              <!--              <pre>{{store.user}}</pre>-->
              <!--              <pre>{{store.isLoggedIn}}</pre>-->
            </div>
          </q-item-section>
        </q-item>
        <q-item class="q-pt-none">
          <q-item-section>
            <q-card class="q-pa-none bg-grey-3" v-if="store.isLoggedIn">
              <q-card-section horizontal>
                <q-card-section class="q-pa-none q-ma-none flex flex-center">
                  <q-img v-if="store.negocio!={}&&store.negocio.foto!=undefined" :src="url+'../imagenes/'+store.negocio.foto" class="q-ma-xs" style="border:0px solid black;height: 50px;width: 50px;border-radius: 25px"/>
                </q-card-section>
                <q-card-section class="q-pa-none q-ma-none flex flex-center">
                  <q-card-section class="q-pa-none q-ma-none" horizontal>
                    <q-card-section class="q-pa-none q-ma-none">
                      <q-item-label>{{store.negocio.nombre}}</q-item-label>
                      <q-item-label caption>{{store.negocio.tipo}}</q-item-label>
                    </q-card-section>
                    <q-card-section @click="clickCambioEmpresa" class="q-pa-none q-ma-none flex flex-center">
                      <q-icon name="o_arrow_drop_down_circle" size="30px" />
                    </q-card-section>
                  </q-card-section>
                </q-card-section>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-xs">
                <div class="flex flex-center" @click="clickUpdateNegocio"> <q-icon name="edit" class="q-pr-xs" /> <div class="text-bold"> Editar negocio</div></div>
                <div class="flex flex-center" @click="clickCreateNegocio"> <q-icon name="add_circle" class="q-pr-xs" />  <div class="text-bold"> Agregar otro negocio</div></div>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
        <q-item active-class="active" style="font-weight: bold" exact to="home" clickable v-if="store.isLoggedIn">
          <q-item-section avatar>
            <q-icon name="balance" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Balance</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="active" style="font-weight: bold" exact to="inventario" clickable v-if="store.isLoggedIn">
          <q-item-section avatar>
            <!--              <q-icon name="inventory" />-->
            <q-icon name="o_inventory" />
            <!--              <q-icon name="r_inventory" />-->
            <!--              <q-icon name="s_inventory" />-->
          </q-item-section>
          <q-item-section>
            <q-item-label>Inventario</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="active" style="font-weight: bold" exact to="deudas" clickable v-if="store.isLoggedIn">
          <q-item-section avatar>
            <q-icon name="pending_actions" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Deudas</q-item-label>
          </q-item-section>
        </q-item>
        <div style="position: absolute;bottom: 0px" class="full-width">
          <q-list  >
            <q-item class="full-width text-grey" clickable v-if="store.isLoggedIn">
              <q-item-section avatar>
                <q-icon name="help_outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>¿Necesitas contactar a soporte? ¡Hazlo aquí!</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="full-width text-grey" clickable v-if="store.isLoggedIn">
              <q-item-section avatar>
                <q-icon name="subject" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Términos y condiciones y Política de privacidad</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="full-width text-red" clickable @click="logout" v-if="store.isLoggedIn">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cerrar sesión</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="dialogcambioempresa">
      <q-card>
        <q-card-section class="text-center text-bold q-ma-none q-pa-none">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-bold">Cambio negocio</div>
            <q-space />
            <q-btn icon="cancel" flat round dense v-close-popup />
          </q-card-section>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-list>
            <q-item class="q-pa-none bg-grey-3"  v-for="n in negocios " :key="n.id" clickable @click="cambionegocio(n)">
              <q-item-section avatar>
                <q-card-section >
                  <q-img :src="url+'../imagenes/'+n.foto" class="q-pa-lg" style="border:0px solid black;height: 50px; max-width: 50px;border-radius: 25px"/>
                </q-card-section>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-card-section>
                    <q-card-section class="q-pa-none q-ma-none flex justify-between" horizontal>
                      <q-card-section class="q-pa-none q-ma-none">
                        <q-item-label>{{n.nombre}}</q-item-label>
                        <q-item-label caption>{{n.tipo}}</q-item-label>
                      </q-card-section>
                      <q-card-section class="q-pa-none q-ma-none flex flex-center">
                        <q-icon v-if="n.id==store.negocio.id" name="check_circle" size="xs" color="positive" />
                      </q-card-section>
                    </q-card-section>
                  </q-card-section>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialognegocio" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar negocio</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="updateNegocio">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12">
                <q-select
                  dense
                  outlined
                  hint="Seleccionar una categoría"
                  v-model="negocio.tipos"
                  :options="options"
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
                <q-input dense outlined v-model="negocio.nombre" label="Nombre del negocio*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required>
                  <template v-slot:prepend>
                    <q-icon name="factory" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="negocio.direccion" label="Dirección del negocio" hint="Porfavor ingresar direccion" >
                  <template v-slot:prepend>
                    <q-icon name="share_location" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="negocio.ciudad" label="Ciudad donde se ubica el negocio" hint="Porfavor ingresar ciudad" >
                  <template v-slot:prepend>
                    <q-icon name="location_city" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 text-center flex flex-center">
                <q-uploader
                  accept=".jpg, .png"
                  @added="uploadFile"
                  auto-upload
                  max-files="1"
                  label="Ingresar el logo de su empresa"
                  flat
                  max-file-size="2000000"
                  @rejected="onRejected"
                  bordered
                />
              </div>
              <div class="col-12">
                <div class="text-caption text-grey">Te recomendamos que la imagen tenga un tamaño de 500 x 500 px en formato PNG y pese máximo 2MB.</div>
              </div>
              <div class="col-12 q-py-md">

                <q-btn label="Guardar cambios" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogcreatenegocio" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Crear un nuevo negocio</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="createNegocio">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12">
                <q-select
                  dense
                  outlined
                  hint="Seleccionar una categoría"
                  v-model="negocio.tipos"
                  :options="options"
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
                <q-input dense outlined v-model="negocio.nombre" label="Nombre del negocio*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required>
                  <template v-slot:prepend>
                    <q-icon name="factory" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="negocio.direccion" label="Dirección del negocio" hint="Porfavor ingresar direccion" >
                  <template v-slot:prepend>
                    <q-icon name="share_location" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="negocio.ciudad" label="Ciudad donde se ubica el negocio" hint="Porfavor ingresar ciudad" >
                  <template v-slot:prepend>
                    <q-icon name="location_city" />
                  </template>
                </q-input>
              </div>

              <div class="col-12 text-center flex flex-center">
                <q-uploader
                  accept=".jpg, .png"
                  @added="uploadFile"
                  auto-upload
                  max-files="1"
                  label="Ingresar el logo de su empresa"
                  flat
                  max-file-size="2000000"
                  @rejected="onRejected"
                  bordered
                />
              </div>
              <div class="col-12">
                <div class="text-caption text-grey">Te recomendamos que la imagen tenga un tamaño de 500 x 500 px en formato PNG y pese máximo 2MB.</div>
              </div>
              <div class="col-12 q-py-md">
                <q-btn label="Crear negocio" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import {useCounterStore} from "stores/example-store";
export default {
  name: 'MainLayout',
  data(){
    return{
      store:useCounterStore(),
      url:process.env.API,
      negocios:[],
      dialogcambioempresa:false,
      dialognegocio:false,
      dialogcreatenegocio:false,
      options: [
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
      negocio:{},
      foto:'',
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      ruleNumber: [
        val => (val !== null && val !== '') || 'Por favor escriba su cantidad',
        val => (val >= 0 && val < 10000) || 'Por favor escriba una cantidad real'
      ],
    }
  },
  methods:{
    cambionegocio(n){
      this.store.negocio=n
      this.dialogcambioempresa=false
      this.$api.put('user/'+this.store.user.id,{minegocio:n.id})
      this.$router.push('/home')
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
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} el archivo paso las restricciones de validación`
      })
    },
    updateNegocio(){
      this.$q.loading.show()
      if (this.foto==''||this.foto==null||this.foto=="default.png"){
        this.negocio.foto=this.negocio.foto
      }else{
        this.negocio.foto=this.foto
      }
      this.negocio.tipo=this.negocio.tipos.label
      this.$api.put('negocio/'+this.negocio.id,this.negocio).then(res=>{
        // console.log(res.data)
        this.store.negocio=res.data
        this.$q.loading.hide()
        this.dialognegocio=false
        this.$q.notify({
          message:'Editado correctamente',
          color:'green',
          icon:'check'
        })
      })
      //   .catch(err=>{
      //   this.$q.loading.hide()
      //   this.$q.notify({
      //     message:err.response.data.message,
      //     color:'red',
      //     icon:'error'
      //   })
      // })
    },
    clickUpdateNegocio(){
      this.foto=''
      this.negocio = {
        id:this.store.negocio.id,
        nombre:this.store.negocio.nombre,
        foto:this.store.negocio.foto,
        direccion:this.store.negocio.direccion,
        ciudad:this.store.negocio.ciudad,
      };
      let ne = this.options.find(r => r.label === this.store.negocio.tipo)
      this.negocio.tipos = ne
      this.dialognegocio = true
    },
    createNegocio(){
      if (this.foto==''||this.foto==null||this.foto=="default.png"){
        this.negocio.foto=this.negocio.foto
      }else{
        this.negocio.foto=this.foto
      }
      if (this.negocio.tipos=='' || this.negocio.tipos==undefined){
        this.$q.notify({
          message:'Debes seleccionar tipo de negocio',
          color:'red',
          icon:'error'
        })
        return false
      }
      this.$q.loading.show()
      this.negocio.tipo=this.negocio.tipos.label
      this.negocio.user_id=this.store.user.id
      this.$api.post('negocio',this.negocio).then(res=>{
        this.store.negocio=res.data
        this.$q.loading.hide()
        this.dialogcreatenegocio=false
        this.$q.notify({
          message:'Creado correctamente',
          color:'green',
          icon:'check'
        })
      }).catch(err=>{
        this.$q.loading.hide()
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    clickCreateNegocio(){
      this.foto=''
      this.negocio = {
        nombre:'',
        foto:'default.png',
        direccion:'',
        ciudad:'',
      };
      this.dialogcreatenegocio = true
    },
    clickCambioEmpresa(){
      this.$q.loading.show()
      this.$api.get('negocio/'+this.store.user.id).then(res=>{
        this.negocios=res.data
        this.dialogcambioempresa=true
        this.$q.loading.hide()
      })
    },
    logout(){
      this.$q.dialog({
        message:'¿Quieres cerrar sesión?',
        title:"Salir",
        ok:{
          push:true
        },
        cancel:{
          push:true,
          color:'negative'
        }
      }).onOk(()=>{
        this.$q.loading.show()
        this.$api.post('logout').then(res=>{
          this.$api.defaults.headers.common['Authorization']=''
          this.store.user={}
          this.store.negocio={}
          localStorage.removeItem('tokenmi')
          this.store.isLoggedIn=false
          this.$router.push('/')
          this.$q.loading.hide()
        })
      })
    }
  }
  // components: {
  //   EssentialLink
  // },
  // setup () {
  //   const leftDrawerOpen = ref(false)
  //
  //   return {
  //     essentialLinks: linksList,
  //     leftDrawerOpen,
  //     toggleLeftDrawer () {
  //       leftDrawerOpen.value = !leftDrawerOpen.value
  //     }
  //   }
  // }
}
</script>
