<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="mb-4">Vote for Your Favorite Option</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-radio-group v-model="selectedCandidate">
          <ion-list-header>
            <ion-label>Candidates</ion-label>
          </ion-list-header>

          <ion-item v-for="option in options" :key="option.id">
            <ion-radio :value="option">{{ option.name }}</ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
      <ion-button @click="vote">Vote</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Web3 from 'web3';
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonRadioGroup, IonListHeader, IonItem, IonLabel, IonRadio, IonButton, IonTextarea } from '@ionic/vue';

// Import the contract ABI and network information from TypeScript
import LandRegistrationContract from '../../../blockchain/build/contracts/VotingSystem.json';


const selectedCandidate = ref<any>(null);

const privateKey = '0xdd63a9c53869849a6e14cad7330600f63d700617615e9db65c7a914b6f68f362';
const web3 = new Web3('http://192.168.1.4:7545');
const contract = new web3.eth.Contract(LandRegistrationContract.abi, LandRegistrationContract.networks['5777'].address);

const options = [
  { id: 1, name: 'john', votes: 0 },
  { id: 2, name: 'michael', votes: 0 },
  { id: 3, name: 'jason', votes: 0 },
];

const vote = async () => {
  try {
    if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
      throw new Error('Invalid private key format');
    }

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    await contract.methods.castVote(0, selectedCandidate.value.id, selectedCandidate.value.name, 1, 'john').send({
      from: account.address,
      gas: 2000000,
    }).then((response) => {
      textareaValue.value = response;
    });
  } catch (error) {
    textareaValue.value = error.message;
    console.error('Error registering land:', error.message);
  }
};

const main = async () => {
  try {
    const votes = await getAllVotesFromContract();
    console.log(votes);
  } catch (error) {
    console.error('Error in main:', error.message);
  }
};

const getAllVotesFromContract = async () => {
  try {
    const result = await contract.methods.getAllVotes().call();
    return result;
  } catch (error) {
    throw new Error('Error calling getAllVotes:', error);
  }
};

main();
console.log(options)
</script>

<style scoped>
/* Add your styles here if needed */
</style>
