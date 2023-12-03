<template>
    <div>
        <v-row no-gutters>
            <v-col cols="2">
                <VotersNavVue />
            </v-col>
            <v-col cols="10">

            </v-col>
        </v-row>
    </div>
</template>

<script>
import VotersNavVue from '@/components/Navbars/VotersNav.vue';
export default {
    data() {
        return {
        }
    },
    methods: {
        Logout() {
            this.$store.dispatch("Logout");
            // localStorage.removeItem("user_role");
            // localStorage.removeItem("token");
            // this.$router.push({ path: "/" })
        },
    },
    mounted() {

    },
    components: {
        VotersNavVue,
    },

}
</script>