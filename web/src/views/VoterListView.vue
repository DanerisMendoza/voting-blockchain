<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
            <v-container>
                <v-card tile>
                    <v-card-title>
                        Voter List
                    </v-card-title>
                    <v-card-text>
                        <VotersDataTables />
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import AdminNav from "@/components/Navbars/AdminNav.vue"
import VotersDataTables from "@/components/Tables/VotersDataTables.vue";
export default {
    components: {
        AdminNav,
        VotersDataTables
    }
}
</script>