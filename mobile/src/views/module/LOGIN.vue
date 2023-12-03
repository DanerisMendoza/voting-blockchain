<template>
    <v-app class="parent">
        <v-container fluid class="login-card">
            <div>
                <img src="../../assets/bg.png" alt="ADAMSON Logo" width="100" />
            </div>
            <v-row align="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <v-form ref="myForm" @submit.prevent="login">
                        <v-text-field v-model="username" :rules="rules.required" outlined dense
                            label="Username"></v-text-field>
                        <v-text-field v-model="password" type="password" :rules="rules.required" outlined dense
                            label="Password"></v-text-field>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox v-model="rememberMe" label="Remember me" class="mt-2" dense></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-btn type="submit" color="#002147" dense dark>Sign in</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
  
<script>

export default {
    data() {
        return {
            rememberMe: false,
            username: null,
            password: null,
            role: null,
            user_id: null,
            rules: {
                required: [
                    (v) => !!v || "Field is required",
                    (v) => (v !== null && v !== undefined && !/^\s*$/.test(v)) ||
                        "Field is required",
                ],
                min: [(v) => v.length >= 8 || "Min 8 characters"],
                email: [
                    (v) => !!v || "E-mail is required",
                    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                ],
                contact: [
                    (v) =>
                        (v !== null && v !== undefined && /^\d+$/.test(v)) ||
                        "Only numeric values are allowed",
                    (v) =>
                        (v !== null && v !== undefined && v.length >= 11) ||
                        "Min 11 characters",
                    (v) =>
                        (v !== null && v !== undefined && v.length <= 11) ||
                        "Max 11 characters",
                ],
            },
        };
    },


    methods: {
        login() {
            if (this.$refs.myForm.validate()) {
                const payload = {
                    username: this.username,
                    password: this.password,
                };
                this.$store.dispatch("LOGIN", payload).then((response) => {
                    if (response.message === "Login Successfully!") {
                        if (this.rememberMe) {
                            localStorage.setItem("vb-token", response.token);
                        }
                        else {
                            sessionStorage.setItem("vb-token", response.token);
                        }
                        this.$router.push('TABSPAGE');
                    } else if (response.message === "not active") {
                        this.$swal.fire({
                            icon: "warning", // Set a warning icon (you can choose a different icon class)
                            title: "Account is Not Activated", // Updated title
                            text: "Please Wait For Activation Of Your Account", // Updated text message
                            showConfirmButton: false, // Remove the "OK" button
                            timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
                        });
                    } else {
                        this.$swal.fire({
                            icon: "warning", // Set a warning icon (you can choose a different icon class)
                            title: "Credential Incorrect!", // Updated title
                            text: "Please Check your Username or Password!", // Updated text message
                            showConfirmButton: false, // Remove the "OK" button
                            timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
                        });
                    }
                });
            }
        },

    },
};
</script>
  
<style scoped>
* {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
    width: 25rem;
    border-radius: 0;
    padding: 1rem 1rem 0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid gray;
    background: gainsboro;
}

.login-btn {
    width: 100%;
}

.card-txt {
    font-size: 1rem;
}
.parent{
    background: ghostwhite;
}
</style>
  