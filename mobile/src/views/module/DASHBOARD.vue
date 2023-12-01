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
            await this.$store.dispatch('GetSettings')
            await this.$store.dispatch('GetActiveElection').then(() => {
                console.log(this.ELECTION.start_voting_date)
                console.log(this.ELECTION.end_voting_date)
            })
            try {
                this.web3 = new Web3(this.SETTINGS.url);
                this.contract = new this.web3.eth.Contract(
                    VotingContract.abi,
                    VotingContract.networks['5777'].address
                );
                const votes = await this.contract.methods.getAllVotes().call();
                console.log(votes)
                // Create an object to store votes by position
                const votesByPosition = votes.reduce((acc, vote) => {
                    const positionID = parseInt(vote.positionID, 10);

                    // If position doesn't exist in the accumulator, initialize it
                    if (!acc[positionID]) {
                        acc[positionID] = {
                            positionName: vote.positionName,
                            candidates: {},
                        };
                    }

                    // If candidate doesn't exist in the position, initialize it
                    if (!acc[positionID].candidates[vote.candidateID]) {
                        // Assuming vote.date is a BigInt value
                        const dateBigInt = BigInt(vote.date)

                        // Convert BigInt to number
                        const dateNumber = Number(dateBigInt)

                        // Convert Unix timestamp to milliseconds
                        const dateMilliseconds = dateNumber * 1000

                        // Use moment to format the date
                        const formattedDate = moment(dateMilliseconds).format("MMMM D, YYYY - hh:mm A")

                        acc[positionID].candidates[vote.candidateID] = {
                            candidateName: vote.candidateName,
                            voteCount: 0,
                            voteID: parseInt(vote.voteID, 10),
                            voterAddress: vote.voterAddress,
                            voterID: parseInt(vote.voterID, 10),
                            voterName: vote.voterName,
                            date: formattedDate // Use the human-readable date
                        };
                    }


                    // Increment the vote count and add the vote to the candidate
                    acc[positionID].candidates[vote.candidateID].voteCount++;

                    return acc;
                }, {});

                // Convert the votesByPosition object into an array
                this.votesByPositionArray = Object.values(votesByPosition);
                console.log(votesByPosition)
                console.log(this.votesByPositionArray)

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
  