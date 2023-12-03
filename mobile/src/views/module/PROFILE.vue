<template>
    <v-container>
      <v-card class="user-info-container" elevation="10">
        <v-card-title>User Information</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <img :src="USER_DETAILS.base64img" alt="Profile Picture" width="150" class="mr-2 profile-picture" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <strong>Name:</strong> {{ USER_DETAILS.name }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <strong>Gender:</strong> {{ USER_DETAILS.gender }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <strong>Email:</strong> {{ USER_DETAILS.email }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <strong>Address:</strong> {{ USER_DETAILS.address }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <br><br>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['USER_DETAILS']),
    },
    data() {
      return {
      
      }
    },
  };
  </script>
  
  