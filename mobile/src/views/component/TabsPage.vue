<template>
  <v-app>
    <v-app-bar app dark>
      <!-- Add your logo or title here -->
      <v-app-bar-title>
        Voting Mobile
      </v-app-bar-title>

      <!-- Use v-spacer to push the menu button to the end -->
      <v-spacer></v-spacer>

      <!-- Add a dropdown menu with a logout button -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            Menu
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="submitLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- You can add other items to the header as needed -->

    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app dark class="fixed-footer">
      <v-tabs v-model="activeTab" color="primary" class="centered-tabs">
        <v-tab v-for="(item, index) in tabs" :key="index" :to="item.route" style="color: white;">
          {{ item.label }}
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeTab: 1,
      tabs: [
        { label: 'PROFILE', route: '/TABSPAGE/PROFILE' },
        { label: 'DASHBOARD', route: '/TABSPAGE/DASHBOARD' },
        { label: 'VOTING', route: '/TABSPAGE/VOTING' },
      ],
    };
  },
  methods: {
    submitLogout() {
      this.$store.dispatch("Logout").then((response) => {
        if (response['message'] === "success") {
          localStorage.removeItem("vb-token");
          sessionStorage.removeItem("vb-token");
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    ...mapGetters(["USER_DETAILS"]),
  },
  mounted() {
    this.$store.dispatch('GetUserDetails').then(()=>{
      console.log(this.USER_DETAILS)
    })
  }
};
</script>

<style>
.centered-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

body {
  overflow-x: hidden;
}
</style>
