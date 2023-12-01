<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10">
            <v-card tile>
                <v-card-title>
                    <v-btn tile small color="primary" @click="addDialog">Add Position</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <PositionsTable />
                    <PositionsDialogVue />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import AdminNav from "@/components/Navbars/AdminNav.vue"
import PositionsTable from "@/components/Tables/PositionsDataTables.vue";
import PositionsDialogVue from "@/components/Dialogs/PositionsDialog.vue";
export default {
    data() {
        return {
        }
    },
    methods: {
        addDialog() {
            this.$store.commit('SET_POSITION_DIALOG_VALUE', true);
            this.$store.commit('SET_POSITION_DIALOG_MODE', "Add");
        },
    },
    components: {
        AdminNav,
        PositionsTable,
        PositionsDialogVue
    }
}
</script>