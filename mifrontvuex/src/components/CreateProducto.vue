<template>
  <div>

    <div class="text-subtitle2">{{outlined}}</div>
        <q-dialog v-model="midialog">
          <q-card>
            <q-card-section>
              <q-item>
                <q-item-section>Producto</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-dialog>
  </div>
<!--  <q-dialog v-model="outlined">-->

<!--  </q-dialog>-->
<!--  <q-input-->
<!--    v-bind="$attrs"-->
<!--    :outlined="outlined"-->
<!--    :dense="dense"-->
<!--  />-->
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    outlined: {
      type: Boolean,
      default: true
    },
  },
  computed:{
    midialog(){
      return this.outlined;
    }
  }
}
</script>
