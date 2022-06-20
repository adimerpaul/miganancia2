<template>
  <div>
    <q-header bordered class="text-black bg-white" style="border-bottom: 5px solid #009940">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="this.store.leftDrawerOpen = !this.store.leftDrawerOpen"/>
        <q-toolbar-title class="text-bold">
          Balance
        </q-toolbar-title>
        <q-btn-dropdown
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
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-avatar icon="local_atm" color="grey" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Venta libre</q-item-label>
                <q-item-label caption>Registra un ingreso sin seleccionar productos de tu inventario.</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn color="red-10" :label="$q.screen.lt.md?'':'Nuevo gasto'" class="q-ml-xs" icon="remove_circle_outline" no-caps/>
      </q-toolbar>
    </q-header>
    <q-page class="q-pa-xs">
      <div class="row">
        <div class="col-12 col-sm-2 q-pa-xs ">
          <q-btn label="Filtrar" no-caps outline class="full-width" icon-right="filter_list"/>
        </div>
        <div class="col-6 col-sm-2 q-pa-xs">
          <q-input type="date" label="Desde" v-model="fechas.desde" outlined dense/>
        </div>
        <div class="col-6 col-sm-2 q-pa-xs">
          <q-input type="date" label="Hasta" v-model="fechas.hasta" outlined dense/>
        </div>
        <div class="col-6 col-sm-4 q-pa-xs">
          <q-input placeholder="Buscar concepto..." v-model="buscar" outlined dense clearable hint="Recuerda ingresar al menos 3 caracteres para iniciar tu búsqueda." counter>
            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-sm-2 q-pa-xs ">
          <q-btn icon="download" flat outline label="Descargar reporte" no-caps class="full-width" />
        </div>
        <div class="col-12 col-sm-4 q-pa-xs">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="moving" color="green-1" text-color="green" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Utilidad total</q-item-label>
                <q-item-label class="text-h5 text-black">{{costototal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-12 col-sm-4 q-pa-xs">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="local_atm" color="green-1" text-color="green" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Ventas totales</q-item-label>
                <q-item-label class="text-h5 text-green">{{costototal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-12 col-sm-4 q-pa-xs">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="currency_exchange" color="red-1" text-color="red" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Gastos totales</q-item-label>
                <q-item-label class="text-h5 text-red">{{costototal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-12">
          <q-table dense :columns="colums" hide-bottom flat bordered>

          </q-table>
        </div>
      </div>
      <!--  <h1>Home</h1>-->
      <!--  <q-list :dense="$q.screen.lt.md">-->
      <!--    <q-item>-->
      <!--      <q-item-section>John Doe {{$q.screen.lt.md}}</q-item-section>-->
      <!--    </q-item>-->

      <!--    <q-item>-->
      <!--      <q-item-section>Jane Doe</q-item-section>-->
      <!--    </q-item>-->
      <!--  </q-list>-->
    </q-page>
  </div>
</template>

<script>
import {useCounterStore} from "stores/example-store"
import {date} from "quasar";
export default {
  name: `Home`,
  data(){
    return{
      store: useCounterStore(),
      colums:[
        {name:'Fecha',label:'Fecha',field:'Fecha'},
        {name:'Cliente/Proveedores',label:'Cliente/Proveedores',field:'Cliente/Proveedores'},
        {name:'Concepto',label:'Concepto',field:'Concepto'},
        {name:'Medio de pago',label:'Medio de pago',field:'Medio de pago'},
        {name:'Valor',label:'Valor',field:'Valor'},
        {name:'Acciones',label:'Acciones',field:'Acciones'},
      ],
      fechas:{desde:date.formatDate(new Date(),'YYYY-MM-DD'),hasta:date.formatDate(new Date(),'YYYY-MM-DD')},
      buscar:'',
    }
  },
  computed:{
    costototal(){
      return 0
    }
  }
}
</script>
<style scoped>

</style>

