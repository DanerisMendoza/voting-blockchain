<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
            <v-container>
                <v-card tile>
                    <v-card-title>
                        Registered Party Lists
                        <v-spacer></v-spacer>
                        <v-btn tile x-small color="primary" @click="addPL">Add PartyList</v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <PartyListTable />
                        <PartyListDialog />
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import PartyListDialog from "@/components/Dialogs/PartyListDialog.vue";
import PartyListTable from "@/components/Tables/PartyListDataTables.vue";
import AdminNav from "@/components/Navbars/AdminNav.vue";
export default {
    data() {
        return {
        }
    },
    methods: {
        addPL() {
            this.$store.commit('SET_PL_DIALOG_VALUE', true);
            this.$store.commit('SET_PL_DIALOG_MODE', 'Add');
        },
    },
    components: {
        AdminNav,
        PartyListTable,
        PartyListDialog
    }
}
</script>