<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-8">
        <q-input dense outlined label="Buscar producto..." hint="Recuerda ingresar al menos 3 caracteres para iniciar tu búsqueda." counter clearable v-model="filterProducto" @update:model-value="buscarProducto">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-4 text-center ">
        <q-btn flat  label="Descargar reporte" icon="o_sim_card_download" no-caps />
      </div>
      <div class="col-12 col-sm-6 q-pa-xs">
        <q-card bordered flat>
          <q-item >
            <q-item-section avatar >
              <q-avatar square  icon="view_in_ar" color="grey-1" text-color="grey" size="60px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-grey">Total de referencias</q-item-label>
              <q-item-label class="text-h5">{{$store.getters["login/productos"].length}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 q-pa-xs">
        <q-card bordered flat>
          <q-item >
            <q-item-section avatar >
              <q-avatar square  icon="monetization_on" color="green-1" text-color="green" size="60px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-grey">Costo total de inventario</q-item-label>
              <q-item-label class="text-h5 text-green">{{costototal}} Bs</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-12 col-sm-3 q-pa-xs flex flex-center">
        <q-btn @click="clickUpdateCategoria" class="full-width full-height" label="Editar categorías" icon="o_edit" outline no-caps/>
      </div>
      <div class="col-12 col-sm-3 q-pa-xs flex flex-center">
        <q-select class="full-width full-height text-bold" dense :options="optionsCategoriasVer" v-model="categoriaver" outlined @update:model-value="buscarPorCategoria"/>
      </div>
      <div class="col-12 col-sm-6 q-pa-xs flex flex-center">
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
      <div class="col-12">

<!--        <div class="row" v-else-if="optionsCategoriasVer.label!='Ver todas las categorias' && productos.length==0">-->
<!--          <div class="col-2" v-for="p in productos" :key="p.id">-->
<!--            <q-card @click="clickDetalleProducto(p)">-->
<!--              <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">-->
<!--                <div class="absolute-bottom text-center text-subtitle2">-->
<!--                  {{p.nombre}}-->
<!--                </div>-->
<!--              </q-img>-->
<!--              <q-card-section class="q-pa-none q-ma-none">-->
<!--                <div class="text-center text-subtitle2">{{ p.precio }} Bs</div>-->
<!--                <div :class="p.cantidad<=0?'text-center text-bold text-red':' text-center text-bold'">{{ p.cantidad }} {{ $q.screen.lt.md?'Dis':'Disponible' }}</div>-->
<!--              </q-card-section>-->
<!--            </q-card>-->
<!--          </div>-->
<!--        </div>-->
        <q-card v-if="categoriaver.label!='Ver todas las categorias' && productos.length==0" flat>
          <q-card-section>
            <div class="row">
              <div class="col-12 flex flex-center">
<!--                {{productos.length}} productos-->
<!--                {{optionsCategoriasVer.label}}-->
                <q-avatar size="150px" font-size="150px" color="white" text-color="grey" icon="view_in_ar" />
              </div>
              <div class="col-12">
                <div class="text-bold text-grey text-center">No encontramos productos para tu búsqueda.</div>
                <div class="text-bold text-grey text-center">Intenta con otra palabra o agrega productos a tu Inventario.</div>
              </div>
              <div class="col-12 col-sm-6 text-center">
                <q-btn size="lg" color="grey-8" @click="clickCreateProducto" label="Agregar manualmente" outline no-caps />
              </div>
              <div class="col-12 col-sm-6 text-center">
                <q-btn size="lg" text-color="grey-9" color="yellow" label="Subir productos desde Excel" no-caps class="text-black"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="row" v-else-if="productos.length==0 && $store.getters['login/productos'].length>0">
          <div class="col-2" v-for="p in $store.getters['login/productos']" :key="p.id">
            <q-card @click="clickDetalleProducto(p)">
              <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">
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
        <div class="row" v-else-if="productos.length>0">
          <div class="col-2" v-for="p in productos" :key="p.id">
            <q-card @click="clickDetalleProducto(p)">
              <q-img :src="url+'../imagenes/'+p.foto" width="100%" height="100px">
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
        <q-card v-else flat>
          <q-card-section>
            <div class="row">
              <div class="col-12 flex flex-center">
                <q-avatar size="150px" font-size="150px" color="white" text-color="grey" icon="view_in_ar" />
              </div>
              <div class="col-12">
                <div class="text-bold text-grey text-center">No encontramos productos para tu búsqueda.</div>
                <div class="text-bold text-grey text-center">Intenta con otra palabra o agrega productos a tu Inventario.</div>
              </div>
              <div class="col-12 col-sm-6 text-center">
                <q-btn size="lg" color="grey-8" @click="clickCreateProducto" label="Agregar manualmente" outline no-caps />
              </div>
              <div class="col-12 col-sm-6 text-center">
                <q-btn size="lg" text-color="grey-9" color="yellow" label="Subir productos desde Excel" no-caps class="text-black"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
<!--        <pre>{{productos}}</pre>-->
<!--        <pre>{{$store.getters["login/productos"]}}</pre>-->
      </div>
    </div>
    <q-dialog v-model="dialogDetalleProducto" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Resumen del producto</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center ">
          <q-form class="full-width">
            <div class="row" >
              <div class="col-12 flex flex-center" >
                <q-img :src="url+'../imagenes/'+producto.foto" width="150px">
                  <div class="absolute-bottom text-center text-subtitle2">{{producto.nombre}}</div>
                </q-img>
              </div>
              <div class="col-12">
                <div :class="producto.cantidad<=0?'text-center text-bold text-red':' text-center text-bold'">{{ producto.cantidad }} {{ $q.screen.lt.md?'Disponible':'Disponible' }}</div>
              </div>
              <div class="col-12" >
                <q-card bordered flat class="bg-grey-3">
                  <q-card-actions>
                    <div class="row full-width text-grey-8"  >
                      <div class="col-6 q-pb-xs"><q-icon name="qr_code_2" /> Código de barras</div>
                      <div class="col-6 q-pb-xs text-right" >{{producto.codigo}}</div>
                      <div class="col-6 q-pb-xs"><q-icon name="o_sell" /> Precio*</div>
                      <div class="col-6 q-pb-xs text-right" >{{producto.precio}}</div>
                      <div class="col-6 q-pb-xs"><q-icon name="request_quote" /> Costo</div>
                      <div class="col-6 q-pb-xs text-right" >{{producto.costo}}</div>
                      <div class="col-6 q-pb-xs"><q-icon name="category" /> Categoría</div>
                      <div class="col-6 text-right" >{{producto.categoria.label}}</div>
                    </div>
                  </q-card-actions>
                </q-card>
              </div>
              <!--            <div class="col-12">-->
              <!--              <q-input dense outlined v-model="producto.nombre" label="Nombre del producto*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required clearable counter>-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="add_shopping_cart" />-->
              <!--                </template>-->
              <!--              </q-input>-->
              <!--            </div>-->
              <!--            <div class="col-12 ">-->
              <!--              <q-input dense outlined v-model="producto.codigo" label="Código de barras" placeholder="00000000000" hint=" ">-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="qr_code_2" />-->
              <!--                </template>-->
              <!--              </q-input>-->
              <!--            </div>-->
              <!--            <div class="col-12 ">-->
              <!--              <q-input dense outlined bottom-slots v-model="producto.cantidad" label="Cantidad disponible*" :rules="ruleNumber" type="number" input-class="text-center" required placeholder="Escribe el nombre del producto">-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="remove_circle_outline"  @click="removeCantidad(producto.cantidad)"/>-->
              <!--                </template>-->
              <!--                <template v-slot:append>-->
              <!--                  <q-icon name="add_circle_outline" @click="addCantidad(producto.cantidad)"/>-->
              <!--                </template>-->
              <!--              </q-input>-->
              <!--            </div>-->
              <!--            <div class="col-12">-->
              <!--              <q-input dense outlined v-model="producto.costo" step="0.1" label="Costo unitario" hint="Valor que pagas al proveedor por el producto" clearable counter type="number" placeholder="Escribe el valor de la compra">-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="payments" />-->
              <!--                </template>-->
              <!--              </q-input>-->
              <!--            </div>-->
              <!--            <div class="col-12">-->
              <!--              <q-input dense outlined v-model="producto.precio" step="0.1" label="Precio*"  clearable counter :rules="ruleNumber" type="number" required placeholder="Escribe el valor de venta">-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="attach_money" />-->
              <!--                </template>-->
              <!--              </q-input>-->
              <!--            </div>-->
              <!--            <div class="col-12">-->
              <!--              <q-select-->
              <!--                dense-->
              <!--                outlined-->
              <!--                v-model="producto.categorias"-->
              <!--                :options="optionsCategorias"-->
              <!--                counter-->
              <!--                hint=" "-->
              <!--                label="Categoría"-->
              <!--              >-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="search" />-->
              <!--                </template>-->
              <!--                <template v-slot:option="scope">-->
              <!--                  <q-item v-bind="scope.itemProps" @click="clickCreateCategoriaProd(scope.opt)">-->
              <!--                    <q-item-section avatar v-if="scope.opt.label=='Crear una nueva categoría'">-->
              <!--                      <q-icon name="add_circle_outline" />-->
              <!--                    </q-item-section>-->
              <!--                    <q-item-section>-->
              <!--                      <q-item-label>{{ scope.opt.label }}</q-item-label>-->
              <!--                    </q-item-section>-->
              <!--                  </q-item>-->
              <!--                </template>-->
              <!--              </q-select>-->
              <!--            </div>-->

              <!--            <div class="col-12">-->
              <!--              <q-input type="textarea" dense outlined v-model="producto.descripcion" label="Descripción" hint=""  counter clearable placeholder="Agregar una Descripción">-->
              <!--                <template v-slot:prepend>-->
              <!--                  <q-icon name="description" />-->
              <!--                </template>-->
              <!--              </q-input>-->

              <!--            </div>-->

              <!--            <div class="col-12 text-center flex flex-center">-->
              <!--              <q-uploader-->
              <!--                accept=".jpg, .png"-->
              <!--                @added="uploadFile"-->
              <!--                auto-upload-->
              <!--                max-files="1"-->
              <!--                label="Ingresar imagen para su producto"-->
              <!--                flat-->
              <!--                max-file-size="2000000"-->
              <!--                @rejected="onRejected"-->
              <!--                bordered-->
              <!--              />-->
              <!--            </div>-->
              <!--            <div class="col-12">-->
              <!--              <div class="text-caption text-grey">Te recomendamos que la imagen tenga un tamaño de 500 x 500 px en formato PNG y pese máximo 2MB.</div>-->
              <!--            </div>-->
              <div class="col-6">
                <q-btn  @click="deleteProducto" label="Eliminar producto" no-caps color="red" flat   class=" text-build text-black full-width" type="button" icon="delete_outline"/>
              </div>
              <div class="col-6">
                <q-btn @click="clickUpdateProducto" label="Editar producto" no-caps color="grey" flat  class=" text-build text-black full-width" type="button" icon="o_edit"/>
              </div>
              <div class="col-12">
                <q-card flat bordered>
                  <q-card-section class="q-pa-none q-ma-none text-subtitle2 flex flex-center">
                    <q-toggle
                      @update:model-value="cambio"
                      v-model="producto.visible"
                      icon="alarm"
                      label="Mostrar producto en venta"
                      left-label
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogCreateProducto" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar producto</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="createProducto">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.nombre" label="Nombre del producto*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required clearable counter>
                  <template v-slot:prepend>
                    <q-icon name="add_shopping_cart" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="producto.codigo" label="Código de barras" placeholder="00000000000" hint=" ">
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined bottom-slots v-model="producto.cantidad" label="Cantidad disponible*" :rules="ruleNumber" type="number" input-class="text-center" required placeholder="Escribe el nombre del producto">
                  <template v-slot:prepend>
                    <q-icon name="remove_circle_outline"  @click="removeCantidad(producto.cantidad)"/>
                  </template>
                  <template v-slot:append>
                    <q-icon name="add_circle_outline" @click="addCantidad(producto.cantidad)"/>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.costo" step="0.1" label="Costo unitario" hint="Valor que pagas al proveedor por el producto" clearable counter type="number" placeholder="Escribe el valor de la compra">
                  <template v-slot:prepend>
                    <q-icon name="request_quote" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.precio" step="0.1" label="Precio*"  clearable counter :rules="ruleNumber" type="number" required placeholder="Escribe el valor de venta">
                  <template v-slot:prepend>
                    <q-icon name="o_sell" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-select
                  dense
                  outlined
                  v-model="producto.categorias"
                  :options="optionsCategorias"
                  counter
                  hint=" "
                  label="Categoría"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" @click="clickCreateCategoriaProd(scope.opt)">
                      <q-item-section avatar v-if="scope.opt.label=='Crear una nueva categoría'">
                        <q-icon name="add_circle_outline" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12">
                <q-input type="textarea" dense outlined v-model="producto.descripcion" label="Descripción" hint=""  counter clearable placeholder="Agregar una Descripción">
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>

              </div>

              <div class="col-12 text-center flex flex-center">
                <q-uploader
                  accept=".jpg, .png"
                  @added="uploadFile"
                  auto-upload
                  max-files="1"
                  label="Ingresar imagen para su producto"
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
                <q-btn label="Crear producto" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogUpdateProducto" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar producto</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="updateProducto">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.nombre" label="Nombre del producto*" hint="Porfavor ingresar nombre de la empresa" :rules="rule" required clearable counter>
                  <template v-slot:prepend>
                    <q-icon name="add_shopping_cart" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="producto.codigo" label="Código de barras" placeholder="00000000000" hint=" ">
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 ">
                <q-input dense outlined bottom-slots v-model="producto.cantidad" label="Cantidad disponible*" :rules="ruleNumber" type="number" input-class="text-center" required placeholder="Escribe el nombre del producto">
                  <template v-slot:prepend>
                    <q-icon name="remove_circle_outline"  @click="removeCantidad(producto.cantidad)"/>
                  </template>
                  <template v-slot:append>
                    <q-icon name="add_circle_outline" @click="addCantidad(producto.cantidad)"/>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.costo" step="0.1" label="Costo unitario" hint="Valor que pagas al proveedor por el producto" clearable counter type="number" placeholder="Escribe el valor de la compra">
                  <template v-slot:prepend>
                    <q-icon name="request_quote" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input dense outlined v-model="producto.precio" step="0.1" label="Precio*"  clearable counter :rules="ruleNumber" type="number" required placeholder="Escribe el valor de venta">
                  <template v-slot:prepend>
                    <q-icon name="o_sell" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-select
                  dense
                  outlined
                  v-model="producto.categorias"
                  :options="optionsCategorias"
                  counter
                  hint=" "
                  label="Categoría"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" @click="clickCreateCategoriaProd(scope.opt)">
                      <q-item-section avatar v-if="scope.opt.label=='Crear una nueva categoría'">
                        <q-icon name="add_circle_outline" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12">
                <q-input type="textarea" dense outlined v-model="producto.descripcion" label="Descripción" hint=""  counter clearable placeholder="Agregar una Descripción">
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>

              </div>

              <div class="col-12 text-center flex flex-center">
                <q-uploader
                  accept=".jpg, .png"
                  @added="uploadFile"
                  auto-upload
                  max-files="1"
                  label="Ingresar imagen para su producto"
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
    <q-dialog v-model="dialogCreateCategoria" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Crear categoría</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="createCategoria">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="categoria.nombre" label="Nombre de la categoría*" hint="Porfavor ingresar nombre de la categoría" :rules="rule" required counter clearable>
                  <template v-slot:prepend>
                    <q-icon name="category" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-py-md">
                <q-btn label="Crear categoría" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogSearchUpdateCategoria" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar categorías</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form class="full-width">
            <div class="row">
              <div class="col-12">
                <q-table :filter="filtercategoria" flat bordered hide-header hide-bottom :rows="$store.getters['login/categorias']" :columns="columnsproducto">
                  <template v-slot:top>
                    <q-input  dense outlined clearable counter hint="Buscar categoría" v-model="filtercategoria" placeholder="Buscar categorías" class="full-width">
                      <template v-slot:prepend>
                        <q-icon name="search"/>
                      </template>
                    </q-input>
                  </template>
                  <template v-slot:body-cell-opciones="props">
                    <q-td @click="clickCategoria(props.row)" :props="props" auto-width>
                      <q-icon name="arrow_forward_ios"/>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-nombre="props">
                    <q-td @click="clickCategoria(props.row)" :props="props">
                      {{ props.row.nombre }}
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogUpdateCategoria" position="right" full-height :maximized="true">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar categorías</div>
          <q-space />
          <q-btn icon="cancel" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <q-form @submit.prevent="updateCategoria">
            <div class="row">
              <div class="col-12">
                <div class="text-caption text-grey">Los campos marcados con asterisco (<span class="text-red">*</span>) son obligatorios</div>
              </div>
              <div class="col-12 ">
                <q-input dense outlined v-model="categoria.nombre" label="Nombre de la categoría*" hint="Porfavor ingresar nombre de la categoría" :rules="rule" required counter clearable>
                  <template v-slot:prepend>
                    <q-icon name="category" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-btn label="Guardar cambios" no-caps color="warning"  class=" text-build text-black full-width" type="submit"/>
              </div>
              <div class="col-12">
                <q-btn @click="deleteCategoria" :disable="productoscategoria.length!=0" label="Eliminar categoría" no-caps color="red" outline flat class=" text-build full-width " type="button" icon="delete"/>
              </div>
              <div class="col-12">
                <q-table dense flat bordered hide-bottom hide-header :columns="columnsproducto" :rows="productoscategoria" :filter="filterproductocategoria">
                  <template v-slot:top>
                    <q-input  dense outlined clearable counter hint="Buscar producto" v-model="filterproductocategoria" placeholder="Buscar productos" class="full-width">
                      <template v-slot:prepend>
                        <q-icon name="search"/>
                      </template>
                    </q-input>
                  </template>
                  <template v-slot:body-cell-nombre="props">
                    <q-td :props="props">
<!--                      {{ props.row.nombre }}-->
                      <q-item>
<!--                        <q-item-section style="border: 1px solid black">-->
                          <q-img :src="url+'../imagenes/'+props.row.foto" width="45px"/>
<!--                        </q-item-section>-->
<!--                        <q-item-section >-->
                          <q-item-section class="q-pl-xs q-ma-none" >
                            <div class="text-left text-grey">{{ props.row.nombre }}</div>
                            <div :class="props.row.cantidad<=0?'text-left text-bold text-red':' text-left text-bold'">{{ props.row.cantidad }} {{ $q.screen.lt.md?'Dis':'Disponible' }} <span class="text-black">{{ props.row.precio }} Bs</span></div>
                          </q-item-section>
<!--                        </q-item-section>-->
                      </q-item>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-opciones="props">
                    <q-td @click="deleteProductoCategoria(props.row,props.pageIndex)" :props="props" auto-width>
                      <q-icon color="red" name="o_delete" size="30px"/>
                    </q-td>
                  </template>
                </q-table>
              </div>

            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: `Inventario`,
  data(){
    return{
      filtercategoria:'',
      columnsproducto:[
        {label:'nombre',field:'nombre',name:'nombre',align:'left'},
        {label:'opciones',field:'opciones',name:'opciones'}
      ],
      filterproductocategoria:'',
      dialogSearchUpdateCategoria:false,
      dialogUpdateCategoria:false,
      dialogUpdateProducto:false,
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      ruleNumber: [
        val => (val !== null && val !== '') || 'Por favor escriba su cantidad',
        val => (val >= 0 && val < 10000) || 'Por favor escriba una cantidad real'
      ],
      dialogDetalleProducto:false,
      dialogCreateProducto:false,
      url:process.env.API,
      filterProducto:'',
      categoriaver:{
        label: 'Ver todas las categorias',
        value: '',
        icon: 'polymer'
      },
      ordenar:{label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
      optionsOrdernar:[
        {label: 'Productos más vendidos',value: 'Productos más vendidos',icon:'list'},
        {label: 'Alfabéticamente',value: 'Alfabéticamente',icon:'list'},
        {label: 'Productos más rentables',value: 'Productos más rentables',icon:'list'},
        {label: 'Últimas unidades disponibles',value: 'Últimas unidades disponibles',icon:'list'},
      ],
      producto:{},
      productos:this.$store.getters['login/productos'],
      foto:'',
      dialogCreateCategoria:false,
      categoria:{},
      productoscategoria:[],
    }
  },
  created() {
    // this.productos=this.$store.state.login.productos
    // this.$store.getters['login/productos'].forEach(p => {
    //   console.log(p)
    //   // if(producto.categoria_id==c.id){
    //   //   this.productos.push(p)
    //   // }
    // })
  },
  methods:{
    clickCategoria(c){
      // console.log(c)
      this.categoria={
        id:c.id,
        nombre:c.nombre,
        negocio_id:c.negocio_id
      }
      this.dialogSearchUpdateCategoria=false
      this.dialogUpdateCategoria=true
      this.filterproductocategoria=''
      this.productoscategoria=[]
      this.$store.getters['login/productos'].forEach(p => {
        if(p.categoria_id==c.id){
          // console.log(p)
          this.productoscategoria.push({
            cantidad:p.cantidad,
            categoria_id:p.categoria_id,
            foto:p.foto,
            id:p.id,
            negocio_id:p.negocio_id,
            nombre:p.nombre,
            precio:p.precio,
          })
        }
      })
    },
    updateCategoria(){
      this.$q.loading.show()
      // this.categoria.negocio_id=this.$store.getters["login/negocio"].id
      // console.log(this.categoria)
      this.$api.put("categoria/"+this.categoria.id,this.categoria).then(res=>{
        // console.log(res.data)
        this.dialogUpdateCategoria=false
        this.categoria={}
        this.miscategorias()
        this.$q.notify({
          message:"Cambio de categoria correctamente",
          color:'green',
          icon:'check'
        })
      })
    },
    buscarPorCategoria(filterCategoria){
      if (filterCategoria.label=="Ver todas las categorias"){
        this.productos=this.$store.getters['login/productos']
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
    buscarProducto(filterProducto){
      if(filterProducto!=null){
        const needle = filterProducto.toLowerCase()
        let productos=[]
        this.$store.getters['login/productos'].forEach(producto => {
          productos.push(producto)
        })
        let options = productos.filter(v => v.nombre.toLowerCase().indexOf(needle) > -1)
        this.productos=options
      }else{
        this.productos=this.$store.getters['login/productos']
      }
    },
    clickUpdateCategoria(){
      this.dialogSearchUpdateCategoria=true
    },
    createCategoria(){
      this.$q.loading.show()
      this.categoria.negocio_id=this.$store.getters["login/negocio"].id
      // console.log(this.categoria)
      this.$store.dispatch("login/createCategoria",this.categoria).then(res=>{
        this.dialogCreateCategoria=false
        this.categoria={}
        this.miscategorias()
        this.$q.notify({
          message:"Creado categoria correctamente",
          color:'green',
          icon:'check'
        })
      })
      //   .catch(err => {
      //   this.$q.loading.hide()
      //   // console.log(err.response.data.errors)
      //   this.$q.notify({
      //     message:err.response.data.message,
      //     color:'red',
      //     icon:'error'
      //   })
      // })
    },
    clickCreateCategoriaProd(categoria){
      this.foto=''
      if (categoria.label=='Crear una nueva categoría'){
        this.dialogCreateCategoria=true
        this.categoria={}
        this.model={
          label: 'Sin categoria',
          value: '',
          icon: 'polymer'
        }
      }
      // console.log(categoria)
    },
    clickUpdateProducto(){
      this.dialogUpdateProducto=true
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} el archivo paso las restricciones de validación`
      })
    },
    uploadFile (file) {
      // console.log(file)
      // function showDefault () {
      let dialog = this.$q.dialog({
        message: 'Subiendo... 0%',
        progress: true, // we enable default settings
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })
      // we simulate some progress here...
      let percentage = 0
      // const interval = setInterval(() => {
      //   percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))
      //
      //   // we update the dialog
      //   dialog.update({
      //     message: `Subiendo... ${percentage}%`
      //   })
      //
      //   // if we are done, we're gonna close it
      //   if (percentage === 100) {
      //     clearInterval(interval)
      //     setTimeout(() => {
      //       dialog.hide()
      //     }, 350)
      //   }
      // }, 500)
      // }
      const fd = new FormData()
      fd.append('file', file[0])
      // updateProgress(0)
      return new Promise((resolve, reject) => {
        this.$api.post('upload',
          fd,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              // console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
              percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
              dialog.update({
                message: `Subiendo... ${percentage}%`
              })
              if (percentage>=100){
                dialog.hide()
              }
              // updateProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
            }
          })
          .then(res => {
            // console.log(res.data)
            this.foto=res.data
            resolve(file)
          })
          .catch(err => reject(err))
      })
    },
    addCantidad(n){
      this.producto.cantidad=parseInt(this.producto.cantidad)+1
    },
    removeCantidad(n){
      if (n>0){
        this.producto.cantidad=parseInt(this.producto.cantidad)-1
      }
    },
    updateProducto(){
      if (this.foto!=''){
        this.producto.foto=this.foto
      }

      this.$q.loading.show()
      this.producto.categoria_id=this.producto.categorias.id
      if (this.producto.categoria_id==''){
        this.producto.categoria_id=null
      }
      this.producto.categoria= {
        id:this.producto.categorias.id,
        label:this.producto.categorias.label,
        value:this.producto.categorias.label
      }
      this.$store.dispatch("login/updateProducto",this.producto).then(res=>{
        this.dialogUpdateProducto=false
        this.misproductos()
        this.$q.notify({
          message:"Modificado producto correctamente",
          color:'green',
          icon:'check'
        })
      }).catch(err => {
        this.$q.loading.hide();
        // console.log(err.response.data.errors)
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    createProducto(){
      this.producto.categoria_id=this.producto.categorias.id
      this.producto.negocio_id=this.$store.getters["login/negocio"].id
      if (this.foto!=''){
        this.producto.foto=this.foto
      }
      if (this.producto.categoria_id==''){
        this.producto.categoria_id=null
      }
      this.$q.loading.show()
      this.$store.dispatch("login/createProducto",this.producto).then(res=>{
        this.dialogCreateProducto=false
        this.misproductos()
        this.$q.notify({
          message:"Creado producto correctamente",
          color:'green',
          icon:'check'
        })
      }).catch(err => {
        this.$q.loading.hide();
        // console.log(err.response.data.errors)
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
      // console.log(this.producto)
    },
    clickCreateProducto(){
      this.foto=''
      // console.log(this.producto.categorias)
      this.dialogCreateProducto=true
      this.producto={
        foto:'default.png',
        cantidad:0,
        categorias:{
          label: 'Sin categoria',
          value: '',
          icon: 'polymer'
        }
      }
    },
    deleteCategoria(){
      this.$q.dialog({
        message:"¿Seguro de eliminar  categoría?",
        title:"Eliminar categoría",
        ok:{
          push:true
        },
        cancel:{
          push:true,
          color:'negative'
        }
      }).onOk(()=>{
        this.$q.loading.show()
        // p.categoria_id=null
        this.$api.delete('categoria/'+this.categoria.id).then(res=>{
          // console.log(res.data)
          this.dialogUpdateCategoria=false
          // this.productoscategoria.splice(c,1)
          this.miscategorias()
          // this.productoscategoria=[]
          // this.$store.getters['login/productos'].forEach(producto => {
          //   if(producto.categoria_id==c.id){
          //     this.productoscategoria.push(producto)
          //   }
          // })
          // this.productoscategoria=[]
          // this.$store.getters['login/productos'].forEach(producto => {
          //   if(producto.categoria_id==c.id){
          //     this.productoscategoria.push(producto)
          //   }
          // })
          // this.dialogDetalleProducto=false
          // this.misproductos()
        })
      })
    },
    deleteProductoCategoria(p,c){
      // console.log(c)
      // return false
      this.$q.dialog({
        message:"¿Seguro de eliminar de la categoría?",
        title:"Eliminar de la categoría",
        ok:{
          push:true
        },
        cancel:{
          push:true,
          color:'negative'
        }
      }).onOk(()=>{
        this.$q.loading.show()
        p.categoria_id=null
        this.$api.put('producto/'+p.id,p).then(res=>{

          this.productoscategoria.splice(c,1)
          this.misproductos()
          // this.productoscategoria=[]
          // this.$store.getters['login/productos'].forEach(producto => {
          //   if(producto.categoria_id==c.id){
          //     this.productoscategoria.push(producto)
          //   }
          // })
          // this.productoscategoria=[]
          // this.$store.getters['login/productos'].forEach(producto => {
          //   if(producto.categoria_id==c.id){
          //     this.productoscategoria.push(producto)
          //   }
          // })
          // this.dialogDetalleProducto=false
          // this.misproductos()
        })
      })
    },
    deleteProducto(){
      this.$q.dialog({
        message:"¿Seguro de eliminar?",
        title:"Eliminar",
        ok:{
          push:true
        },
        cancel:{
          push:true,
          color:'negative'
        }
      }).onOk(()=>{
        this.$q.loading.show()
        this.$api.delete('producto/'+this.producto.id).then(res=>{
          this.dialogDetalleProducto=false
          this.misproductos()
        })
      })
    },
    miscategorias(){
      this.$store.dispatch('login/categorias').then((res) =>{
        this.$q.loading.hide()
      }).catch(err => {
        this.$q.loading.hide();
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    misproductos(){
      this.$store.dispatch('login/productos').then((res) =>{
        this.$q.loading.hide()
      }).catch(err => {
        this.$q.loading.hide();
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    cambio(e){
      this.$api.put('producto/'+this.producto.id,{
        visible:e?'1':'0'
      }).then(res=>{
        // console.log(res.data)
        this.misproductos()
      })
    },
    clickDetalleProducto(producto){
      // console.log(producto)
      this.producto={
        cantidad: producto.cantidad,
        categoria_id: producto.categoria_id,
        codigo:producto.codigo,
        costo: producto.costo,
        descripcion: producto.descripcion,
        foto: producto.foto,
        id: producto.id,
        negocio_id: producto.negocio_id,
        nombre: producto.nombre,
        precio: producto.precio,
        visible: producto.visible=="1"?true:false,
      }
      // console.log(this.producto.categoria_id)
      // return false
      let cat=this.$store.getters["login/categorias"].find(c=>c.id===this.producto.categoria_id)
      // console.log(cat)
      // return false

      // console.log(categoria)
      // return false
      if (cat==undefined){
        // console.log('aa')
        this.producto.categorias= {
          label: 'Sin categoria',
          value: 'Sin categoria',
          icon: 'list',
          id:0
        }
        this.producto.categoria= {
          id:0,
          label:'Sin categoria',
          value:'Sin categoria'
        }
      }else{
        let categoria={
          id:cat.id,
          label:cat.label,
          nagocio_id:cat.negocio_id,
          nombre:cat.nombre,
        }
        categoria.label=categoria.nombre
        this.producto.categoria=categoria
        this.producto.categorias={
          label: categoria.nombre,
          value: categoria.nombre,
          icon: 'list',
          id:categoria.id
        }
      }
      this.foto=''
      this.dialogDetalleProducto=true
    }
  },
  computed:{
    optionsCategorias(){
      let cat=[{
        label: 'Sin categoria',
        value: 'Sin categoria',
        icon: 'list',
        id:0
      }]
      this.$store.getters["login/categorias"].forEach(c=>{
        cat.push({
          label: c.nombre,
          value: c.nombre,
          icon: 'list',
          id:c.id
        })
      })
      cat.push({
        label: 'Crear una nueva categoría',
        value: 'Crear una nueva categoría',
        icon: 'list'
      })
      return cat
    },
    optionsCategoriasVer(){
      let cat=[{
        label: 'Ver todas las categorias',
        value: '',
        icon: 'polymer'
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
    costototal(){
      let ct=0
      this.$store.getters["login/productos"].forEach(p=>{
        if (p.cantidad>0){
          ct=ct+ parseFloat(p.precio) * parseFloat(p.cantidad)
        }
      })
      return ct.toFixed(2)
    }
  }
}
</script>

<style scoped>
</style>
