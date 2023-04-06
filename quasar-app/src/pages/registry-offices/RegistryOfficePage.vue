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
                    <div class="row justify-between">
                        <div class="qa">
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
                        <div class="qa">
                            <q-btn round color="green" icon="add" />
                        </div>
                    </div>

                    <div class="q-pa-md">
                        <q-table
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
                                        {{ toCurrency(props.row.wallet.balance) }}
                                    </q-td>
                                    <q-td key="actions" :props="props"> Actions </q-td>
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
import { QTableColumn } from "quasar"
import { defineComponent } from "vue"
import { IRegistryOfficeResponse } from "./interfaces/response.interface"

export default defineComponent({
    name: "RegistryOfficePage",
    created() {
        this.onData()
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
        onData() {
            this.$api.get("/registry-offices").then((response) => {
                this.rows = response.data.data
                this.loading = false
            })
        },
        toCurrency(value: string): string {
            const format = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 3,
            })

            return format.format(parseFloat(value))
        },
    },
})
</script>
