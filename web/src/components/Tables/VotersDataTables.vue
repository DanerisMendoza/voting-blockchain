<template>
    <v-data-table :headers="headers" :items="GET_VOTERS" :items-per-page="5">
        <template v-slot:[`item.image`]="{ item }">
            <v-img :src="item.base64img" width="75px">
            </v-img>
        </template>
    </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            headers: [
                { text: "Voter", align: "start", sortable: false, value: "image" },
                { text: "Name", align: "left", sortable: false, value: "candidate_name" },
                { text: "Gender", align: "left", sortable: false, value: "gender" },
            ]
        }
    },
    methods: {
    },

    mounted() {
        this.$store.dispatch("GetAllVoters");
    },

    computed: {
        ...mapGetters([
            'GET_VOTERS'
        ])
    }

}
</script>