<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="text-black bg-white" :style="title=='Balance'?'border-bottom: 5px solid #009940':''">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-bold">
          <!--          Mi Ganancia.com-->
          {{title}}
        </q-toolbar-title>
        <!--                      <q-icon name="add_circle" />-->
        <!--        <q-icon name="o_add_circle" />-->
        <!--                      <q-icon name="r_add_circle" />-->
        <!--                      <q-icon name="s_add_circle" />-->
        <q-btn-dropdown
          v-if="title=='Balance'"
          split1
          color="green"
          push1
          glossy1
          no-caps
          icon="add_circle_outline"
          :label="$q.screen.lt.md?'':'Nueva venta'"
        >
          <q-list>
            <q-item clickable v-close-popup to="venta">
              <q-item-section avatar>
                <q-avatar icon="o_shopping_basket" color="grey" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Venta de productos</q-item-label>
                <q-item-label caption>Registra una venta seleccionando los productos de tu inventario.</q-item-label>
              </q-item-section>
              <!--              <q-item-section side>-->
              <!--                <q-icon name="info" color="amber" />-->
              <!--              </q-item-section>-->
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-avatar icon="local_atm" color="grey" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Venta libre</q-item-label>
                <q-item-label caption>Registra un ingreso sin seleccionar productos de tu inventario.</q-item-label>
              </q-item-section>
              <!--              <q-item-section side>-->
              <!--                <q-icon name="info" color="amber" />-->
              <!--              </q-item-section>-->
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn v-if="title=='Balance'" color="red-10" :label="$q.screen.lt.md?'':'Nuevo gasto'" class="q-ml-xs" icon="remove_circle_outline" no-caps/>
        <q-btn v-if="title=='Inventario'"  outline :label="$q.screen.lt.md?'Catego':'Crear categoría'" no-caps @click="clickCreateCategoria"/>
        <q-btn-dropdown
          v-if="title=='Inventario'"
          class="q-ml-xs"
          split1
          color="warning"
          push1
          glossy1
          no-caps
          :label="$q.screen.lt.md?'Product':'Agregar productos'"
        >
          <q-list>
            <q-item clickable v-close-popup @click="clickCreateProducto">
              <q-item-section avatar>
                <q-avatar icon="o_sell"  text-color="grey" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Agregar productos manualmente</q-item-label>
                <!--                <q-item-label caption>Registra una venta seleccionando los productos de tu inventario.</q-item-label>-->
              </q-item-section>
              <!--              <q-item-section side>-->
              <!--                <q-icon name="info" color="amber" />-->
              <!--              </q-item-section>-->
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-avatar icon="local_atm"  text-color="green" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Subir productos desde Excel</q-item-label>
                <!--                <q-item-label caption>Registra un ingreso sin seleccionar productos de tu inventario.</q-item-label>-->
              </q-item-section>
              <!--              <q-item-section side>-->
              <!--                <q-icon name="info" color="amber" />-->
              <!--              </q-item-section>-->
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list  class="full-width">
        <q-item >
          <q-img src="/logo.png" spinner-color="white" style="height: 28px; max-width: 30px" />
          <q-item-section class="text-center text-bold">Mi Ganancia.com</q-item-section>
        </q-item>
        <q-item class="">
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
                <q-card-section >
<!--                  <pre>{{store.negocio.foto}}</pre>-->
                  <q-img v-if="store.negocio.foto!=undefined" :src="url+'../imagenes/'+store.negocio.foto" class="q-pa-lg" style="border:0px solid black;height: 50px; max-width: 50px;border-radius: 25px"/>
                </q-card-section>
                <q-card-section>
                  <q-card-section class="q-pa-none q-ma-none" horizontal>
                    <q-card-section class="q-pa-none q-ma-none">
                      <q-item-label>{{store.negocio.nombre}}</q-item-label>
                      <q-item-label caption>{{store.negocio.tipo}}</q-item-label>
                    </q-card-section>
                    <q-card-section @click="dialogcambioempresa=true" class="q-pa-none q-ma-none flex flex-center">
                      <q-icon name="o_arrow_drop_down_circle" size="lg" />
                    </q-card-section>
                  </q-card-section>
                </q-card-section>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-xs">
<!--                <div class="flex flex-center" @click="clickUpdateNegocio($store.getters['login/negocio'])"> <q-icon name="edit" class="q-pr-xs" /> <div class="text-bold"> Editar negocio</div></div>-->
<!--                <div class="flex flex-center" @click="clickCreateNegocio($store.getters['login/negocio'])"> <q-icon name="add_circle" class="q-pr-xs" />  <div class="text-bold"> Agregar otro negocio</div></div>-->
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
<!--        <q-item active-class="active" style="font-weight: bold" exact to="home" clickable v-if="$store.getters['login/isLoggedIn']">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="balance" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Balance</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item active-class="active" style="font-weight: bold" exact to="inventario" clickable v-if="$store.getters['login/isLoggedIn']">-->
<!--          <q-item-section avatar>-->
<!--            &lt;!&ndash;              <q-icon name="inventory" />&ndash;&gt;-->
<!--            <q-icon name="o_inventory" />-->
<!--            &lt;!&ndash;              <q-icon name="r_inventory" />&ndash;&gt;-->
<!--            &lt;!&ndash;              <q-icon name="s_inventory" />&ndash;&gt;-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Inventario</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item active-class="active" style="font-weight: bold" exact to="deudas" clickable v-if="$store.getters['login/isLoggedIn']">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="pending_actions" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Deudas</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
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
  </q-layout>
</template>

<script>
// import { defineComponent, ref } from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
//
// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]
import {useCounterStore} from 'stores/login'
export default {
  name: 'MainLayout',
  // components: {
  //   EssentialLink
  // },
  //
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
  data(){
    return{
      dialogcambioempresa:false,
      url:process.env.API,
      store:useCounterStore(),
      leftDrawerOpen:false,
    }
  },
  methods:{
    toggleLeftDrawer(){
      this.leftDrawerOpen=!this.leftDrawerOpen
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
          // console.log(res.data)
          this.store.user={}
          this.store.negocio={}
          this.store.negocios={}
          // localStorage.setItem('tokenmi', res.data.token)
          localStorage.removeItem('tokenmi')
          this.store.isLoggedIn=false
          this.$router.push('/')
          // console.log(this.store.user)
          this.$q.loading.hide()
        })
        // this.$store.dispatch('login/logout')
        //   .then(() => {
        //     this.$q.loading.hide()
        //     this.$router.push('/')
        //   })
      })
    },
  },
  computed:{
    title(){
      if (this.$route.fullPath=='/home') return "Balance"
      else if (this.$route.fullPath=='/inventario') return "Inventario"
      else if (this.$route.fullPath=='/deudas') return "Deudas"
      else if (this.$route.fullPath=='/venta') return "Nueva venta"
      else if (this.$route.fullPath=='/') return "Mi Ganancia.com"
      return "";
    },
  }
}
</script>
