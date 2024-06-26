<template>
  <v-app>
    <v-card class="pl-2 pt-2 pt-2" v-if="ELECTION_STATUS != 'ongoing'">
      <p>Election Status: <strong style="text-transform: uppercase;">{{ ELECTION_STATUS }}</strong></p>
      <div v-if="ELECTION_STATUS == 'closed'">
        <p>Filing Start: <strong>{{ formattedDate(ELECTION.start_filing_date) }}</strong></p>
        <p>Filing End: <strong>{{ formattedDate(ELECTION.end_filing_date) }}</strong></p>
        <p>Election Start: <strong>{{ formattedDate(ELECTION.start_voting_date) }}</strong></p>
        <p>Election End: <strong>{{ formattedDate(ELECTION.end_voting_date) }}</strong></p>
      </div>
    </v-card>
    <v-item-group active-class="primary" v-if="ELECTION_STATUS == 'ongoing' && IS_VOTED == false">
      <v-autocomplete v-model="selected_position" :items="POSITIONS" item-text="name" item-value="id" auto-select-first
        chips label="POSISTION"></v-autocomplete>
      <v-row>
        <v-col cols="12">
          <v-row v-for="(item, index) in CANDIDATES" :key="item.id">
            <v-col cols="12">
              <v-item>
                <v-card :class="{ 'highlight-card': voteList.some(item2 => item2.candidate_id == item.candidate_id) }"
                  @click="selectCard(item)">
                  <center>
                    <v-row>
                      <v-col cols="12">
                        <img :src="item.base64img" alt="Profile Picture" width="50" class="mr-2 profile-picture" />
                        <v-card-subtitle>
                          <strong>{{ item.candidate_name }}</strong>
                          <br>
                          Position: {{ item.position_name }}
                          <br>
                          Partylist: {{ item.party_list }}
                        </v-card-subtitle>
                      </v-col>
                    </v-row>
                  </center>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
          <br>
          <center>
            <v-btn @click="prev()">
              PREV
            </v-btn>
            <v-btn @click="next()">
              NEXT
            </v-btn>
            <v-btn @click="submit()">
              SUBMIT
            </v-btn>
          </center>
        </v-col>
      </v-row>
    </v-item-group>
    <v-card v-if="IS_VOTED" class="pl-2 pt-2 pt-2">
      <p>User Status: <strong style="text-transform: uppercase;">Already Voted</strong></p>
    </v-card>
  </v-app>
</template>

  
<script>
import Web3 from 'web3';
import VotingContract from '../../../../blockchain/build/contracts/VotingSystem.json';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters(["POSITIONS", "CANDIDATES", "USER_DETAILS", "SETTINGS", "ELECTION", "ELECTION_STATUS", "IS_VOTED", "TODAY"]),
  },
  watch: {
    selected_position: {
      handler() {
        this.fetchPosition()
        const currentIndex = this.POSITIONS.find(item => item.id === this.selected_position);
        this.currentIndex = this.POSITIONS.indexOf(currentIndex)
      }
    },
  },

  data() {
    return {
      currentIndex: 0,
      voteList: [],
      privateKey: '0x3afc4651978a80301100b53a737018032b15541030c173a2a82095432e6092ae', // Add a data property for the private key
      web3: null,
      contract: null,
      account: '',
      selectedCandidate: null,
      selected_position: 1,
    };
  },

  methods: {
    formattedDate(data) {
      return moment(data).format("MMMM D, YYYY - hh:mm A");
    },
    async submit() {
      if (this.voteList.length != this.POSITIONS.length) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Incomplete Vote List',
          text: 'Please complete your vote list.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } else {
        const candidateIds = this.voteList.map(vote => vote.candidate_id);
        const candidateName = this.voteList.map(vote => vote.candidate_name);
        const positionIDs = this.voteList.map(vote => vote.position_id);
        const positionName = this.voteList.map(vote => vote.position_name);
        try {
          if (!/^0x[0-9a-fA-F]{64}$/.test(this.privateKey)) {
            throw new Error('Invalid private key format');
          }
          const account = this.web3.eth.accounts.privateKeyToAccount(this.SETTINGS.private_key);
          // const currentDateInManila = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
          // const currentDateTimestamp = Math.floor(new Date(currentDateInManila).getTime() / 1000);
          await this.$store.dispatch('GetToday')
          for (let i = 0; i < candidateIds.length; i++) {
            await this.contract.methods.castVote(candidateIds[i], candidateName[i], this.USER_DETAILS.id, this.USER_DETAILS.name, positionIDs[i], positionName[i], this.TODAY.currentTimestamp).send({
              from: account.address,
              gas: 2000000,
            }).then((response) => {
              console.log(response)
            });
          }
          await this.$store.dispatch("UPDATE_LAST_VOTE_DATE")
          await this.$store.dispatch('IsVoted')
        } catch (error) {
          this.textareaValue = error
          console.error('Error voting:', error.message);
        }
        this.$swal.fire({
          icon: 'success',
          title: 'Vote Success',
          text: 'Your vote has been successfully recorded.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    },
    prev() {
      if ((this.currentIndex - 1) > -1) {
        this.currentIndex -= 1
        this.selected_position = this.POSITIONS[this.currentIndex].id
      }
    },
    next() {
      if ((this.currentIndex + 1) < this.POSITIONS.length) {
        this.currentIndex += 1
        this.selected_position = this.POSITIONS[this.currentIndex].id
      }
    },

    async main() {
      await this.$store.dispatch('IsVoted')
      await this.$store.dispatch('GetElectionStatus')
      await this.$store.dispatch('GetActiveElection')
      await this.$store.dispatch('GetSettings')
      try {
        this.web3 = new Web3(this.SETTINGS.url);
        this.contract = new this.web3.eth.Contract(VotingContract.abi, VotingContract.networks['5777'].address);
        const votes = await this.getAllVotesFromContract();
        const votes2 = votes.map(vote => ({
          candidateID: parseInt(vote.candidateID, 10),
          candidateName: vote.candidateName,
          positionID: parseInt(vote.positionID, 10),
          positionName: vote.positionName,
          voteID: parseInt(vote.voteID, 10),
          voterAddress: vote.voterAddress,
          voterID: parseInt(vote.voterID, 10),
          voterName: vote.voterName,
        }));


      } catch (error) {
        console.error('Error in main:', error.message);
      }
    },
    async getAllVotesFromContract() {
      try {
        const result = await this.contract.methods.getAllVotes().call();
        return result;
      } catch (error) {
        throw new Error('Error calling getAllVotes:', error);
      }
    },
    fetchPosition() {
      const payload = {
        params: {
          selectedPositionID: this.selected_position
        }
      }
      this.$store.dispatch('GetCandidates', payload)
    },
    selectCard(item) {
      if (this.voteList.some(item2 => item2.position_name === item.position_name)) {
        const index = this.voteList.findIndex(item2 => item2.position_name === item.position_name);
        this.$set(this.voteList, index, item);
      } else {
        this.voteList.push(item);
      }
    },
  },
  mounted() {
    this.main();
    this.$store.dispatch('GetPositions').then(() => {
      this.selected_position = this.POSITIONS[this.currentIndex].id
    })
    this.fetchPosition()
  },
};
</script>
  
<style scoped>
.bg {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.primary--text {
  color: #1976d2;
}

.highlight-card {
  background-color: darkkhaki;
}
</style>
