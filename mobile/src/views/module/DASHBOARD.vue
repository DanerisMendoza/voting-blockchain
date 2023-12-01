<template>
    <v-app>
        <div v-for="(position, index) in votesByPositionArray" :key="index">
            <v-card>
                <apexchart :type="'bar'" :options="getChartOptions(position)" :series="getChartSeries(position)" />
            </v-card>
            <br>
        </div>
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
        };
    },
    computed: {
        ...mapGetters(["SETTINGS", "ELECTION"]),
    },
    methods: {
        async main() {
            try {
                await this.$store.dispatch('GetSettings');
                let date1 = null;
                let date2 = null;

                await this.$store.dispatch('GetActiveElection').then(() => {
                    date1 = moment(this.ELECTION.start_voting_date).format('X');
                    date2 = moment(this.ELECTION.end_voting_date).format('X');
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
                console.log(this.votesByPositionArray);

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
    created() {
        this.main();
    },
};
</script>
  
<style scoped>
/* Add your styling if needed */
</style>
  