<template>
  <div>
    <q-header bordered class="text-black bg-white" style="border-bottom: 5px solid #009940">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="this.store.leftDrawerOpen = !this.store.leftDrawerOpen"/>
        <q-toolbar-title class="text-bold">
          Personal
        </q-toolbar-title>
        <q-btn color="green" @click="clickProfile" :label="$q.screen.lt.md?'':'Nuevo Perfil'" class="q-ml-xs" icon="add_circle_outline" no-caps/>
        <q-btn color="cyan" @click="clickUsuario" :label="$q.screen.lt.md?'':'Nuevo Usuario'" class="q-ml-xs" icon="add_circle_outline" no-caps/>
      </q-toolbar>
    </q-header>
    <q-page class="q-pa-xs">
      <div class="row">


        <div class="col-12">
          <q-table dense :columns="colums" :rows="sales" hide-bottom flat bordered :rows-per-page-options="[0]">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="Acciones" auto-width :props="props">
                  <q-avatar square  icon="local_atm" :color="props.row.tipo!='VENTA'?'red-1':'green-1'" :text-color="props.row.tipo!='VENTA'?'red':'green'" />
                  <q-icon name="o_delete" color="red" size="20px">
                    <q-tooltip>
                      Eliminar
                    </q-tooltip>
                  </q-icon>
                  <q-icon name="o_edit" color="grey" size="20px">
                    <q-tooltip>
                      Editar
                    </q-tooltip>
                  </q-icon>
                </q-td>


              </q-tr>
            </template>
          </q-table>
        </div>
      </div>

      <q-dialog v-model="dialogProfile" position="right" full-height :maximized="true">
        <q-card style="width: 450px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none"  style="border-bottom: 5px solid #F44336">
            <div class="text-h6">
              <q-avatar square  icon="local_atm" color="red-1" text-color="red" />
              Nuevo Perfil
            </div>
            <q-space />
            <q-btn icon="cancel" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center no-wrap">

            <q-form @submit.prevent="createperfil">
              <div class="row">
                <div class="col-12">
                  <div class="text-caption text-bold">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
                </div>
                <div class="col-12">
                  <q-input dense outlined type="text" v-model="profile.nombre" label="Nombre Perfil*" hint="Porfavor ingresar Nombre" :rules="rule" required>
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">Permisos <span class="text-red"></span></div>
                        <ul v-for="val in permisos" :key="val" style="list-style: none;">
                            <li><q-checkbox dense v-model="lpermisos" :val="val.id" />
                             {{val.nombre}}</li>
                            <ul v-for="sub in val.permisos " :key="sub" style="list-style: none;">
                                <li><q-checkbox dense v-model="lpermisos" :val="sub.id" /> {{sub.nombre}}</li>
                                <ul v-for="listsub in sub.permisos" :key="listsub" style="list-style: none;">
                                    <li><q-checkbox dense v-model="lpermisos" :val="listsub.id" />  {{listsub.nombre}}</li>
                                </ul>
                                

                            </ul>
                        </ul>
                        <pre>{{lpermisos}}</pre>
                </div>

                <div class="col-12 q-py-md">
                  <q-btn label="Crear Perfil" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
                </div>
              </div>
            </q-form>

          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="dialogUser" position="right" full-height :maximized="true">
        <q-card style="width: 450px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Nuevo Personal</div>
            <q-space />
            <q-btn icon="cancel" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center no-wrap">
            <q-form @submit.prevent="createUser">
              <div class="row">
                <div class="col-12">
                  <div class="text-caption text-bold">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">Nombre completo <span class="text-red">*</span></div>
                  <q-input dense outlined v-model="usuario.nombre" label="Nombre Completo*" hint="Porfavor ingresar nombre " :rules="rule" required clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="person_outline" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 ">
                      <q-input dense outlined type="email" v-model="usuario.email" label="Email*" hint="Porfavor ingresar email" :rules="rule" required>
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>
                    </div>
                                    <div class="col-12 ">
                      <q-input dense outlined v-model="usuario.password" label="password*" :type="isPwd ? 'password' : 'text'" hint="Porfavor ingresar contraseña" :rules="rule">
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
                      <q-input dense outlined v-model="usuario.password_confirmation" label="Password confirmation*" :type="isPwd ? 'password' : 'text'" hint="Porfavor vuelva a escribir su contraseña" :rules="rule">
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
                      <q-select
                        dense
                        outlined
                        hint="Seleccionar una Perfil"
                        v-model="usuario.perfil"
                        :options="profiles"
                        label="Perfil de usuario *"
                      >
                        <template v-slot:option="scope">
                          <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                              <q-icon :name="scope.opt.icon" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ scope.opt.label }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="manage_accounts"/>
                        </template>
                      </q-select>
                      </div>
                <div class="col-12">
                  <div class="text-caption">Fecha Limite (<span class="text-red">*</span>) </div>
                  <q-input dense outlined v-model="usuario.fechalimite" type="date" label="Fecha limite" clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 q-py-md">
                  <q-btn label="Crear Usuario" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import {useCounterStore} from "stores/example-store"
