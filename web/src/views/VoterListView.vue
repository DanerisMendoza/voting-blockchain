<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10">
            Voter List
        </v-col>
    </v-row>
</template>

<script>
import AdminNav from "@/components/Navbars/AdminNav.vue"
export default {
    components: {
        AdminNav
    }
}
</script>