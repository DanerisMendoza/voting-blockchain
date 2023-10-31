<template>
  <v-app>
    <v-item-group active-class="primary">
      <v-autocomplete v-model="selected_position" :items="POSISTIONS" item-text="name" item-value="id" auto-select-first
        chips label="POSISTION"></v-autocomplete>
      <v-row>
        <v-col cols="12">
          <candidates />
          <br>
          <center>
            <v-btn>
              NEXT
            </v-btn>
          </center>
        </v-col>
      </v-row>
    </v-item-group>
  </v-app>
</template>

  
<script>
import Web3 from 'web3';
import VotingContract from '../../../../blockchain/build/contracts/VotingSystem.json';
import candidates from '@/views/component/candidates.vue';
import voteList from '@/views/component/voteList.vue';
import { mapGetters } from 'vuex';

export default {
  components: { candidates, voteList },
  computed: {
    ...mapGetters(["SELECTED_POSITION", "POSISTIONS", "CANDIDATES"]),
  },
  watch: {
    selected_position: {
      handler(val) {
        console.log(this.selected_position)
        this.$store.commit('SELECTED_POSITION', this.POSISTIONS.find(item => item.id === this.selected_position).id)
      }
    },
  },
  data() {
    return {
      textareaValue: "",
      location: '',
      area: 0,
      privateKey: '0xdd63a9c53869849a6e14cad7330600f63d700617615e9db65c7a914b6f68f362', // Add a data property for the private key
      web3: null,
      contract: null,
      account: '',
      selectedCandidate: null,
      selected_position: 1,
    };
  },
  methods: {
    async vote() {
      try {
        if (!/^0x[0-9a-fA-F]{64}$/.test(this.privateKey)) {
          throw new Error('Invalid private key format');
        }
        const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
        console.log(this.selectedCandidate)
        this.textareaValue = account
        await this.contract.methods.castVote(0, this.selectedCandidate.id, this.selectedCandidate.name, 1, 'john').send({
          from: account.address,
          gas: 2000000, 
        }).then((response) => {
          this.textareaValue = response
        });
      } catch (error) {
        this.textareaValue = error
        console.error('Error registering land:', error.message);
      }
    },
    async main() {
      try {
        this.web3 = new Web3('http://192.168.1.4:7545');
        this.contract = new this.web3.eth.Contract(VotingContract.abi, VotingContract.networks['5777'].address);
        const votes = await this.getAllVotesFromContract();
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
    }
  },
  mounted() {
    // this.main();
    this.$store.dispatch('GetPositions').then(() => {
      this.selected_position = this.POSISTIONS[0].id
      this.$store.commit('SELECTED_POSITION', this.selected_position)
    })
  },
};
</script>
  
<style scoped>
.bg {
  background-color: #f5f5f5;
  /* Set a light background color */
  border-radius: 8px;
  /* Add rounded corners */
}

.primary--text {
  color: #1976d2;
  /* Set a custom text color for the radio label */
}
</style>
