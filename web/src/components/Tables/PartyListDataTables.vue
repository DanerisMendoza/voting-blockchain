<template>
    <v-data-table :items="GET_PARTY_LISTS" :headers="headers">
        <template v-slot:[`item.action`]="{ item }">
            <v-btn color="warning" icon small dense>
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn color="primary" icon small dense>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="red" icon small dense>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            headers: [
                { text: "Party List Name", align: "start", sortable: false, value: "name" },
                { text: "Actions", align: "center", sortable: false, value: "action" }
            ]
        }
    },
    methods: {
    },
    computed: {
        ...mapGetters([
            'GET_PARTY_LISTS'
        ])
    },
    mounted() {
        this.$store.dispatch("GetPartyList");
    },
}
</script>