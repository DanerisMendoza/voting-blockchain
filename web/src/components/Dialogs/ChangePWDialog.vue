<template>
    <v-dialog v-model="GET_PW_DIALOG" persistent :width="dialogWidth" transition="dialog-top-transition">
        <v-card tile>
            <v-card-title>
                Change Password
                <v-spacer></v-spacer>
                <v-btn color="red" icon outlined small dense @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <v-text-field v-model="GET_NEW_PW" dense outlined filled label="Enter New Password"
                    :type="showNewPassword ? 'text' : 'password'" append-icon="mdi-eye"
                    @click:append="togglePassword('showNewPassword')"></v-text-field>

                <v-text-field v-model="GET_CNEW_PW" dense outlined filled label="Confirm New Password"
                    :type="showNewPassword ? 'text' : 'password'" append-icon="mdi-eye"
                    @click:append="togglePassword('showNewPassword')"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn tile small color="primary" @click="changePass()">Confirm</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            dialogWidth: '40%',
            showNewPassword: false,
        }
    },
    methods: {
        togglePassword(field) {
            this[field] = !this[field];
        },
        changePass() {
            const minLength = 8;
            var payload = {
                password: this.GET_NEW_PW
            };

            if (this.GET_CNEW_PW !== this.GET_NEW_PW) {
                Swal.fire({
                    text: "Passwords do not match",
                    icon: "warning"
                });
            } else if (this.GET_NEW_PW.length < minLength) {
                Swal.fire({
                    text: `Password must be at least ${minLength} characters long`,
                    icon: "warning"
                });
            } else {
                this.$store.dispatch("ChangePassword", payload).then((response) => {
                    if (response.icon == 'success') {
                        Swal.fire({
                            text: "Password changed successfully",
                            icon: response.icon
                        });
                        this.closeDialog();
                        this.$store.dispatch("Logout");
                    }
                })

            }
        },

        closeDialog() {
            this.$store.commit("SET_PW_DIALOG", false);
            this.$store.commit("SET_CNEW_PW", null);
            this.$store.commit("SET_NEW_PW", null);
        },
    },
    computed: {
        ...mapGetters([
            'GET_PW_DIALOG',
            'GET_NEW_PW',
            'GET_CNEW_PW',
        ]),
        GET_CNEW_PW: {
            get() {
                return this.$store.getters.GET_CNEW_PW;
            },
            set(value) {
                this.$store.commit('SET_CNEW_PW', value);
            },
        },

        GET_NEW_PW: {
            get() {
                return this.$store.getters.GET_NEW_PW;
            },
            set(value) {
                this.$store.commit('SET_NEW_PW', value);
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