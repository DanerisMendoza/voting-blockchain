<template>
    <v-app>
      <v-container>
        <v-row v-for="(item, index) in CANDIDATES" :key="item.id">
          <v-col cols="12">
            <v-item v-slot="{ active, toggle }">
              <v-card class="d-flex" @click="toggle">
                <v-row>
                  <v-col cols="12">
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>Position: {{ item.position }}</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
    
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            selectedCandidate: null,
            selected_position: null,
        };
    },
    computed: {
        ...mapGetters(["SELECTED_POSITION", "POSISTIONS", "CANDIDATES"]),
    },

    watch: {
        SELECTED_POSITION: {
            handler(val) {
                const payload = {
                    params: {
                        selectedPositionID: this.SELECTED_POSITION
                    }
                }
                this.$store.dispatch('GetCandidates', payload).then((response) => {
                    console.log(this.CANDIDATES)
                })
            }
        },
    },
    mounted() {
        const payload = {
            params: {
                selectedPositionID: this.SELECTED_POSITION
            }
        }
        this.$store.dispatch('GetCandidates', payload).then((response) => {
            console.log(this.CANDIDATES)
        })
    },
};
</script>
    
