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
            <div class="row" av-else-if="productos.length==0 && $store.getters['login/productos'].length>0">
              <div class="col-2" v-for="p in productos" :key="p.id">
                <q-card @click="clickDetalleProducto(p)" style="cursor: pointer">
                  <q-tooltip>
                    {{p.nombre}}
                  </q-tooltip>
                  <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">
                    <q-btn v-if="p.cantidadPedida==0" style="top: 0px; right: 0px;background: rgba(255,255,255,0.5);border: 1px solid black" size="10px" class="absolute all-pointer-events" icon="add_circle_outline" dense/>
                    <q-btn v-else :label="p.cantidadPedida" style="top: 0px; right: 0px;background: rgba(255,255,0,0.5);border: 1px solid black" size="10px" class="absolute all-pointer-events" icon="o_shopping_basket" dense/>
                    <div class="absolute-bottom text-center text-subtitle2 noselect  q-pa-none q-ma-none">
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
                <div class="q-pa-lg text-grey text-center noselect">
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
                        <div class="col-7">Cantidades de referencia</div>
                        <div class="col-5 text-right">{{productosVenta.length}}</div>
                        <div class="col-7">
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
<!--              <div class="row">-->
<!--                <div class="col-9">Total</div>-->
<!--                -->
                <q-btn class="full-width" no-caps label="Confirmar venta" :color="productosVenta.length==0?'grey':'warning'" :disable="productosVenta.length==0?true:false"/>
<!--              </div>-->
            </q-card-section>
          </q-card>
        </div>
      </div>
<!--      <pre>{{productos}}</pre>-->
    </q-page>
  </div>
</template>
<script>

import {useCounterStore} from "stores/example-store";

export default {
  name: `Venta`,
  data(){
    return {
      url: process.env.API,
      store:useCounterStore(),
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
    this.miscategorias()
  },
  methods:{
    async vaciarCanasta() {
      let dato =await this.productosVenta.forEach(p => {
        p.cantidad = p.cantidadReal
        p.cantidadVenta = 0
        p.cantidadPedida = 0
      })
      this.productosVenta=[]
      // console.log(dato)
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
.noselect{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Versión sin prefijo, actualmente
                                      compatible con Chrome y Opera */
}
</style>
