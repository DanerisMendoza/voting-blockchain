<template>
    <v-data-table :items="GET_PARTY_LISTS" :headers="headers">
        <template v-slot:[`item.action`]="{ item }">
            <v-btn color="warning" icon small dense @click="viewPL(item.id, 'View')">
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn color="primary" icon small dense @click="checkupdate(item.id, 'Update')">
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
        viewPL(id, action) {
            this.$store.commit('SET_PL_DIALOG_VALUE', true);
            this.$store.commit('SET_PL_DIALOG_MODE', action);
            this.$store.dispatch('GetPositions');
            var payload = {
                id: id
            }
            this.$store.dispatch('ViewPartyList', payload);
        },
        checkupdate(id, action) {
            this.$store.commit('SET_PL_DIALOG_VALUE', true);
            this.$store.commit('SET_PL_DIALOG_MODE', action);
        }
    },
    computed: {
        ...mapGetters([
            'GET_PARTY_LISTS',
            'GET_POSITIONS'
        ])
    },
    mounted() {
        this.$store.dispatch("GetPartyList");
    },
}
</script>