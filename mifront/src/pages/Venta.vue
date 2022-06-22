<template>
  <div>
    <q-header bordered class="text-black bg-white" style="border-bottom: 5px solid #009940">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="this.store.leftDrawerOpen = !this.store.leftDrawerOpen"/>
        <q-toolbar-title class="text-bold">
          <q-avatar square  icon="local_atm" color="green-1" text-color="green" />
          Venta
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page class="q-pa-none">
      <div class="row">
<!--        <div class="col-12">-->
<!--          <iframe id="docpdf" src="" frameborder="0" style="width: 100%;height: 100vh"></iframe>-->
<!--        </div>-->
        <div class="col-12 col-sm-7">
          <div class="row">
            <div class="col-12 col-sm-12 ">
              <q-input dense outlined label="Buscar producto..." hint="Recuerda ingresar al menos 3 caracteres para iniciar tu búsqueda." counter clearable v-model="filterProducto" @update:model-value="buscarProducto">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-5 flex flex-center">
              <!--          <pre>{{optionsCategoriasVer}}</pre>-->
              <!--          <pre>{{categoriaver}}</pre>-->
              <q-select class="full-width full-height text-bold" dense :options="optionsCategoriasVer" v-model="categoriaver" outlined @update:model-value="buscarPorCategoria"/>
            </div>
            <div class="col-12 col-sm-7 flex flex-center">
              <q-select
                class="full-width full-height"
                dense
                outlined
                v-model="ordenar"
                :options="optionsOrdernar"
              >
                <template v-slot:selected>
                  <span class="text-bold">Ordernar: </span>
                  <div
                    v-if="ordenar"
                    class="q-pl-xs"
                  >
                    <!--            <q-avatar color="primary" text-color="white" :icon="ordenar.icon" />-->
                    {{ ordenar.label }}
                  </div>
                  <q-badge v-else>*none*</q-badge>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-2" v-for="p in productos" :key="p.id">
                <q-card @click="clickDetalleProducto(p)" style="cursor: pointer">
                  <q-tooltip>
                    {{p.nombre}}
                  </q-tooltip>
                  <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">
                    <q-btn v-if="p.cantidadPedida==0" style="top: 0px; right: 0px;background: rgba(255,255,255,0.5);border: 1px solid black" size="10px" class="absolute all-pointer-events" icon="add_circle_outline" dense/>
                    <q-btn v-else :label="p.cantidadPedida" style="top: 0px; right: 0px;background: rgba(255,255,0,0.5);border: 1px solid black" size="10px" class="absolute all-pointer-events" icon="o_shopping_basket" dense/>
                    <div class="absolute-bottom text-center text-subtitle2 noSelect  q-pa-none q-ma-none">
                      {{p.nombre}}
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-none q-ma-none">
                    <div class="text-center text-subtitle2">{{ p.precio }} Bs</div>
                    <div :class="p.cantidad<=0?'text-center text-bold text-red':' text-center text-bold'">{{ p.cantidad }} {{ $q.screen.lt.md?'Dis':'Disponible' }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-5">
          <q-card>
            <q-card-section class="q-pa-none q-ma-none ">
              <div class="row">
                <div class="col-6 text-h6 q-pt-xs q-pl-lg">Canasta</div>
                <div class="col-6 text-right"><q-btn class="text-subtitle1 text-blue-10 text-bold" style="text-decoration: underline;" label="Vaciar canasta" @click="vaciarCanasta" no-caps flat outline/></div>
              </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section class="q-pa-none q-ma-none" >
              <div v-if="productosVenta.length==0" class="flex flex-center q-pa-lg">
                <q-icon name="o_shopping_basket" color="grey" size="100px"/>
                <div class="q-pa-lg text-grey text-center noSelect">
                  Aún no tienes productos en tu canasta. Haz clic sobre un producto para agregarlo.
                </div>
              </div>
              <q-scroll-area v-else style="height: 400px;">
                <q-table dense flat bordered hide-bottom hide-header :rows="productosVenta" :columns="columnsProductosVenta" :rows-per-page-options="[0]">
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="borrar" auto-width :props="props">
                        <q-icon @click="deleteProductosVenta(props.row,props.pageIndex)" name="delete_outline" color="red" size="25px" />
                      </q-td>
                      <q-td key="nombre" :props="props">
                        <div class="row">
                          <div class="col-3">
                            <q-img :src="url+'../imagenes/'+props.row.foto" width="40px" height="80px" />
                          </div>
                          <div class="col-9">
                            <div>{{props.row.nombre}}</div>
                            <div class="text-grey">Disponible: {{props.row.cantidad}}</div>
                            <div>
                              <div class="row">
                                <div class="col-8">
                                  <q-input v-model="props.row.precioVenta" type="number" @update:model-value="precioVenta(props.row)" dense style="margin: 0px">
                                    <template v-slot:prepend>
                                      <q-icon name="edit" size="xs" />
                                      <div style="font-size: 10px">Bs.</div>
                                    </template>
                                  </q-input>
                                </div>
                                <div class="col-2 text-bold flex flex-center">
                                  x und
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-td>
                      <q-td key="cantidadVenta" :props="props">
                        <q-input dense outlined bottom-slots min="1" v-model="props.row.cantidadVenta" @update:model-value="cambioNumero(props.row,props.pageIndex)" :rules="ruleNumber" type="number" input-class="text-center" required placeholder="Escribe el nombre del producto">
                          <template v-slot:prepend>
                            <q-icon name="remove_circle_outline" @click="removeCantidad(props.row,props.pageIndex)"/>
                          </template>
                          <template v-slot:append>
                            <q-icon name="add_circle_outline" @click="addCantidad(props.row,props.pageIndex)"/>
                          </template>
                        </q-input>
                        <div class="text-grey">= Bs {{props.row.cantidadVenta*props.row.precioVenta}}</div>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-scroll-area>
            </q-card-section>
            <q-card-section >
              <q-list padding bordered dense class="rounded-borders full-width q-pa-none q-ma-none">
                <q-expansion-item
                  dense
                  dense-toggle
                  expand-separator
                  label="Total"
                >
                  <template v-slot:header>
                    <q-item-section>
                      Total
                    </q-item-section>
                    <q-item-section side>
                        <div class="text-right text-grey-8 text-bold"> <u> Bs {{total}}</u></div>
                    </q-item-section>
                  </template>
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div class="col-7 text-grey">Cantidades de referencia</div>
                        <div class="col-5 text-right">{{productosVenta.length}}</div>
                        <div class="col-7 text-grey">
                          Ganancia
                          <q-icon name="o_info">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                              Para calcular la ganancia correctamente, deberás cargar el costo unitario de todos los productos desde tu Inventario.
                            </q-tooltip>
                          </q-icon>
                        </div>
                        <div class="col-5 text-right text-green">{{totalganancia}} Bs</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
                <q-btn @click="clickSale" class="full-width" no-caps label="Confirmar venta" :color="productosVenta.length==0?'grey':'warning'" :disable="productosVenta.length==0?true:false"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
    <q-dialog v-model="dialogSale" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar producto</div>
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
                <div class="text-bold text-caption">Agrega un cliente a la venta <span class="text-grey">(opcional)</span></div>
                <q-select
                  dense
                  outlined
                  use-input
                  @filter="filterFn"
                  input-debounce="0"
                  v-model="sale.clientes"
                  :options="clientesOption"
                  label="Busca un cliente o registra uno nuevo..."
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" @click="clickCreateCliente(scope.opt)" :style="scope.opt.label=='Registrar un nuevo cliente'?'border: 1px solid black':''">
                      <q-item-section avatar v-if="scope.opt.label=='Registrar un nuevo cliente'">
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
                <q-btn label="Confirmar venta" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogCliente" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Nuevo cliente</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="createCliente">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-bold">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12">
                <div class="text-caption text-bold">Nombre completo <span class="text-red">*</span></div>
                <q-input dense outlined v-model="cliente.nombre" label="Nombre cliente*" hint="Porfavor ingresar nombre cliente" :rules="rule" required clearable counter>
                  <template v-slot:prepend>
                    <q-icon name="person_outline" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <div class="text-caption text-bold">Número de celular <span class="text-grey">(opcional)</span></div>
                <q-input dense outlined v-model="cliente.celular" type="number" label="Número de celular" hint="Porfavor ingresar numero de celular" clearable counter>
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-py-md">
                <q-btn label="Crear cliente" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogCreasteVenta" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">¡Creaste una venta!</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="updateSale">
            <div class="row">
              <div class="col-12 text-center q-pb-lg">
                <q-icon name="o_check_circle" size="50px" color="green"/>
                <div class="text-bold text-caption text-grey">Se registró en tu balance por un valor de <span class="text-black text-bold">Bs {{valorUltimaVenta}}</span></div>
              </div>
              <div class="col-12">
                <div class="text-caption text-bold">¿Quieres darle un nombre a esta venta?</div>
                <q-input dense outlined v-model="concepto" placeholder="Escríbelo aquí (opcional)" clearable counter>
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-card class="bg-grey-3" flat bordered>
                  <q-card-section>
                    <div class="text-bold text-caption">
                      Comprobante
                    </div>
                    <div class="text-bold text-caption text-grey">
                      Puedes descargar el comprobante de venta.
                    </div>
                    <q-btn class="full-width" @click="comprobante" outline color="blue" label="Descarga el comprobante" icon="download" />
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 q-py-md">
                <q-btn label="Nueva venta" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
                <q-btn label="Ir a Balance" to="/home" no-caps outline  class=" text-build text-black full-width"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import {useCounterStore} from "stores/example-store";
import {date} from "quasar";
import { jsPDF } from "jspdf";
import $ from 'jquery'
import moment from 'moment'
moment.locale('es')
export default {
  name: `Venta`,
  data(){
    return {
      dialogCreasteVenta:false,
      dialogCliente:false,
      dialogSale:false,
      url: process.env.API,
      store:useCounterStore(),
      sale:{},
      concepto:'',
      clientesOption:[],
      clientesOption2:[],
      cliente:{},
      ordenar:{label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
      categoriaver:{
        label: 'Ver todas las categorias',
        value: '',
        icon: 'polymer',
        id:0
      },
      columnsProductosVenta:[
        {label:'borrar',field:'borrar',name:'borrar',align:'left'},
        {label:'nombre',field:'nombre',name:'nombre',align:'left'},
        {label:'cantidadVenta',field:'cantidadVenta',name:'cantidadVenta'},
      ],
      optionsOrdernar:[
        {label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
        {label: 'Alfabéticamente',value: 'Alfabéticamente',icon:'list'},
        {label: 'Productos más rentables',value: 'Productos más rentables',icon:'list'},
        {label: 'Últimas unidades disponibles',value: 'Últimas unidades disponibles',icon:'list'},
      ],
      productos:[],
      productos2:[],
      optionsCategoriasVer:[],
      filterProducto:'',
      productosVenta:[],
      valorUltimaVenta:0,
      finSale:0,
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      ruleNumber: [
        val => (val !== null && val !== '') || 'Por favor escriba su cantidad',
        val => (val >= 0 && val < 10000) || 'Por favor escriba una cantidad real'
      ],
    }
  },
  created() {
    this.$q.loading.show()
    this.misproductos()
    this.misclientes()
    this.miscategorias()
  },
  mounted() {

  },
  methods:{
    comprobante(){
      var doc = new jsPDF()
      var img = new Image()
      img.src = 'logo.jpg'
      doc.addImage(img, 'jpg', 5, 5, 10, 10)
      doc.setFont('times', 'bold')
      doc.setFontSize(8)
      doc.text('Gobierno Autónomo',29,9,'center')
      doc.text('Municipal de Oruro',29,12,'center')
      doc.setFontSize(12)
      doc.text(this.store.negocio.nombre,85,10,'center')
      doc.setFont('times', 'normal')
      doc.setFontSize(9)
      doc.text('Tipo:',135,8)
      doc.text('Direccion:',135,11)
      doc.text('Ciudad:',135,14)
      doc.setFont('times', 'bold')
      doc.text(this.store.negocio.tipo==null?'':this.store.negocio.tipo,150,8)
      doc.text(this.store.negocio.direccion==null?'':this.store.negocio.direccion,150,11)
      doc.text(this.store.negocio.ciudad==null?'':this.store.negocio.ciudad,150,14)
      doc.setDrawColor(169,169,169)
      doc.line(5,16,205,16)
      doc.setFont('times', 'normal')
      doc.setFontSize(10)
      doc.text('Fecha de la transacción',10,20)
      doc.setFont('times', 'bold')
      doc.text(moment().format('LLL'),45,20)
      doc.setFont('times', 'normal')
      doc.setFontSize(10)
      doc.text('Contacto',100,20)
      doc.setFont('times', 'bold')
      doc.text(this.finSale.clientes==undefined?'':this.finSale.clientes.label,115,20)
      doc.text('Productos',10,25)
      doc.text('Cantidad',120,25)
      doc.text('Precio unitario',150,25)
      doc.text('Valor',190,25)
      doc.setFont('times', 'normal')
      doc.line(5,26,205,26)
      let y=30

      this.finSale.productos.forEach(p=>{
        // console.log(p)
        doc.text(p.nombre.toString(),10,y)
        doc.text(p.cantidadVenta.toString(),120,y)
        doc.text(p.precioVenta.toString(),150,y)
        doc.text((p.cantidadVenta*p.precioVenta)+' Bs',200,y,'right')
        y+=5
      })
      doc.setFont('times', 'bold')
      doc.text('Total:',10,y)
      doc.text(this.finSale.valor+' Bs',200,y,'right')

      // $( '#docpdf' ).attr('src', doc.output('datauristring'))
      window.open(doc.output('bloburl'), '_blank');
    },
    updateSale(){
      this.dialogCreasteVenta=false
      this.$api.put('sale/'+this.finSale.id,{concepto:this.concepto})
    },
    createCliente(){
      this.cliente.negocio_id=this.store.negocio.id
      this.$api.post('cliente',this.cliente).then(res=>{
        this.dialogCliente=false
        this.cliente={}
        this.misclientes()
        this.$q.notify({
          message:'Cliente creado correctamente',
          color:'green',
          icon:'check'
        })
      })
    },
    clickCreateCliente(c){
      if (c.id==0){
        this.sale.clientes=''
        this.dialogCliente=true
      }
    },
    misclientes(){
      this.$api.get('cliente').then(res=>{
        this.clientesOption=[]
        res.data.forEach(c=>{
          this.clientesOption.push({
            label: c.nombre,
            value: c.nombre,
            id:c.id
          })
        })
        this.clientesOption.push({
          label: 'Registrar un nuevo cliente',
          value: 'Registrar un nuevo cliente',
          id: 0
        })
        this.clientesOption2=this.clientesOption
        // this.clientesOption=res.data
      })
    },
    updateMetodo(medio){
      this.sale.medio=medio
    },
    clickSale(){
      this.dialogSale=true
      this.sale={
        fecha:date.formatDate(new Date(),'YYYY-MM-DD'),
        medio:'efectivo',
      }
    },
    createSale(){
      this.$q.loading.show()
      let concepto=''
      this.productosVenta.forEach(p=>{
        concepto+=p.cantidadVenta+' '+p.nombre+','
      })
      this.sale.concepto=concepto
      this.sale.valor=this.total
      this.valorUltimaVenta=this.total
      this.sale.tipo='VENTA'
      if (this.sale.clientes==undefined){
        this.sale.cliente_id=null
      }else {
        this.sale.cliente_id=this.sale.clientes.id
      }
      this.sale.provider_id=null
      this.sale.negocio_id=this.store.negocio.id
      this.sale.productos=this.productosVenta
      this.finSale=this.sale
      this.$api.post('sale',this.sale).then(res=>{
        this.finSale.id=res.data.id
        this.productosVenta=[]
        this.misproductos()
        this.dialogSale=false
        this.dialogCreasteVenta=true
        this.$q.notify({
          message:'Venta realizada',
          color:'green',
          icon:'check'
        })
      })
    },
    async vaciarCanasta() {
      await this.productosVenta.forEach(p => {
        p.cantidad = p.cantidadReal
        p.cantidadVenta = 0
        p.cantidadPedida = 0
      })
      this.productosVenta=[]
    },
    cambioNumero(n,i){
      if (n.cantidadVenta!=''){
        n.cantidad= parseInt(n.cantidadReal)-parseInt(n.cantidadVenta)
        n.cantidadPedida= parseInt(n.cantidadVenta)
      }
      if (n.cantidadVenta==0){
        n.cantidad= parseInt(n.cantidadReal)-1
        n.cantidadVenta=1
        n.cantidadPedida=1
      }
    },
    addCantidad(n,i){
      n.cantidad--
      n.cantidadPedida++
      n.cantidadVenta=parseInt(n.cantidadVenta)+1
    },
    removeCantidad(n,i){
      n.cantidad++
      n.cantidadPedida--
      if (n.cantidadVenta>1){
        n.cantidadVenta=parseInt(n.cantidadVenta)-1
      }else if(n.cantidadVenta==1){
        this.productosVenta.splice(i,1)
      }
    },
    precioVenta(n){
      if (n.precioVenta==''){
        n.precioVenta=1
      }
    },
    deleteProductosVenta(p,i){
      this.productosVenta.splice(i,1)
      p.cantidad=p.cantidadReal
      p.cantidadVenta=0
      p.cantidadPedida=0
    },
    filterFn (val, update) {
      this.clientesOption.pop()
      if (val === '') {
        update(() => {
          this.clientesOption = this.clientesOption2
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        this.clientesOption.push({
          label: 'Registrar un nuevo cliente',
          value: 'Registrar un nuevo cliente',
          id: 0
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.clientesOption = this.clientesOption2.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
        this.clientesOption.push({
          label: 'Registrar un nuevo cliente',
          value: 'Registrar un nuevo cliente',
          id: 0
        })
      })

    },
    buscarProducto(filterProducto){
      if(filterProducto!=null){
        const needle = filterProducto.toLowerCase()
        let options = this.productos2.filter(v => v.nombre.toLowerCase().indexOf(needle) > -1)
        this.productos=options
      }else{
        this.productos=this.productos2
      }
    },
    misproductos(){
      this.$api.get('producto').then(res=>{
        this.productos=[]
        this.$q.loading.hide()
        res.data.forEach(p=>{
          p.cantidadPedida=0
          p.cantidadReal=p.cantidad
          this.productos.push(p)
        })
        this.productos2=this.productos
      }).catch(err=>{
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    clickDetalleProducto(p){
      p.cantidadPedida++
      p.cantidad--
      let producto=this.productosVenta.find(pv=>pv.id===p.id)
      if (producto==undefined){
        p.cantidadVenta=1
        p.precioVenta=p.precio
        this.productosVenta.push(p)
      }else{
        producto.cantidad=p.cantidad
        producto.cantidadVenta++
      }

    },
    miscategorias(){
      this.optionsCategoriasVer=[{
        label: 'Ver todas las categorias',
        value: '',
        id:0
      }]
      this.optionsCategorias=[{
        label: 'Sin categoria',
        value: 'Sin categoria',
        id:0
      }]
      this.$api.get('categoria').then(res=>{
        this.categorias=res.data
        res.data.forEach(c=>{
          this.optionsCategoriasVer.push({
            label: c.nombre,
            value: c.nombre,
            id:c.id
          })
          this.optionsCategorias.push({
            label: c.nombre,
            value: c.nombre,
            id:c.id
          })
        })
        this.optionsCategorias.push({
          label: 'Crear una nueva categoría',
          value: 'Crear una nueva categoría',
          id: 0
        })
      }).catch(err=>{
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    buscarPorCategoria(filterCategoria){
      if (filterCategoria.label=="Ver todas las categorias"){
        this.productos=this.productos2
      }else{
        const needle = filterCategoria.id
        let productos=[]
        this.productos2.forEach(producto => {
          if(producto.categoria_id==needle){
            productos.push(producto)
          }
        })
        this.productos=productos
      }
    },
  },
  computed:{
    total(){
      let s=0
      this.productosVenta.forEach(p=>{
        s= s+parseFloat( p.precioVenta*p.cantidadVenta)
      })
      return s.toFixed(2)
    },
    totalganancia(){
      let s=0
      this.productosVenta.forEach(p=>{
        if (p.ganancia!=null)
        s= s+parseFloat( p.ganancia*p.cantidadVenta)
      })
      return s.toFixed(2)
    }
  }
}
</script>

<style scoped>
.noSelect{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Versión sin prefijo, actualmente
                                      compatible con Chrome y Opera */
}
</style>
