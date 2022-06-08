<template>
<q-page class="q-pa-xs">
  <div class="row">
    <div class="col-12 col-sm-7">
      <div class="row">
        <div class="col-12 col-sm-3 ">
          <q-input dense clearable outlined placeholder="Buscar Producto">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-sm-4 flex flex-center">
<!--          <pre>{{optionsCategoriasVer}}</pre>-->
<!--          <pre>{{categoriaver}}</pre>-->
          <q-select class="full-width full-height text-bold" dense :options="optionsCategoriasVer" v-model="categoriaver" outlined @update:model-value="buscarPorCategoria"/>

        </div>
        <div class="col-12 col-sm-5 flex flex-center">
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
            <q-card @click="clickDetalleProducto(p)">

              <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">
<!--                <q-icon class="absolute all-pointer-events" size="32px" name="add_circle" color="white" style="top: 0px; right: 0px">-->
<!--                  <q-tooltip>-->
<!--                    Tooltip-->
<!--                  </q-tooltip>-->
<!--                </q-icon>-->
                  <q-btn style="top: 0px; right: 0px;background: white;border: 1px solid black" size="10px" class="absolute all-pointer-events" icon="add_circle"  dense  ></q-btn>

                <div class="absolute-bottom text-center text-subtitle2">
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
        <q-card-section class="q-pa-none q-ma-none">
          <div class="row">
            <div class="col-6 text-h6 q-pt-xs q-pl-xs">Canasta</div>
            <div class="col-6 text-right"><q-btn class="text-subtitle1 text-blue-10 text-bold" style=" text-decoration: underline;" label="Vaciar canasta" no-caps flat outline/></div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div >{{productos}}</div>
</q-page>
</template>
<script>
import {mapGetters, mapState} from 'vuex';

export default {
  name: `Venta`,
  data(){
    return{
      url:process.env.API,
      ordenar:{label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
      categoriaver:{
        label: 'Ver todas las categorias',
        value: '',
        icon: 'polymer',
        id:0
      },
      optionsOrdernar:[
        {label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
        {label: 'Alfabéticamente',value: 'Alfabéticamente',icon:'list'},
        {label: 'Productos más rentables',value: 'Productos más rentables',icon:'list'},
        {label: 'Últimas unidades disponibles',value: 'Últimas unidades disponibles',icon:'list'},
      ],
      // productos:[],
    }
  },
  mounted() {
    // this.misproductos()
  },
  methods:{
    // misproductos(){
    //   // console.log('a')
    //   this.productos=[]
    //   this.$store.getters['login/productos'].forEach(r=>{
    //     console.log(r)
    //     this.productos.push(r)
    //   })
    // },
    clickDetalleProducto(p){
      console.log(p)
    },
    buscarPorCategoria(filterCategoria){
      if (filterCategoria.label=="Ver todas las categorias"){
        let productos=[]
        this.$store.getters['login/productos'].forEach(producto => {
          // if(producto.categoria_id==needle){
            // console.log(producto.categoria_id+'------'+needle)
            productos.push(producto)
          // }
        })
        this.productos=productos
      }else{
        const needle = filterCategoria.id
        let productos=[]
        this.$store.getters['login/productos'].forEach(producto => {
          if(producto.categoria_id==needle){
            // console.log(producto.categoria_id+'------'+needle)
            productos.push(producto)
          }
        })
        this.productos=productos
      }
    },
  },
  computed:{
    // computed: {
    //   ...mapGetters(['login/productos']),
      ...mapState(['login/productos']),
    // }
    // misproductos(){
    //   let productos=[]
    //   this.$store.getters['login/productos'].forEach(r=>{
    //     console.log(r)
    //     this.productos.push(r)
    //   })
    //   return 0
    // },
    optionsCategoriasVer(){
      let cat=[{
        label: 'Ver todas las categorias',
        value: '',
        icon: 'polymer',
        id:0
      }]
      this.$store.getters["login/categorias"].forEach(c=>{
        cat.push({
          label: c.nombre,
          value: c.nombre,
          icon: 'polymer',
          id:c.id
        })
      })
      return cat
    },
  }
}
</script>

<style scoped>

</style>
