<template>
  <v-app>
    <v-item-group active-class="primary">
      <v-autocomplete v-model="selected_position" :items="POSITIONS" item-text="name" item-value="id" auto-select-first
        chips label="POSISTION" ></v-autocomplete>
      <v-row>
        <v-col cols="12">
          <v-row v-for="(item, index) in CANDIDATES" :key="item.id">
            <v-col cols="12">
              <v-item>
                <v-card :class="{ 'highlight-card': voteList.some(item2 => item2.id == item.id) }"
                  @click="selectCard(item)">
                  <!-- <v-card :class="{ 'highlight-card': voteList.includes(item.id) }" @click="selectCard(item)"> -->
                  <v-row>
                    <v-col cols="12">
                      <v-card-title>{{ item.name }}</v-card-title>
                      <v-card-subtitle>Position: {{ item.position }}</v-card-subtitle>
                    </v-col>
                  </v-row>
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
          </center>
        </v-col>
      </v-row>
    </v-item-group>
  </v-app>
</template>

  
<script>
import Web3 from 'web3';
import VotingContract from '../../../../blockchain/build/contracts/VotingSystem.json';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["POSITIONS", "CANDIDATES"]),
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
      privateKey: '0xdd63a9c53869849a6e14cad7330600f63d700617615e9db65c7a914b6f68f362', // Add a data property for the private key
      web3: null,
      contract: null,
      account: '',
      selectedCandidate: null,
      selected_position: 1,
    };
  },
  methods: {
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
    },
    fetchPosition() {
      const payload = {
        params: {
          selectedPositionID: this.selected_position
        }
      }
      this.$store.dispatch('GetCandidates', payload).then((response) => {
        // console.log(this.CANDIDATES)
      })
    },
    selectCard(item) {
      if (this.voteList.some(item2 => item2.position === item.position)) {
        const index = this.voteList.findIndex(item2 => item2.position === item.position);
        this.$set(this.voteList, index, item);
      } else {
        // Add the new item to the voteList
        this.voteList.push(item);
      }

      console.log(this.voteList)
    },
  },
  mounted() {
    // this.main();
    this.$store.dispatch('GetPositions').then(() => {
      console.log(this.POSITIONS)
      this.selected_position = this.POSITIONS[this.currentIndex].id
    })
    this.fetchPosition()
    console.log(this.currentIndex)
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
