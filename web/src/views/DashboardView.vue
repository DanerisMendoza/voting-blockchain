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
                        <v-row>
                            <v-col v-for="(position, index) in votesByPositionArray" :key="index" class="chart-container">
                                <v-card>
                                    <apexchart :type="'bar'" :options="getChartOptions(position)"
                                        :series="getChartSeries(position)" />
                                </v-card>
                                <br>
                            </v-col>
                        </v-row>
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
import Web3 from 'web3';
import VotingContract from "../../../blockchain/build/contracts/VotingSystem.json";
export default {
    data() {
        return {
            web3: null,
            contract: null,
            votesByPositionArray: [],
        }
    },
    methods: {
        async main() {
            await this.$store.dispatch("IsVoted");
            try {
                let date1 = null;
                let date2 = null;

                this.$store.dispatch('GetElectionStatus')

                await this.$store.dispatch('GetActiveElection').then(() => {
                    date1 = moment(this.GET_ELECTION.start_voting_date).format('X');
                    date2 = moment(this.GET_ELECTION.end_voting_date).format('X');
                });

                // Format date1 and date2 before filtering
                const formattedDate1 = moment(date1 * 1000).format('YYYY-MM-DD HH:mm:ss');
                const formattedDate2 = moment(date2 * 1000).format('YYYY-MM-DD HH:mm:ss');

                this.web3 = new Web3(window.ethereum);
                this.contract = new this.web3.eth.Contract(
                    VotingContract.abi,
                    VotingContract.networks['5777'].address
                );

                const votes = await this.contract.methods.getAllVotes().call();

                // Filter votes based on the formatted date range
                const filteredVotes = votes.filter((vote) => {
                    const voteDate = moment(parseInt(vote.date, 10) * 1000);
                    return voteDate.isBetween(formattedDate1, formattedDate2, null, '[]');
                });

                const votesByPosition = filteredVotes.reduce((acc, vote) => {
                    const positionID = parseInt(vote.positionID, 10);

                    if (!acc[positionID]) {
                        acc[positionID] = {
                            positionName: vote.positionName,
                            candidates: {},
                        };
                    }

                    if (!acc[positionID].candidates[vote.candidateID]) {
                        const dateBigInt = BigInt(vote.date);
                        const dateNumber = Number(dateBigInt);
                        const dateMilliseconds = dateNumber * 1000;
                        const formattedDate = moment(dateMilliseconds).format("MMMM D, YYYY - hh:mm A");

                        acc[positionID].candidates[vote.candidateID] = {
                            candidateName: vote.candidateName,
                            voteCount: 0,
                            voteID: parseInt(vote.voteID, 10),
                            voterAddress: vote.voterAddress,
                            voterID: parseInt(vote.voterID, 10),
                            voterName: vote.voterName,
                            date: formattedDate,
                        };
                    }

                    acc[positionID].candidates[vote.candidateID].voteCount++;
                    return acc;
                }, {});

                this.votesByPositionArray = Object.values(votesByPosition);
                console.log(this.votesByPositionArray);

            } catch (error) {
                console.error('Error in main:', error.message);
            }
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
        getChartOptions(position) {
            const placeholderLabels = Array.from({ length: Object.keys(position.candidates).length }, (_, i) => ``);
            return {
                chart: {
                    type: 'column',
                },
                xaxis: {
                    categories: placeholderLabels,
                },
                title: {
                    text: `Votes for ${position.positionName}`,
                },
                legend: {
                    show: true,
                    showForSingleSeries: true,
                },
            };
        },
        getChartSeries(position) {
            let a = Object.values(position.candidates).map(candidate => ({
                name: candidate.candidateName,
                data: [candidate.voteCount],
            }));
            return a
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

<style scoped>
.chart-container {
    width: 400px;
    /* Adjust the width as needed */
    height: 300px;
    /* Adjust the height as needed */
}
</style>