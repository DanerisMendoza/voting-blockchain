<template>
    <v-container class="bg mt-2">
      <v-row fluid justify="center">
        <v-col cols="12">
          <h2 class="mb-4 text-center">Vote for Your Favorite Option</h2>
        </v-col>
  
        <v-col cols="12" class="text-center">
          <v-radio-group v-model="selectedCandidate">
            <v-radio
              class="primary--text" 
              :label="option.name"
              :value="options[index]"
              :key="index"
              v-for="(option, index) in options"
            ></v-radio>
          </v-radio-group>
        </v-col>
  
        <v-col cols="12" class="text-center mt-4"> <!-- Increased margin-top for better spacing -->
          <v-btn @click="vote" class="primary">Vote</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import Web3 from 'web3';
import LandRegistrationContract from '../../../../blockchain/build/contracts/VotingSystem.json';
export default {
    data() {
        return {
            textareaValue: "",
            location: '',
            area: 0,
            privateKey: '0xdd63a9c53869849a6e14cad7330600f63d700617615e9db65c7a914b6f68f362', // Add a data property for the private key
            web3: null,
            contract: null,
            account: '',
            options: [
                { id: 1, name: 'john', votes: 0 },
                { id: 2, name: 'michael', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
            ],
            selectedCandidate: null,
        };
    },
    methods: {
        async vote() {
            try {
                // Validate private key format
                if (!/^0x[0-9a-fA-F]{64}$/.test(this.privateKey)) {
                    throw new Error('Invalid private key format');
                }

                // Use the provided private key for transaction signing
                const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
                console.log(this.selectedCandidate)
                this.textareaValue = account
                // this.textareaValue = account
                await this.contract.methods.castVote(0, this.selectedCandidate.id, this.selectedCandidate.name, 1, 'john').send({
                    from: account.address,
                    gas: 2000000, // Adjust the gas limit according to your contract's needs
                }).then((response) => {
                    this.textareaValue = response
                });


            } catch (error) {
                this.textareaValue = error
                console.error('Error registering land:', error.message);
                // Handle or display the error in your application
            }
        },
        async main() {
            try {
                // Initialize Web3 with the injected provider (MetaMask) or fallback to a local provider
                // this.web3 = new Web3(Web3.givenProvider || 'http://192.168.1.4:7545');
                this.web3 = new Web3('http://192.168.1.4:7545');

                // Create a contract instance
                this.contract = new this.web3.eth.Contract(LandRegistrationContract.abi, LandRegistrationContract.networks['5777'].address);

                // You may want to add additional setup logic here
                const votes = await this.getAllVotesFromContract();
                // Log the votes to the console
                console.log(votes);

            } catch (error) {
                console.error('Error in main:', error.message);
                // Handle or display the error in your application
            }
        },
        async getAllVotesFromContract() {
            try {
                // Call the getAllVotes method on the smart contract
                const result = await this.contract.methods.getAllVotes().call();
                return result;
            } catch (error) {
                throw new Error('Error calling getAllVotes:', error);
            }
        }
    },
    mounted() {
        this.main();
        this.textareaValue = 'console'
    },
};
</script>
  
<style scoped>
  .bg {
    background-color: #f5f5f5; /* Set a light background color */
    border-radius: 8px; /* Add rounded corners */
  }

  .primary--text {
    color: #1976d2; /* Set a custom text color for the radio label */
  }
</style>