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
<!--              <q-item-section>-->
<!--                <q-item-label>Venta libre</q-item-label>-->
<!--                <q-item-label caption>Registra un ingreso sin seleccionar productos de tu inventario.</q-item-label>-->
<!--              </q-item-section>-->
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn color="red-10" @click="clickSale" :label="$q.screen.lt.md?'':'Nuevo gasto'" class="q-ml-xs" icon="remove_circle_outline" no-caps/>
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
        <div class="col-6 col-sm-3 q-pa-xs">
          <q-input placeholder="Buscar concepto..." v-model="buscar" outlined dense clearable>
            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-sm-3 q-pa-xs ">
          <q-btn icon="download" flat outline label="Descargar reporte" no-caps class="full-width" />
        </div>
        <div class="col-6 col-sm-4 q-pa-none">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="moving" color="green-1" text-color="green" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Utilidad total</q-item-label>
                <q-item-label class="text-h5 text-black">{{utilidadTotal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-6 col-sm-4 q-pa-none">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="local_atm" color="green-1" text-color="green" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Ventas totales</q-item-label>
                <q-item-label class="text-h5 text-green">{{ventasTotal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-6 col-sm-4 q-pa-none">
          <q-card bordered flat>
            <q-item >
              <q-item-section avatar >
                <q-avatar square  icon="currency_exchange" color="red-1" text-color="red" size="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-grey">Gastos totales</q-item-label>
                <q-item-label class="text-h5 text-red">{{gastoTotal}} Bs</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class="col-12">
          <q-table dense :columns="colums" :rows="sales" hide-bottom flat bordered :rows-per-page-options="[0]">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="Acciones" auto-width :props="props">
                  <q-avatar square  icon="local_atm" :color="props.row.tipo=='VENTA'?'red-1':'green-1'" :text-color="props.row.tipo=='VENTA'?'red':'green'" />
                  <q-icon name="o_delete" color="red" size="20px">
                    <q-tooltip>
                      Eliminar
                    </q-tooltip>
                  </q-icon>
                  <q-icon name="description" color="grey" size="20px">
                    <q-tooltip>
                      Descargar comprobante
                    </q-tooltip>
                  </q-icon>
                  <q-icon name="o_edit" color="grey" size="20px">
                    <q-tooltip>
                      Editar
                    </q-tooltip>
                  </q-icon>
                </q-td>
                <q-td key="Fecha" :props="props">
                  {{ formatoFecha(props.row.fecha,props.row.hora) }}
                </q-td>
                <td key="Cliente/Proveedores" :props="props">
                  <div v-if="props.row.cliente!=null">
                    {{props.row.cliente.nombre}}
                  </div>
                  <div v-else-if="props.row.provider!=null">
                    {{props.row.provider.nombre}}
                  </div>
                  <div v-else>
                    -
                  </div>
                </td>
                <td key="Concepto" :props="props">
                  {{props.row.concepto}}
                </td>
                <td key="Medio de pago" :props="props">
                  {{props.row.medio}}
                </td>
                <td key="Valor" :props="props" class="text-right">
                  {{props.row.valor}} Bs.
                </td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-dialog v-model="dialogSale" position="right" full-height :maximized="true">
        <q-card style="width: 450px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none"  style="border-bottom: 5px solid #F44336">
            <div class="text-h6">
              <q-avatar square  icon="local_atm" color="red-1" text-color="red" />
              Nuevo gasto
            </div>
            <q-space />
            <q-btn icon="cancel" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center no-wrap">
            <q-form @submit.prevent="createSale">
              <div class="row">
                <div class="col-12">
                  <div class="text-caption text-bold">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
                </div>
                <div class="col-12">
                  <q-input dense outlined type="date" v-model="sale.fecha" label="Fecha de la venta*" hint="Porfavor ingresar Fecha de la venta" :rules="rule" required>
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">Valor <span class="text-red">*</span></div>
                  <q-input dense outlined v-model="sale.valor" label="Valor*" hint="Porfavor ingresar valor del gasto" type="number" :rules="ruleNumber" required clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="money" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">¿Quieres darle un nombre a este gasto?</div>
                  <q-input dense outlined v-model="sale.concepto" label="¿Quieres darle un nombre a este gasto?" clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="description" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="text-bold text-caption">Selecciona el método de pago <span class="text-red">*</span></div>
                  <div class="row">
                    <div class="col-6">
                      <q-card @click="updateMetodo('efectivo')" flat bordered class="q-pa-xs q-ma-xs text-center" :style="sale.medio=='efectivo'?'border: 1px solid green;cursor: pointer':'border: 1px solid grey;cursor: pointer'">
                        <q-card-section class="q-pa-none">
                          <q-icon name="o_payments" size="30px" color="grey"/>
                        </q-card-section>
                        <q-card-section class="q-pa-none">
                          <div class="text-bold text-grey noSelect">Efectivo</div>
                        </q-card-section>
                        <div v-if="sale.medio=='efectivo'" class="absolute-top-right text-center text-white q-pa-xs" style="background: green">
                          <q-icon name="check_circle_outline"/>
                        </div>
                      </q-card>
                    </div>
                    <div class="col-6">
                      <q-card @click="updateMetodo('targeta')" flat bordered class="q-pa-xs q-ma-xs text-center" :style="sale.medio=='targeta'?'border: 1px solid green;cursor: pointer':'border: 1px solid grey;cursor: pointer'">
                        <q-card-section class="q-pa-none">
                          <q-icon name="credit_card" size="30px" color="grey"/>
                        </q-card-section>
                        <q-card-section class="q-pa-none">
                          <div class="text-bold text-grey noSelect">Targeta</div>
                        </q-card-section>
                        <div v-if="sale.medio=='targeta'" class="absolute-top-right text-center text-white q-pa-xs" style="background: green">
                          <q-icon name="check_circle_outline"/>
                        </div>
                      </q-card>
                    </div>
                    <div class="col-6">
                      <q-card @click="updateMetodo('transferencia bancaria')" flat bordered class="q-pa-xs q-ma-xs text-center" :style="sale.medio=='transferencia bancaria'?'border: 1px solid green;cursor: pointer':'border: 1px solid grey;cursor: pointer'">
                        <q-card-section class="q-pa-none">
                          <q-icon name="account_balance" size="30px" color="grey"/>
                        </q-card-section>
                        <q-card-section class="q-pa-none">
                          <div class="text-bold text-grey noSelect">Transferencia bancaria</div>
                        </q-card-section>
                        <div v-if="sale.medio=='transferencia bancaria'" class="absolute-top-right text-center text-white q-pa-xs" style="background: green">
                          <q-icon name="check_circle_outline"/>
                        </div>
                      </q-card>
                    </div>
                    <div class="col-6">
                      <q-card @click="updateMetodo('otro')" flat bordered class="q-pa-xs q-ma-xs text-center" :style="sale.medio=='otro'?'border: 1px solid green;cursor: pointer':'border: 1px solid grey;cursor: pointer'">
                        <q-card-section class="q-pa-none">
                          <q-icon name="list_alt" size="30px" color="grey"/>
                        </q-card-section>
                        <q-card-section class="q-pa-none">
                          <div class="text-bold text-grey noSelect">Otro</div>
                        </q-card-section>
                        <div v-if="sale.medio=='otro'" class="absolute-top-right text-center text-white q-pa-xs" style="background: green">
                          <q-icon name="check_circle_outline"/>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="text-bold text-caption">Agrega un proveedor a la venta <span class="text-grey">(opcional)</span></div>
                  <q-select
                    dense
                    outlined
                    use-input
                    @filter="filterFn"
                    input-debounce="0"
                    v-model="sale.providers"
                    :options="providersOption"
                    label="Busca un proveedor o registra uno nuevo..."
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" @click="clickCreateProveedor(scope.opt)" :style="scope.opt.label=='Registrar un nuevo proveedor'?'border: 1px solid black':''">
                        <q-item-section avatar v-if="scope.opt.label=='Registrar un nuevo proveedor'">
                          <q-icon name="add_circle_outline" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-12 q-py-md">
                  <q-btn label="Crear gasto" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogProvider" position="right" full-height :maximized="true">
        <q-card style="width: 450px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Nuevo proveedor</div>
            <q-space />
            <q-btn icon="cancel" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center no-wrap">
            <q-form @submit.prevent="createProvider">
              <div class="row">
                <div class="col-12">
                  <div class="text-caption text-bold">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">Nombre completo <span class="text-red">*</span></div>
                  <q-input dense outlined v-model="provider.nombre" label="Nombre proveedor*" hint="Porfavor ingresar nombre proveedor" :rules="rule" required clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="person_outline" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="text-caption text-bold">Número de celular <span class="text-grey">(opcional)</span></div>
                  <q-input dense outlined v-model="provider.celular" type="number" label="Número de celular" hint="Porfavor ingresar numero de celular" clearable counter>
                    <template v-slot:prepend>
                      <q-icon name="phone" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 q-py-md">
                  <q-btn label="Crear proveedor" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
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
      dialogSale:false,
      dialogProvider:false,
      store: useCounterStore(),
      colums:[
        {name:'Acciones',label:'Acciones',field:'Acciones',align:'center'},
        {name:'Fecha',label:'Fecha',field:'Fecha',align:'left'},
        {name:'Cliente/Proveedores',label:'Cliente/Proveedores',field:'Cliente/Proveedores',align:'left'},
        {name:'Concepto',label:'Concepto',field:'Concepto',align:'left'},
        {name:'Medio de pago',label:'Medio de pago',field:'Medio de pago',align:'left'},
        {name:'Valor',label:'Valor',field:'Valor',align:'right'},
      ],
      fechas:{desde:date.formatDate(new Date(),'YYYY-MM-DD'),hasta:date.formatDate(new Date(),'YYYY-MM-DD')},
      buscar:'',
      sale:{},
      sales:[],
      providersOption:[],
      providersOption2:[],
      provider:{},
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
    this.myProvides()
    this.mySales()
  },
  methods:{
    formatoFecha(f,h){
      return moment(f).format('LL')+'|'+h.toString().substring(0,5)
    },
    mySales(){
      this.$api.post('consultsale',this.fechas).then(res=>{
        this.sales=res.data
      })
    },
    updateMetodo(medio){
      this.sale.medio=medio
    },
    createProvider(){
      this.provider.negocio_id=this.store.negocio.id
      this.$q.loading.show()
      this.$api.post('provider',this.provider).then(res=>{
        this.dialogProvider=false
        this.provider={}
        this.myProvides()
        this.$q.notify({
          message:'Cliente creado proveedor',
          color:'green',
          icon:'check'
        })
      })
    },
    clickCreateProveedor(p){
      if (p.id==0){
        this.sale.providers=''
        this.dialogProvider=true
      }
    },
    myProvides(){
      this.$api.get('provider').then(res=>{
        this.$q.loading.hide()
        this.providersOption=[]
        res.data.forEach(c=>{
          this.providersOption.push({
            label: c.nombre,
            value: c.nombre,
            id:c.id
          })
        })
        this.providersOption.push({
          label: 'Registrar un nuevo proveedor',
          value: 'Registrar un nuevo proveedor',
          id: 0
        })
        this.providersOption2=this.providersOption
        // this.clientesOption=res.data
      })
    },
    clickSale(){
      this.dialogSale=true
      this.sale={
        fecha:date.formatDate(new Date(),'YYYY-MM-DD'),
        medio:'efectivo'
      }
    },
    filterFn (val, update) {
      this.providersOption.pop()
      if (val === '') {
        update(() => {
          this.providersOption = this.providersOption2
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        this.providersOption.push({
          label: 'Registrar un nuevo proveedor',
          value: 'Registrar un nuevo proveedor',
          id: 0
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.providersOption = this.providersOption2.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
        this.providersOption.push({
          label: 'Registrar un nuevo proveedor',
          value: 'Registrar un nuevo proveedor',
          id: 0
        })
      })

    },
    createSale(){
      this.$q.loading.show()
      this.sale.tipo='GASTO'
      if (this.sale.providers==undefined){
        this.sale.provider_id=null
      }else {
        this.sale.provider_id=this.sale.providers.id
      }
      this.sale.cliente_id=null
      this.sale.negocio_id=this.store.negocio.id
      this.sale.productos=[]
      // this.finSale=this.sale
      this.$api.post('sale',this.sale).then(res=>{
        // console.log(res.data)
        // return false
        // this.productosVenta=[]
        // this.misproductos()
        this.$q.loading.hide()
        this.dialogSale=false
        this.$q.notify({
          message:'Gasto realizada',
          color:'green',
          icon:'check'
        })
      })
    },
  },
  computed:{
    costototal(){
      return 0
    },
    utilidadTotal(){
      let v=0,g=0
      this.sales.forEach(s=>{
        if (s.tipo=='VENTA')
          v+=parseFloat(s.valor)
        if (s.tipo=='GASTO')
          g+=parseFloat(s.valor)
      })
      return (v-g).toFixed(2)
    },
    ventasTotal(){
      let v=0
      this.sales.forEach(s=>{
        if (s.tipo=='VENTA')
          v+=parseFloat(s.valor)
      })
      return (v).toFixed(2)
    },
    gastoTotal(){
      let g=0
      this.sales.forEach(s=>{
        if (s.tipo=='GASTO')
          g+=parseFloat(s.valor)
      })
      return (g).toFixed(2)
    },
  }
}
</script>
<style scoped>

</style>

