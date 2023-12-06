<template>
    <v-row no-gutters>
        <v-col cols="2">
            <VotersNav />
        </v-col>
        <v-col cols="10">
            <v-container>
                <v-card tile v-if="GET_EL_STATUS == 'ongoing'">
                    <v-card-title>
                        Vote Now
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-card-actions>
                            <v-btn tile small elevation="0" color="primary" @click="prev">PREV</v-btn>
                            <v-spacer></v-spacer>
                            <v-autocomplete v-model="selected_position" :items="GET_POSITIONS" item-text="name"
                                item-value="id" auto-select-first chips label="POSITIONS"></v-autocomplete>
                            <v-spacer></v-spacer>
                            <v-btn tile small elevation="0" color="primary" @click="next">Next</v-btn>
                        </v-card-actions>
                        <v-item-group>
                            <v-row no-gutters v-for="(item, index) in GET_V_CANDIDATES" :key="item.id">
                                <v-col>
                                    <v-item>
                                        <v-card tile @click="selectCard(item)"
                                            :class="{ 'highlight-card': voteList.some(item2 => item2.candidate_id == item.candidate_id) }">
                                            <v-card-text>
                                                <v-row class="d-flex justify-center">
                                                    <v-col class="text-center">
                                                        <v-img :src="item.base64img" width="65px" class="mx-auto"></v-img>
                                                        <strong>
                                                            {{ item.candidate_name }} <br>
                                                        </strong>
                                                        <small>{{ item.party_list }}</small>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-item-group>
                        <v-card-actions>
                            <v-btn tile small elevation="0" color="red" @click="clear">Clear</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn tile small elevation="0" color="primary" @click="submit">Submit</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
                <v-card tile v-if="GET_EL_STATUS == 'closed' || 'finished'">
                    <v-card-title>
                        Voting Schedules
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle></v-card-subtitle>
                    <v-card-text class="text-center">
                        <v-col cols="12">
                            <label>Filing Start: <strong>{{ formattedDate(GET_ELECTION.start_filing_date)
                            }}</strong></label>
                        </v-col>
                        <v-col cols="12">
                            <label>Filing End: <strong>{{ formattedDate(GET_ELECTION.end_filing_date) }}</strong></label>
                        </v-col>
                        <v-col cols="12">
                            <label>Election Start: <strong>{{ formattedDate(GET_ELECTION.start_voting_date)
                            }}</strong></label>
                        </v-col>
                        <v-col cols="12">
                            <label>Election End: <strong>{{ formattedDate(GET_ELECTION.end_voting_date) }}</strong></label>
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import Web3 from 'web3';
import VotingContract from '../../../blockchain/build/contracts/VotingSystem.json';
import VotersNav from '@/components/Navbars/VotersNav.vue';
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            voteList: [],
            currentIndex: 0,
            selected_position: 1,
            account: null
        }
    },
    methods: {
        formattedDate(data) {
            return moment(data).format("MMMM D, YYYY - hh:mm A");
        },
        async main() {
            await this.$store.dispatch('IsVoted')
            await this.$store.dispatch('GetElectionStatus')
            await this.$store.dispatch('GetActiveElection')
            await this.$store.dispatch('UpdateLastVoteDate')
        },
        async getAllVotesFromContract() {
            try {
                const result = await this.contract.methods.getAllVotes().call();
                return result;
            } catch (error) {
                throw new Error('Error calling getAllVotes:', error);
            }
        },
        async submit() {
            if (this.voteList.length != this.GET_POSITIONS.length) {
                Swal.fire({
                    title: "Do not leave anything blank.",
                    text: "Please complete the voting.",
                    icon: "warning"
                });
            } else {
                this.initMetaMaskTransaction()
            }
        },
        async initMetaMaskTransaction() {
            const candidateIds = this.voteList.map(vote => vote.candidate_id);
            const candidateName = this.voteList.map(vote => vote.candidate_name);
            const positionIDs = this.voteList.map(vote => vote.position_id);
            const positionName = this.voteList.map(vote => vote.position_name);
            const currentDateInManila = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
            const currentDateTimestamp = Math.floor(new Date(currentDateInManila).getTime() / 1000);

            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const accounts = await web3.eth.getAccounts();
                    const contract = new web3.eth.Contract(VotingContract.abi, VotingContract.networks['5777'].address);

                    for (let i = 0; i < candidateIds.length; i++) {
                        await contract.methods.castVote(candidateIds[i], candidateName[i], this.GET_USER_DETAILS.id, this.GET_USER_DETAILS.name, positionIDs[i], positionName[i], currentDateTimestamp).send({
                            from: accounts[0],
                            gas: 3000000
                        }).then((response) => {
                            console.log(response)
                        });
                    }
                    this.main();
                } catch (error) {
                    console.error('Error initializing MetaMask transaction:', error);
                }
            } else {
                console.error('MetaMask not detected. Please install MetaMask.');
            }
        },
        clear() {
            if (this.voteList.length != 0) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, clear it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.voteList = [];
                    }
                });
            }
        },
        selectCard(val) {
            if (this.voteList.some(item2 => item2.position_name === val.position_name)) {
                const index = this.voteList.findIndex(item2 => item2.position_name === val.position_name);
                this.$set(this.voteList, index, val);
            } else {
                this.voteList.push(val);
            }
        },
        fetchPosition() {
            const payload = {
                params: {
                    selectedPositionID: this.selected_position
                }
            }
            this.$store.dispatch('GetCandidates', payload);
        },
        prev() {
            if ((this.currentIndex - 1) > -1) {
                this.currentIndex -= 1
                this.selected_position = this.GET_POSITIONS[this.currentIndex].id
            }
        },
        next() {
            if ((this.currentIndex + 1) < this.GET_POSITIONS.length) {
                this.currentIndex += 1
                this.selected_position = this.GET_POSITIONS[this.currentIndex].id
            }
        },
    },
    components: {
        VotersNav
    },
    computed: {
        ...mapGetters([
            'GET_V_CANDIDATES',
            'GET_POSITIONS',
            'GET_EL_STATUS',
            'GET_ELECTION',
            'GET_USER_DETAILS'
        ])
    },
    mounted() {
        this.main();
        this.fetchPosition();
        this.$store.dispatch('GetPositions').then(() => {
            this.selected_position = this.GET_POSITIONS[this.currentIndex].id
        })
    },
    watch: {
        selected_position: {
            handler() {
                this.fetchPosition()
                const currentIndex = this.GET_POSITIONS.find(item => item.id === this.selected_position);
                this.currentIndex = this.GET_POSITIONS.indexOf(currentIndex)
            }
        },
    },

}
</script>

<style scoped>
::v-deep .highlight-card {
    background-color: #2c3e50;
}
</style>
