<template>
    <v-dialog v-model="GET_SCHED_DIALOG" persistent :width="dialogWidth" transition="dialog-top-transition">
        <v-card tile>
            <v-card-title>Set Voting Schedule
                <v-spacer></v-spacer>
                <v-btn icon outlined small color="red" @click="closeDialog"><v-icon>mdi-close-circle</v-icon></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <v-window>
                    <v-window-item :value="wvalue" v-if="wvalue == 1">
                        <v-row>
                            <v-col cols="6">
                                <label for="">Schedule Voting</label>
                                <v-date-picker v-model="selectedDates" multiple flat :min="minDate"
                                    @input="handleDateChange"></v-date-picker>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="GET_VS_START" outlined filled dense
                                    label="Starting Date"></v-text-field>
                                <v-text-field v-model="GET_VS_END" outlined filled dense
                                    label="Starting Date"></v-text-field>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn tile block small color="primary" @click="next">Next</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item :value="wvalue" v-else>
                        <v-row>
                            <v-col cols="6">
                                <v-btn tile block small color="primary" @click="back">Back</v-btn>
                                <label for="">Schedule Filing</label>
                                <v-date-picker v-model="filingDate" multiple flat :min="minDate"
                                    @input="fileSchedule"></v-date-picker>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="GET_FS_START" outlined filled dense
                                    label="Starting Date"></v-text-field>
                                <v-text-field v-model="GET_FS_END" outlined filled dense
                                    label="Starting Date"></v-text-field>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn tile block small color="primary" @click="setSchedule">Set</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialogWidth: '60%',
            filingDate: [],
            selectedDates: [],
            minDate: '2023-01-01',
            startdate: null,
            enddate: null,
            wvalue: 1
        }
    },
    methods: {
        setSchedule() {
            var payload = {
                sf_start: this.GET_FS_START,
                sf_end: this.GET_FS_END,
                sv_start: this.GET_VS_START,
                sv_end: this.GET_VS_END
            }
            this.$store.dispatch('AddSchedule', payload).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    Swal.fire({
                        text: response.data.message,
                        icon: response.data.icon
                    })
                    this.closeDialog();
                }
            })
        },
        back() {
            this.wvalue = 1;
        },
        next() {
            this.wvalue = 2;
        },
        fileSchedule(filingDate) {
            if (filingDate.length > 2) {
                filingDate.shift(); // Remove the first date if more than 2 are selected
            }
            this.filingDate = filingDate;
            this.$store.commit('SET_FS_START', this.filingDate[0])
            this.$store.commit('SET_FS_END', this.filingDate[1])
        },
        closeDialog() {
            this.$store.commit("SET_SCHED_DIALOG", false);
            this.$store.commit('SET_VS_START', null)
            this.$store.commit('SET_VS_END', null)
            this.$store.commit('SET_FS_START', null)
            this.$store.commit('SET_FS_END', null)
        },
        handleDateChange(selectedDates) {
            if (selectedDates.length > 2) {
                selectedDates.shift(); // Remove the first date if more than 2 are selected
            }
            this.selectedDates = selectedDates;
            this.$store.commit('SET_VS_START', this.selectedDates[0])
            this.$store.commit('SET_VS_END', this.selectedDates[1])
        },
    },
    computed: {
        ...mapGetters([
            'GET_SCHED_DIALOG',
            'GET_VS_START',
            'GET_VS_END',
            'GET_FS_START',
            'GET_FS_END'
        ])
    },
    watch: {
        '$vuetify.breakpoint.width'(newWidth) {
            if (newWidth < 600) {
                this.dialogWidth = '90%';
            } else {
                this.dialogWidth = '60%';
            }
        },
    }
}
</script>