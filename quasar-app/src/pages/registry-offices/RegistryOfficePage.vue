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
              <q-btn color="primary" round icon="refresh" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pa-xl">
          <div class="row">
            <q-input
              debounce="1500"
              clearable
              clear-icon="close"
              filled
              v-model="filterInput"
              label="Filter"
            >
            </q-input>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'RegistryOfficePage',
  data() {
    return {
      filterInput: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.filterInput !== '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
      }
    },
  },
});
</script>
