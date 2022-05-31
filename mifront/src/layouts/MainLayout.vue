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
            <q-item clickable v-close-popup>
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
      <div  class="full-height">
        <q-list  class="full-width">
          <q-item >
            <q-img src="/logo.png" spinner-color="white" style="height: 28px; max-width: 30px" />
            <q-item-section class="text-center text-bold">Mi Ganancia.com</q-item-section>
          </q-item>
          <q-item class="">
            <q-item-section>
              <div > <b>Bienvenido: </b> {{$store.getters["login/user"].name}}
              </div>
            </q-item-section>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-section>
              <!--              <pre>{{$store.getters["login/negocio"]}}</pre>-->
              <!--            <q-card class="q-pa-none bg-grey-3"  v-for="n in $store.getters['login/negocios'] " :key="n.id">-->
              <!--              <q-card-section horizontal>-->
              <!--                <q-card-section >-->
              <!--                  <q-img :src="url+'../imagenes/'+n.foto" class="q-pa-lg" style="border:0px solid black;height: 50px; max-width: 50px;border-radius: 25px"/>-->
              <!--                </q-card-section>-->
              <!--                <q-card-section>-->
              <!--                  <q-card-section class="q-pa-none q-ma-none" horizontal>-->
              <!--                    <q-card-section class="q-pa-none q-ma-none">-->
              <!--                      <q-item-label>{{n.nombre}}</q-item-label>-->
              <!--                      <q-item-label caption>{{n.tipo}}</q-item-label>-->
              <!--                    </q-card-section>-->
              <!--                    <q-card-section class="q-pa-none q-ma-none"> <q-icon name="expand_more" /> </q-card-section>-->
              <!--                  </q-card-section>-->
              <!--                </q-card-section>-->
              <!--              </q-card-section>-->
              <!--              <q-separator/>-->
              <!--              <q-card-section class="q-pa-xs">-->
              <!--                <div class="flex flex-center" @click="clickUpdateNegocio(n)"> <q-icon name="edit" class="q-pr-xs" /> <div class="text-bold"> Editar negocio</div></div>-->
              <!--                <div class="flex flex-center" @click="clickCreateNegocio(n)"> <q-icon name="add_circle" class="q-pr-xs" />  <div class="text-bold"> Agregar otro negocio</div></div>-->
              <!--              </q-card-section>-->
              <!--            </q-card>-->
              <q-card class="q-pa-none bg-grey-3" v-if="$store.getters['login/negocio'].foto!=undefined">
                <q-card-section horizontal>
                  <q-card-section >
                    <q-img :src="url+'../imagenes/'+$store.getters['login/negocio'].foto" class="q-pa-lg" style="border:0px solid black;height: 50px; max-width: 50px;border-radius: 25px"/>
                  </q-card-section>
                  <q-card-section>
                    <q-card-section class="q-pa-none q-ma-none" horizontal>
                      <q-card-section class="q-pa-none q-ma-none">
                        <q-item-label>{{$store.getters["login/negocio"].nombre}}</q-item-label>
                        <q-item-label caption>{{$store.getters["login/negocio"].tipo}}</q-item-label>
                      </q-card-section>
                      <q-card-section @click="dialogcambioempresa=true" class="q-pa-none q-ma-none flex flex-center">
                        <q-icon name="o_arrow_drop_down_circle" size="lg" />
                      </q-card-section>
                    </q-card-section>
                  </q-card-section>
                </q-card-section>
                <q-separator/>
                <q-card-section class="q-pa-xs">
                  <div class="flex flex-center" @click="clickUpdateNegocio($store.getters['login/negocio'])"> <q-icon name="edit" class="q-pr-xs" /> <div class="text-bold"> Editar negocio</div></div>
                  <div class="flex flex-center" @click="clickCreateNegocio($store.getters['login/negocio'])"> <q-icon name="add_circle" class="q-pr-xs" />  <div class="text-bold"> Agregar otro negocio</div></div>
                </q-card-section>
              </q-card>
            </q-item-section>
          </q-item>
          <q-item active-class="active" style="font-weight: bold" exact to="home" clickable v-if="$store.getters['login/isLoggedIn']">
            <q-item-section avatar>
              <q-icon name="balance" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Balance</q-item-label>
            </q-item-section>
          </q-item>
          <q-item active-class="active" style="font-weight: bold" exact to="inventario" clickable v-if="$store.getters['login/isLoggedIn']">
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
          <q-item active-class="active" style="font-weight: bold" exact to="deudas" clickable v-if="$store.getters['login/isLoggedIn']">
            <q-item-section avatar>
              <q-icon name="pending_actions" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Deudas</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div style="position: absolute;bottom: 0px" class="full-width">
          <q-list  >
            <q-item class="full-width text-grey" clickable v-if="$store.getters['login/isLoggedIn']">
              <q-item-section avatar>
                <q-icon name="help_outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>¿Necesitas contactar a soporte? ¡Hazlo aquí!</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="full-width text-grey" clickable v-if="$store.getters['login/isLoggedIn']">
              <q-item-section avatar>
                <q-icon name="subject" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Términos y condiciones y Política de privacidad</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="full-width text-red" clickable @click="logout" v-if="$store.getters['login/isLoggedIn']">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cerrar sesión</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>



      </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
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
            <q-item class="q-pa-none bg-grey-3"  v-for="n in $store.getters['login/negocios'] " :key="n.id" clickable @click="cambionegocio(n)">
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
                        <q-icon v-if="n.id==$store.getters['login/negocio'].id" name="check_circle" size="xs" color="positive" />
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
                  <!--                  <template v-slot:hint>-->
                  <!--                    Field hint-->
                  <!--                  </template>-->
                </q-input>
                <!--                <q-input dense outlined v-model="producto.cantidad" label="Cantidad disponible*" hint="" >-->
                <!--                  <template v-slot:prepend>-->
                <!--                    <q-icon name="share_location" />-->
                <!--                  </template>-->
                <!--                </q-input>-->
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
                <!--                <pre>{{producto}}</pre>-->
                <!--                <pre>{{optionsCategorias}}</pre>-->
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
                  <!--                  <template v-slot:selected>-->
                  <!--                    Company:-->
                  <!--                    <q-chip-->
                  <!--                      v-if="model"-->
                  <!--                      dense-->
                  <!--                      square-->
                  <!--                      color="white"-->
                  <!--                      text-color="primary"-->
                  <!--                      class="q-my-none q-ml-xs q-mr-none"-->
                  <!--                    >-->
                  <!--                      <q-avatar color="primary" text-color="white" :icon="model.icon" />-->
                  <!--                      {{ model.label }}-->
                  <!--                    </q-chip>-->
                  <!--                    <q-badge v-else>*none*</q-badge>-->
                  <!--                  </template>-->
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" @click="clickCreateCategoriaProd(scope.opt)">
                      <q-item-section avatar v-if="scope.opt.label=='Crear una nueva categoría'">
                        <q-icon name="add_circle_outline" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                        <!--                        <q-item-label caption>{{ scope.opt.description }}</q-item-label>-->
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

  </q-layout>
