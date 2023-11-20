<template>
    <div>
        <v-btn tile small color="red" @click="Logout()">Logout</v-btn>
    </div>
</template>

<script>
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

    },

}
</script>