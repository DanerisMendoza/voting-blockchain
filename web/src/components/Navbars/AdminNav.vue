<template>
    <v-card height="700" width="256" class="mx-auto" flat>
        <v-navigation-drawer permanent color="#7f8c8d">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Administrator's Page
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Admin Functionalities
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                            <!-- <router-link :to="item.path" exact link>{{ item.title }}</router-link> -->
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item link>
                    <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title @click="Logout()">Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    methods: {
        Logout() {
            this.$store.dispatch("Logout");
        },
    },
    data() {
        return {
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
                { title: 'Positions', icon: 'mdi-account-group', path: '/positions' },
                { title: 'List of Candidates', icon: 'mdi-format-list-group', path: '/candidates' },
                { title: 'List of Voters', icon: 'mdi-format-list-checkbox', path: '/voterlist' },
            ],
        }
    },
}
</script>