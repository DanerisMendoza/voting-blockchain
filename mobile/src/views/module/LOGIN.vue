<!-- src/components/Login.vue -->

<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-title class="secondary">
              <span class="headline white--text">Voting App</span>
            </v-card-title>
  
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="username" label="Username" required></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                <v-btn type="submit">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Add your login logic here
        console.log('Logging in...');
      },
    },
  };
  </script>
  
  