</template>

<script>
export  default({
  data(){
    return{
      dialogCreateProducto:false,
      dialogCreateCategoria:false,
      dialogcambioempresa:false,
      negocio:{},
      rule:[
        val => (val && val.length > 0) || 'Por favor escriba algo'
      ],
      ruleNumber: [
        val => (val !== null && val !== '') || 'Por favor escriba su cantidad',
        val => (val >= 0 && val < 10000) || 'Por favor escriba una cantidad real'
      ],
      isPwd:true,
      dialognegocio:false,
      dialogcreatenegocio:false,
      user:{},
      foto:'',
      model:{},
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
      url:process.env.API,
      leftDrawerOpen:false,
      categoria:{},
      producto:{}
    }
  },
  created() {
  },
  computed:{
    title(){
      if (this.$route.fullPath=='/home') return "Balance"
      else if (this.$route.fullPath=='/inventario') return "Inventario"
      else if (this.$route.fullPath=='/deudas') return "Deudas"
      else if (this.$route.fullPath=='/') return "Mi Ganancia.com"
      return "";
    },
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
    }
  },
  mounted() {
  },
  methods:{
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
    },
    addCantidad(n){
      this.producto.cantidad=parseInt(this.producto.cantidad)+1
    },
    removeCantidad(n){
      if (n>0){
        this.producto.cantidad=parseInt(this.producto.cantidad)-1
      }
    },
    clickCreateProducto(){
      this.foto=''
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
    createCategoria(){
      this.$q.loading.show()
      this.categoria.negocio_id=this.$store.getters["login/negocio"].id
      this.$store.dispatch("login/createCategoria",this.categoria).then(res=>{
        this.dialogCreateCategoria=false
        this.categoria={}
        this.miscategorias()
        this.$q.notify({
          message:"Creado categoria correctamente",
          color:'green',
          icon:'check'
        })
      }).catch(err => {
        this.$q.loading.hide()
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
    },
    clickCreateCategoria(){
      this.foto=''
      this.dialogCreateCategoria=true
      this.categoria={}
    },
    cambionegocio(n){
      this.$q.loading.show()
      this.$store.dispatch("login/updateUser",{
        id:this.$store.getters["login/user"].id,
        minegocio:n.id
      }).then(res=>{
        this.$store.dispatch('login/negocios', this.$store.getters["login/user"].id).then((res) =>{
          this.miscategorias()
          this.misproductos()
          this.dialogcambioempresa=false
        }).catch(err => {
          this.$q.loading.hide();
          this.$q.notify({
            message:err.response.data.message,
            color:'red',
            icon:'error'
          })
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
        this.$q.notify({
          message:err.response.data.message,
          color:'red',
          icon:'error'
        })
      })
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
      this.negocio.user_id=this.$store.getters["login/user"].id
      this.$api.post('negocio',this.negocio).then(res=>{
        this.misnegocios()
        this.miscategorias()
        this.misproductos()
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
    async clickUpdateNegocio(n) {
      this.foto=''
      this.negocio = {
        id:n.id,
        nombre:n.nombre,
        foto:n.foto,
        direccion:n.direccion,
        ciudad:n.ciudad,
      };
      let ne = await this.options.find(r => r.label === n.tipo)
      this.negocio.tipos = ne
      this.dialognegocio = true
    },
    async clickCreateNegocio(n) {
      this.foto=''
      this.negocio = {
        nombre:'',
        foto:'default.png',
        direccion:'',
        ciudad:'',
      };
      this.dialogcreatenegocio = true
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} el archivo paso las restricciones de validación`
      })
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
    misnegocios(){
      this.$store.dispatch('login/negocios').then((res) =>{
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
    updateNegocio(){
      this.$q.loading.show()
      if (this.foto==''||this.foto==null||this.foto=="default.png"){
        this.negocio.foto=this.negocio.foto
      }else{
        this.negocio.foto=this.foto
      }
      this.negocio.tipo=this.negocio.tipos.label
      this.$api.put('negocio/'+this.negocio.id,this.negocio).then(res=>{
        this.misnegocios()
        this.miscategorias()
        this.misproductos()
        this.dialognegocio=false
        this.$q.notify({
          message:'Editado correctamente',
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
        this.$store.dispatch('login/logout')
          .then(() => {
            this.$q.loading.hide()
            this.$router.push('/')
          })
      })
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen= !this.leftDrawerOpen
    }
  }
})
</script>
<style scoped>
.active{
  background: rgb(255,238,179);
  font-weight: bold;
  color: #2d3748;
  border-left: 5px solid #FECB18;
}
</style>
