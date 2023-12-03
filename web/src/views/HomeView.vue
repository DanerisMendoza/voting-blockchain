<template>
  <div class="login-container">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-container>
            <v-container>
              <v-container>
                <v-card tile color="#7f8c8d">
                  <v-card-title class="text-center">
                    <!-- <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" max-height="150" max-width="250">
                </v-img> -->
                    Vote Now
                    <v-spacer></v-spacer>
                    <v-btn text color="#0000FF" x-small @click="registerDialog()">Not A Voter? Register Here</v-btn>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-subtitle></v-card-subtitle>
                  <v-card-text>
                    <v-form @submit.prevent="login">
                      <v-text-field dense filled v-model="username" label="Username"></v-text-field>
                      <v-text-field dense filled v-model="password" label="Password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"></v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" block tile color="#bdc3c7">Login</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <RegisterDialog />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

import RegisterDialog from '@/components/Dialogs/RegisterDialog.vue';
// import 'mdi/css/materialdesignicons.css';
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    registerDialog() {
      this.$store.commit('SET_REGISTER_DIALOG', true);
    },
    login() {
      const payload = {
        username: this.username,
        password: this.password,
      }
      this.$store.dispatch("Login", payload).then((response) => {
        if (response.message) {
          Swal.fire({
            text: response.message,
            icon: response.icon
          })
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      'GET_REGISTER_DIALOG'
    ])
  },
  components: {
    RegisterDialog
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Set the container to take the full height of the viewport */
}
</style>
