<template>
    <v-app>
        <!-- ELECTION IS FINISH -->
        <div v-if="!IS_ELECTION && isVotingFinish">
            <div v-for="(position, index) in votesByPositionArray" :key="index">
                <v-card>
                    <apexchart :type="'bar'" :options="getChartOptions(position)" :series="getChartSeries(position)" />
                </v-card>
                <br>
            </div>
        </div>
        <!-- NOT YET ELECTION -->
        <v-card v-else-if="!IS_ELECTION && !isVotingFinish" class="pl-2 pt-2">
            <p>No election is currently active.</p>
            <p>Start of Filing: <strong>{{ date1 }}</strong></p>
            <p>End of Filing: <strong>{{ date2 }}</strong></p>
            <p>Start of Election: <strong>{{ date3 }}</strong></p>
            <p>End of Election: <strong>{{ date4 }}</strong></p>
        </v-card>
        <!-- VOTING IN PROGRESS -->
        <v-card v-else class="pl-2 pt-2">
            <p>Voting in Progress</p>
        </v-card>
    </v-app>
</template>

  
<script>
import Web3 from 'web3';
import VotingContract from '../../../../blockchain/build/contracts/VotingSystem.json';
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
    data() {
        return {
            web3: null,
            contract: null,
            votesByPositionArray: [],
            date1: null,
            date2: null,
            date3: null,
            date4: null,
            isVotingFinish: null,
        };
    },
    computed: {
        ...mapGetters(["SETTINGS", "ELECTION", "IS_ELECTION"]),
    },
    methods: {
        checkData(data) {
            console.log(data)
        },
        async GetVotes() {
            try {
                await this.$store.dispatch('GetSettings');
                await this.$store.dispatch('IsElection')
                let date1 = null
                let date2 = null
                await this.$store.dispatch('GetActiveElection').then(() => {
                    this.date1 = moment(this.ELECTION.start_filing_date).format("MMMM D, YYYY A");
                    this.date2 = moment(this.ELECTION.end_filing_date).format("MMMM D, YYYY A");
                    this.date3 = moment(this.ELECTION.start_voting_date).format("MMMM D, YYYY A");
                    this.date4 = moment(this.ELECTION.end_voting_date).format("MMMM D, YYYY A");
                    date1 = moment(this.ELECTION.start_voting_date).format('X');
                    date2 = moment(this.ELECTION.end_voting_date).format('X');
                    const currentDateInManila = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
                    const currentDate = new Date(currentDateInManila);
                    const endVotingDate = new Date(this.ELECTION.end_voting_date);
                    if (currentDate > endVotingDate) {
                        this.isVotingFinish = true;
                    }
                });


                // Format date1 and date2 before filtering
                const formattedDate1 = moment(date1 * 1000).format('YYYY-MM-DD HH:mm:ss');
                const formattedDate2 = moment(date2 * 1000).format('YYYY-MM-DD HH:mm:ss');

                this.web3 = new Web3(this.SETTINGS.url);
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

            } catch (error) {
                console.error('Error in main:', error.message);
            }
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
    mounted() {
        // this.GetVotes();
    },
};
</script>
  
<style scoped>
/* Add your styling if needed */
</style>
  