<template>
    <v-data-table :items="GET_CANDIDATES" :headers="headers" :items-per-page="5">
        <template v-slot:[`item.image`]="{ item }">
            <v-img width="75px" :src="item.base64img">
            </v-img>
        </template>
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
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            headers: [
                { text: "Candidate", align: "start", sortable: false, value: "image" },
                { text: "Candidate Name", align: "center", sortable: false, value: "candidate_name" },
                { text: "Gender", align: "center", sortable: false, value: "gender" },
                { text: "Position Title", align: "center", sortable: false, value: "position_name" },
                { text: "Party List Name", align: "center", sortable: false, value: "party_list" },
                // { text: "Actions", align: "center", sortable: false, value: "action" }
            ]
        }
    },
    methods: {
    },
    computed: {
        ...mapGetters([
            'GET_CANDIDATES'
        ])
    },

    components: {

    },

    mounted() {
        this.$store.dispatch('GetAllCandidates');
    }
}
</script>