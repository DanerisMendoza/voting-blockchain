<template>
    <v-row no-gutters>
        <v-col cols="2">
            <VotersNav />
        </v-col>
        <v-col cols="10" class="d-flex align-center justify-center">
            <v-container>
                <v-card tile>
                    <v-card-title>
                        User Profile
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="justify-center">
                            <v-avatar size="150">
                                <v-img :src="GET_USER_DETAILS.base64img"></v-img>
                            </v-avatar>
                            <v-col>
                                <h1>{{ GET_USER_DETAILS.name }}</h1>
                                <h3>{{ GET_USER_DETAILS.address }}</h3>
                                <h3>{{ GET_USER_DETAILS.email }}</h3>
                                <h3>{{ GET_USER_DETAILS.gender + ' ' + GET_USER_DETAILS.age }}</h3>
                            </v-col>
                            <v-col>
                                <v-btn x-small tile color="primary" @click="openChangePW">Change Password</v-btn>
                            </v-col>
                        </v-row>
                        <ChangePWDialog />
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import VotersNav from '@/components/Navbars/VotersNav.vue';
import ChangePWDialog from "@/components/Dialogs/ChangePWDialog.vue";
export default {
    data() {
        return {
        }
    },
    methods: {
        openChangePW() {
            this.$store.commit("SET_PW_DIALOG", true);
        },
    },
    computed: {
        ...mapGetters([
            'GET_USER_DETAILS',
            'GET_PW_DIALOG',
        ])
    },
    components: {
        VotersNav,
        ChangePWDialog,
    },

}
</script>