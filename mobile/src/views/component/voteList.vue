<template>
    <div>
        <v-card elevation="16" height="300" max-width="500" class="mx-auto">
            <v-virtual-scroll :bench="benched" :items="options" height="300" item-height="50">
                <template v-slot:default="{ item }">
                    <v-list-item :key="item.id" @click="handleItemClick(item)">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </v-card>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            options: [
                { id: 1, name: 'john', votes: 0 },
                { id: 2, name: 'michael', votes: 0 },
                { id: 3, name: 'jason', votes: 0 },
                { id: 4, name: 'angelo', votes: 0 },
                { id: 5, name: 'aron', votes: 0 },
                { id: 6, name: 'shiba', votes: 0 },
                { id: 7, name: 'vince', votes: 0 },
                { id: 8, name: 'cath', votes: 0 },
                { id: 9, name: 'andres', votes: 0 },
                { id: 10, name: 'billy', votes: 0 },
                { id: 11, name: 'reid', votes: 0 },
            ],
            benched: 0,
        };
    },
    computed: {
        items() {
            return Array.from({ length: this.length }, (k, v) => v + 1)
        },
        length() {
            return 7000
        },
    },
    methods: {
        handleItemClick(item) {
            console.log('Item clicked:', item);
        },
    },
    mounted() {
        // this.options.filter((item)=>{
        //     return item.pos
        // })
     },
};
</script>
  
<style scoped>
.bg {
    background-color: #f5f5f5;
    /* Set a light background color */
    border-radius: 8px;
    /* Add rounded corners */
}

.primary--text {
    color: #1976d2;
    /* Set a custom text color for the radio label */
}
</style>
