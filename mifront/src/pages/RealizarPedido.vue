<template>
  <div>
    <q-header bordered class="text-black bg-white" style="border-bottom: 3px solid #F44336">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="this.store.leftDrawerOpen = !this.store.leftDrawerOpen"/>
        <q-toolbar-title class="text-bold">
          <q-avatar square  icon="travel_explore" color="red-1" text-color="red" />
          Realizar pedido
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <div style="height: 350px; width: 100%;">
<!--        <div id="refreshButton2">-->
<!--          <q-btn type="button" :class="urlMap=='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'?'text-bold':''" @click="CLickUrlMap('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')" label="Mapa" style="background: white" size="10px"/>-->
<!--          <q-btn type="button" :class="urlMap!='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'?'text-bold':''" @click="urlMap='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'" label="Satelite" style="background: white" size="10px"/>-->
<!--        </div>-->
        Lat: {{marker[0]}} Lng: {{marker[1]}}
      <l-map @ready="onReady" @click="addMarker" @locationfound="onLocationFound" :options="{ attributionControl:true}" v-model="zoom" :zoom="zoom" :center="center" :maxZoom="17">
        <l-tile-layer :url="urlMap"/>
        <l-control>
          <q-btn type="button" :class="urlMap=='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'?'text-bold':''" @click="urlMap='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'" label="Mapa" style="background: white" size="10px"/>
          <q-btn type="button" :class="urlMap!='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'?'text-bold':''" @click="urlMap='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'" label="Satelite" style="background: white" size="10px"/>
        </l-control>
<!--        <l-marker v-for="(c,i) in clientes" :key="c.Cod_Aut" :lat-lng="[c.Latitud, c.longitud]"  >-->
<!--          <l-icon><q-badge  :class="c.estados=='ENTREGADO'?'bg-green text-italic':c.estados=='NO ENTREGADO'?'bg-red text-italic':''"  class="q-pa-none" color="info" >{{i+1}}</q-badge></l-icon>-->
<!--        </l-marker>-->
        <l-marker :lat-lng="marker" :draggable="true" @drag="updateMarker" />
      </l-map>
      </div>
    </q-page>
  </div>

</template>
<script>
import  "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import {globalStore} from "stores/global";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl
  },
  data() {
    return {
      urlMap:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 14,
      center:[-17.970371, -67.112303],
      store:globalStore(),
      marker: [0, 0],
    };
  },
  methods:{
    updateMarker(e){
      if (e.latlng!=undefined){
        this.marker=[e.latlng.lat.toFixed(7),e.latlng.lng.toFixed(7)]
      }
    },
    addMarker(e){
      if (e.latlng!=undefined){
        this.marker=[e.latlng.lat.toFixed(7),e.latlng.lng.toFixed(7)]
      }
    },
    onReady (mapObject) {
      mapObject.locate();
    },
    onLocationFound(location){
      this.center=[location.latlng.lat,location.latlng.lng]
    },
  }
};
</script>

<style>
#refreshButton {
  position: absolute;
  top: 0px;
  right: 0px;
  /*padding: 0px;*/
  z-index: 400;
}
</style>
