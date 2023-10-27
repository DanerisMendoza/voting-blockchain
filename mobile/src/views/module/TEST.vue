<template>
    <v-app style="background: #f6f6f6">
        <v-main>
            <v-container>
                <v-row v-for="item in options" :key="item.id" cols="12" md="4">
                    <v-col>
                        <v-item v-slot="{ active, toggle }">
                            <v-card class="d-flex align-center" height="200" @click="toggle">
                                <v-card-title>{{ item.name }}</v-card-title>
                                <div v-if="active" class="text-h5 flex-grow-1 text-center">
                                    <!-- Your scrollable content goes here -->
                                </div>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    data() {
        return {
            selected_position: null,
            options: [
                { id: 1, name: 'john', votes: 0 },
                { id: 2, name: 'michael', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
            ],
        }
    }
};
</script>
  