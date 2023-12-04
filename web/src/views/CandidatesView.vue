<template>
    <v-row no-gutters>
        <v-col cols="2">
            <AdminNav />
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
            <v-container>
                <v-card tile>
                    <v-card-title>
                        List of Candidates
                    </v-card-title>
                    <v-card-text>
                        <CandidateDataTables />
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import AdminNav from "@/components/Navbars/AdminNav.vue"
import CandidateDataTables from "@/components/Tables/CandidateDataTables.vue";
export default {
    components: {
        AdminNav,
        CandidateDataTables
    }
}
</script>