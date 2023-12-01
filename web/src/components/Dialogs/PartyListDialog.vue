<template>
    <v-dialog v-model="GET_PL_DIALOG_VALUE" persistent :width="dialogWidth" transition="dialog-top-transition">
        <v-card>
            <v-card-title>
                Add Party List
                <v-spacer></v-spacer>
                <v-btn color="red" icon outlined small dense @click="closeDialog()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <v-text-field v-model="GET_PL_NAME" dense filled outlined label="Party List Name"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn tile small color="green" @click="addPL()">Add Party List</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
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
            dialogWidth: '40%',
        }
    },
    methods: {
        addPL() {
            this.$store.commit('SET_PL_NAME', this.GET_PL_NAME);
            var payload = {
                name: this.GET_PL_NAME
            };
            this.$store.dispatch("AddPartyList", payload).then((response) => {
                if (response.icon == 'success') {
                    Swal.fire({
                        text: response.message,
                        icon: response.icon
                    });
                    this.$store.dispatch('GetPartyList');
                    this.closeDialog();
                }
            })
        },
        closeDialog() {
            this.$store.commit('SET_PL_DIALOG_VALUE', false);
            this.$store.commit('SET_PL_DIALOG_MODE', null);
            this.$store.commit('SET_PL_NAME', null);
        },
    },
    computed: {
        ...mapGetters([
            'GET_PL_DIALOG_VALUE',
            'GET_PL_DIALOG_MODE',
            'GET_PL_NAME'
        ]),

        GET_PL_NAME: {
            get() {
                return this.$store.getters.GET_PL_NAME;
            },
            set(value) {
                this.$store.commit('SET_PL_NAME', value);
            },
        },
    },
    watch: {
        '$vuetify.breakpoint.width'(newWidth) {
            if (newWidth < 600) {
                this.dialogWidth = '90%';
            } else {
                this.dialogWidth = '40%';
            }
        },
    },

}
</script>