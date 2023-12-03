<template>
    <v-data-table :headers="headers" :items="GET_POSITIONS">
        <template v-slot:[`item.action`]="{ item }">
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
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            headers: [
                { text: "Position Title", align: "start", sortable: false, value: "name" },
                { text: "Actions", align: "center", sortable: false, value: "action" }
            ]
        }
    },
    methods: {
    },

    mounted() {
        this.$store.dispatch("GetPositions");
    },

    computed: {
        ...mapGetters([
            'GET_POSITIONS'
        ])
    }

}
</script>