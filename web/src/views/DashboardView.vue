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
                    <v-card-text v-if="GET_EL_STATUS == 'finished'">

                    </v-card-text>
                    <v-card-text v-else>
                        <p>Election Status: <strong style="text-transform: uppercase;">{{ GET_EL_STATUS }}</strong></p>
                        <div>
                            <p>Filing Start: <strong>{{ formattedDate(GET_ELECTION.start_filing_date) }}</strong></p>
                            <p>Filing End: <strong>{{ formattedDate(GET_ELECTION.end_filing_date) }}</strong></p>
                            <p>Election Start: <strong>{{ formattedDate(GET_ELECTION.start_voting_date) }}</strong></p>
                            <p>Election End: <strong>{{ formattedDate(GET_ELECTION.end_voting_date) }}</strong></p>
                        </div>
                    </v-card-text>
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
import moment from "moment";
export default {
    data() {
        return {
        }
    },
    methods: {
        async main() {
            await this.$store.dispatch("GetElectionStatus");
            await this.$store.dispatch("IsVoted");
            await this.$store.dispatch("GetActiveElection");
        },
        formattedDate(data) {
            return moment(data).format("MMMM D, YYYY - hh:mm A");
        },
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
            'GET_SCHED_DIALOG',
            'GET_EL_STATUS',
            'GET_ELECTION'
        ])
    },
    mounted() {
        this.main();
    }
}
</script>