<template>
    <v-row no-gutters>
        <v-col cols="2">
            <VotersNav />
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
            <v-container>
                <v-card tile>
                    <v-card-title v-if="!GET_APPLICATION">
                        Be A Candidate
                    </v-card-title>
                    <v-card-title v-else>
                        Already A Candidate
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text v-if="!GET_APPLICATION">
                        <v-form @submit.prevent="applySubmit">
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete dense filled outlined label="Party List" :items="GET_PARTY_LISTS"
                                        item-text="name" item-value="id" v-model="partylist">

                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete dense filled outlined label="Position" :items="GET_POSITIONS"
                                        item-text="name" item-value="id" v-model="position">

                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-btn small tile color="primary" type="submit">Apply</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                    <v-card-text v-else>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field dense outlined filled label="Name" readonly
                                    v-model="GET_APPLICATION.candidate_name"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field dense outlined filled label="Gender" readonly
                                    v-model="GET_APPLICATION.gender"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field dense outlined filled label="Position" readonly
                                    v-model="GET_APPLICATION.position_name"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field dense outlined filled label="Party List" readonly
                                    v-model="GET_APPLICATION.party_list"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small tile color="red" @click="cancelApplication">Cancel</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import VotersNav from '@/components/Navbars/VotersNav.vue';
import Swal from "sweetalert2";
export default {
    data() {
        return {
            partylist: null,
            position: null,
        }
    },
    methods: {
        cancelApplication() {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch('CancelApplication').then((response) => {
                        Swal.fire({
                            text: response.message,
                            icon: response.icon
                        });
                        this.$store.dispatch('GetCandidateById');
                    });
                }
            });
        },
        applySubmit() {
            var payload = {
                position_id: this.position,
                partylist_id: this.partylist
            }
            this.$store.dispatch('AddAsCandidate', payload).then((response) => {
                if (response.icon == 'success') {
                    Swal.fire({
                        text: response.message,
                        icon: response.icon
                    })
                    this.$store.dispatch('GetCandidateById');
                }
            });
        },
    },
    components: {
        VotersNav
    },
    computed: {
        ...mapGetters([
            'GET_PARTY_LISTS',
            'GET_POSITIONS',
            'GET_APPLICATION',
        ])
    },
    mounted() {
        this.$store.dispatch("GetPartyList");
        this.$store.dispatch("GetPositions");
        this.$store.dispatch("GetCandidateById");
    }

}
</script>