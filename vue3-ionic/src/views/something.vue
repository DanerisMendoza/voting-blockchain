<template>
    <h1>vuetify</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return{
            vueVar: 'vue2'
        }
    },
    methods: {
        doSomething() {
            // Your logic here
        },
    },
    mounted() {
        console.log('hello from vue 2')
    }
});
</script>
