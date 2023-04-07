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
                            <q-btn
                                @click="onLoadData()"
                                flat
                                round
                                color="primary"
                                icon="refresh"
                            />
                        </div>
                    </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-pa-xl">
                    <div class="row justify-between">
                        <div class="qa">
                            <q-input
                                debounce="500"
                                clearable
                                clear-icon="close"
                                filled
                                v-model="filterInput"
                                label="Filter"
                            >
                            </q-input>
                        </div>
                        <div class="qa">
                            <q-btn flat round color="green" icon="add" />
                        </div>
                    </div>

                    <div class="q-mt-md full-width">
                        <q-table
                            :filter="filterInput"
                            flat
                            :grid="$q.screen.sm"
                            :bordered="$q.screen.sm"
                            :rows="rows"
                            :columns="columns"
                            row-key="id"
                            v-model:pagination="pagination"
                            :loading="loading"
                        >
                            <template v-slot:loading>
                                <q-inner-loading showing color="primary" />
                            </template>

                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <q-td
                                        v-for="col in columns.slice(0, columns.length - 2)"
                                        :key="col.name"
                                        :props="props"
                                    >
                                        {{ props.row[col.name] }}
                                    </q-td>
                                    <q-td key="balance" :props="props">
                                        {{ $filters.toBRL(props.row.wallet.balance) }}
                                    </q-td>
                                    <q-td key="actions" :props="props">
                                        <q-btn flat round color="primary" icon="edit" />
                                        <q-btn flat round color="grey-4" icon="description" />
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios"
import { QTableColumn } from "quasar"
import { defineComponent } from "vue"
import { IRegistryOfficeResponse } from "./interfaces/response.interface"
import RegistryOfficeService from "./services/registry-offices.service"

export default defineComponent({
    name: "RegistryOfficePage",
    created() {
        this.onLoadData()
    },
    data() {
        const rows: IRegistryOfficeResponse[] = []
        const columns: QTableColumn[] = [
            {
                name: "id",
                label: "#",
                field: "id",
                align: "left",
                sortable: true,
            },
            {
                name: "name",
                label: "Name",
                field: "name",
                align: "left",
                sortable: true,
            },
            {
                name: "county",
                label: "County",
                field: "county",
                align: "left",
                sortable: true,
            },
            {
                name: "city",
                label: "City",
                field: "city",
                align: "left",
                sortable: true,
            },
            {
                name: "region",
                label: "Region",
                field: "region",
                align: "left",
                sortable: true,
            },
            {
                name: "balance",
                label: "Balance (R$)",
                field: "balance",
                align: "left",
                sort: (a, b) => parseFloat(a) - parseFloat(b),
                sortable: true,
            },
            {
                name: "actions",
                label: "Actions",
                field: "action",
                align: "right",
            },
        ]
        const pagination = {
            rowsPerPage: 0,
        }
        const loading = true

        return {
            filterInput: "",
            rows,
            columns,
            pagination,
            loading,
            screen,
        }
    },
    methods: {
        onLoadData() {
            this.loading = true

            RegistryOfficeService.getInstance()
                .get()
                .then((response: AxiosResponse<IRegistryOfficeResponse[]>) => {
                    this.rows = response.data
                    this.loading = false
                })
        },
    },
})
</script>
