<template>
    <div>
        <v-row no-gutters>
            <v-col cols="2">
                <AdminNav />
            </v-col>
            <v-col cols="10">
                <Calendar />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AdminNav from "@/components/Navbars/AdminNav.vue";
import Calendar from "@/components/Calendars/Calendars.vue"
export default {
    components: {
        AdminNav,
        Calendar
    }
}
</script>