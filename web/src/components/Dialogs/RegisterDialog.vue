<template>
    <v-dialog v-model="this.GET_REGISTER_DIALOG" persistent>
        <v-card color="#ecf0f1">
            <v-card-title>
                Register as a Voter
                <v-spacer></v-spacer>
                <v-btn small icon outlined @click="closeDialog"><v-icon color="red">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <v-form @submit.prevent="submitForm" ref="form">
                    <label>Personal Details</label>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field dense filled label="First Name" :rules="rules.required" v-model="firstname"
                                color="#34495e"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense filled label="Middle Name" v-model="midname" color="#34495e"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense filled label="Last Name" :rules="rules.required" v-model="lastname"
                                color="#34495e"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense filled label="Suffix" v-model="suffix" color="#34495e"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field dense filled label="Email" :rules="rules.email" v-model="email"
                                color="#34495e"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense filled label="Age" :rules="rules.age" maxlength="2" v-model="age"
                                type="number" color="#34495e"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete color="#34495e" v-model="gender" :rules="rules.required" dense label="Gender"
                                filled :items="genders" small-chips></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field dense filled label="Address" :rules="rules.required" v-model="address"
                                color="#34495e"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field color="#34495e" v-model="username" :rules="rules.required" dense filled
                                label="Username"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field color="#34495e" v-model="password" :rules="rules.required" dense filled
                                label="Password"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small block tile color="#3498db" type="submit">Register</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            genders: ['Male', 'Female', 'Others'],
            // Form V-models
            firstname: null,
            midname: null,
            lastname: null,
            suffix: null,
            email: null,
            gender: null,
            age: null,
            username: null,
            password: null,
            address: null,
            rules: {
                required: [
                    value => !!value || 'Field is required',
                ],
                email: [
                    (v) => !!v || "E-mail is required",
                    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                ],
                age: [
                    (v) => !!v || "Age is required",
                    (v) => /^\d{2}$/.test(v) || "Age must be a two-digit number",
                    (v) => parseInt(v, 10) >= 18 || "Age must be 18 and above",
                ],
            },
        }
    },
    methods: {
        submitForm() {
            if (this.$refs.form.validate()) {
                const payload = {
                    username: this.username,
                    password: this.password,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    address: this.address,
                    midname: this.midname,
                    suffix: this.suffix,
                    email: this.email,
                    gender: this.gender,
                    age: this.age,
                }
                this.$store.dispatch("Register", payload).then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        Swal.fire({
                            text: response.data.message,
                            icon: "success",
                        })
                        this.closeDialog();
                    }
                });
            } else {
                Swal.fire({
                    text: "Please Complete or Follow the Requirements of the Fields.",
                    icon: "warning"
                })
            }
        },
        closeDialog() {
            this.$store.commit('SET_REGISTER_DIALOG', false);
        },
    },
    computed: {
        ...mapGetters([
            'GET_REGISTER_DIALOG'
        ]),
    }

}
</script>