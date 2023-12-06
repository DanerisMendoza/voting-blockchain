<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10">
            <v-container>
                <v-card tile>
                    <v-card-title>
                        Voting Dashboard
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="openVDialog" tile small>Set Voting Schedules</v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text></v-card-text>
                </v-card>
                <ScheduleDialogVue />
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import ScheduleDialogVue from "@/components/Dialogs/ScheduleDialog.vue";
import { mapGetters } from "vuex";
import AdminNav from "@/components/Navbars/AdminNav.vue"
export default {
    data() {
        return {
        }
    },
    methods: {
        openFDialog() {
            this.$store.commit("SET_FILE_DIALOG", true);
        },
        openVDialog() {
            this.$store.commit("SET_SCHED_DIALOG", true);
        },
    },
    components: {
        AdminNav,
        ScheduleDialogVue,
    },
    computed: {
        ...mapGetters([
            'GET_SCHED_DIALOG'
        ])
    }
}
</script>