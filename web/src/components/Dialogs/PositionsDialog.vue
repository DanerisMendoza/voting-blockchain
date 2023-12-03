<template>
    <v-dialog v-model="GET_POSITION_DIALOG_VALUE" persistent :width="dialogWidth" transition="dialog-top-transition">
        <v-card>
            <v-card-title>
                Add Positions
                <v-spacer></v-spacer>
                <v-btn color="red" icon outlined small dense @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <v-text-field v-model="GET_POSITION_TITLE" dense filled outlined label="Name a Position"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn tile small color="green" @click="addPosition()">Add Position</v-btn>
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
        addPosition() {
            this.$store.commit("SET_POSITION_TITLE", this.GET_POSITION_TITLE);
            var payload = {
                name: this.GET_POSITION_TITLE
            };
            this.$store.dispatch("AddPosition", payload).then((response) => {
                if (response.icon == 'success') {
                    Swal.fire({
                        text: response.message,
                        icon: response.icon
                    })
                    this.$store.dispatch('GetPositions');
                    this.closeDialog();
                }
            });
        },
        closeDialog() {
            this.$store.commit('SET_POSITION_DIALOG_VALUE', false);
            this.$store.commit('SET_POSITION_DIALOG_MODE', null);
            this.$store.commit('SET_POSITION_TITLE', null);
        },
    },

    computed: {
        ...mapGetters([
            'GET_POSITION_DIALOG_VALUE',
            'GET_POSITION_DIALOG_MODE',
            'GET_POSITION_TITLE',
        ]),
        GET_POSITION_TITLE: {
            get() {
                return this.$store.getters.GET_POSITION_TITLE;
            },
            set(value) {
                this.$store.commit('SET_POSITION_TITLE', value);
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
    }

}
</script>