import {date} from "quasar";
import moment from 'moment'
moment.locale('es')
export default {
  name: `Home`,
  data(){
    return{
      isPwd:true,
      dialogProfile:false,
      lpermisos:[],
      dialogUser:false,
      dialogProvider:false,
      store: useCounterStore(),
      colums:[
        {name:'Acciones',label:'Acciones',field:'Acciones',align:'center'},
        {name:'name',label:'Personal',field:'name',align:'left'},
        {name:'fechalimite',label:'fechalimite',field:'fechalimite',align:'left'},
        {name:'email',label:'email',field:'email',align:'left'},
      ],
      fechas:{desde:date.formatDate(new Date(),'YYYY-MM-DD'),hasta:date.formatDate(new Date(),'YYYY-MM-DD')},
      buscar:'',
      sale:{},
      sales:[],
      perfil:{},
      profile:{},
      profiles:[],
      permisos:[],
      usuario:{fechalimite:date.formatDate(new Date(),'YYYY-MM-DD')},
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      ruleNumber: [
        val => (val !== null && val !== '') || 'Por favor escriba su cantidad',
        val => (val >= 0 && val < 100000) || 'Por favor escriba una cantidad real'
      ],
    }
  },
  created() {
      this.listperfil();
  },
  methods:{
    createUser(){
      this.usuario.negocio_id=this.store.negocio.id
      if(this.usuario.perfil==undefined || this.usuario.perfil=='')
      {
                this.$q.notify({
          message: 'Seleccione Perfil',
          color: 'red',
          icon: 'error'
        })
        return false
      }
      console.log(this.usuario)
    //  return false
      this.$api.post('user',this.usuario).then(res=>{
        console.log(res.data)
        this.dialogUser=false
        this.usuario={}
        this.usuario.perfil=''
      }).catch(err => {
        this.$q.loading.hide()
        // console.log(err.response.data.errors)
        this.$q.notify({
          message: err.response.data.message,
          color: 'red',
          icon: 'error'
        })
      })

    },
    listperfil(){
      this.profiles=[]
        console.log(this.store.negocio.tipo)
      this.$api.post('listaperfil',{negocio_id:this.store.user.minegocio}).then(res=>{
        console.log(res.data)
        res.data.forEach(r => {
            r.label=r.nombre
            this.profiles.push(r);

        });
      })

    },
    listapermisos(){
      this.$api.get('permiso').then(res=>{
        console.log(res.data)
        this.permisos=res.data
        //res.data.forEach(r => {
        //    this.permisos.push({id:r.id,nombre:r.nombre,estado:false,permisos:r.permisos.forEach(p => {
                //[{id:r.id,nombre:r.nombre,estado:false]
        //    })})
        //});
      })

    },
    createperfil(){
        this.profile.permisos=this.lpermisos
        this.profile.negocio_id=this.store.user.minegocio
        console.log(this.profile)
        this.$api.post('profile',this.profile).then(res=>{
            console.log('reg pro')
            this.profile={}
            this.dialogProfile=false
            this.listperfil();
      })

    },
    formatoFecha(f,h){
      return moment(f).format('LL')+'|'+h.toString().substring(0,5)
    },


    clickProfile(){
      this.dialogProfile=true
      this.permisos=[]
      this.usuario.perfil=''
      this.listapermisos()

      this.profile={}
    },

        clickUsuario(){
          var d = new Date();
          d.setDate(d.getDate() + 90);

      this.dialogUser=true
      this.usuario={fechalimite:date.formatDate(d,'YYYY-MM-DD')}
    },



  },
  computed:{
 
  }
}
</script>
<style scoped>

</style>

