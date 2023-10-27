<template>
  <v-app>
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
