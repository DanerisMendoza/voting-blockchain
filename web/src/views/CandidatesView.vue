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
                        <v-spacer></v-spacer>
                        <v-btn small tile color="red white--text" @click="clearCandidates">Clear Candidates</v-btn>
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
import Swal from "sweetalert2";
export default {
    data() {
        return {
        }
    },
    methods: {
        clearCandidates() {
            Swal.fire({
                title: 'Are you sure to clear the Candidates?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Clear All!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch("ClearCandidates").then((response) => {
                        if (response.icon == 'success') {
                            Swal.fire({
                                title: response.message,
                                icon: response.icon,
                            })
                            this.$store.dispatch("GetAllCandidates");
                        }
                    })
                }
            });
        },

    },
    components: {
        AdminNav,
        CandidateDataTables
    }
}
</script>