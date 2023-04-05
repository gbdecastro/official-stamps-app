<template>
  <div class="row">
    <div class="col-12">
      <q-card bordered>
        <q-card-section>
          <div class="row justify-between">
              <div class="row items-center">
                  <q-icon color="grey" size="md" name="apartment"></q-icon>
                  <div class="text-h6">Registry Offices</div>
              </div>
              <div class="row items-center">
                <q-btn round icon="refresh" />
              </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pa-xl">
          <div class="row">
            <q-form @submit="onSubmit">
              <q-input filled v-model="filterInput" label="Filter" ></q-input>
            </q-form>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>

</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'RegistryOfficePage',
  setup() {
    const $q = useQuasar()

    const filterInput = ref(null)

return {
      filterInput,

      onSubmit () {
        if (filterInput.value !== null) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        filterInput.value = null
      }
    }
  }
})
</script>
