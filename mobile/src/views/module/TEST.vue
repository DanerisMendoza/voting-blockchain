<template>
    <v-app style="background: #f6f6f6">
        <v-main>
            <v-container>
                <h1>TEST</h1>
                <apexchart :type="'bar'" :options="getChartOptions"
                    :series="getChartSeries" />
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    computed: {
        chartOptionsYear() {
            return {
                chart: {
                    type: 'column',
                },
                xaxis: {
                    categories: this.categoriesYear,
                },
                title: {
                    text: 'Yearly Researches',
                },
                legend: {
                    show: true,
                },
            }
        },
        chartSeriesYear() {
            return [
                {
                    name: 'Research Count',
                    data: this.researchCountDataYear,
                }
            ]
        }
    },
    data() {
        return {
            // static version
            getChartOptions: {
                chart: {
                    type: 'column',
                },
                xaxis: {
                    categories: [''],
                },
                title: {
                    text: 'sample'
                },
                legend: {
                    show: true,
                },
            },
            getChartSeries: [
                {
                    name: ['Category 1'],
                    data: [44],
                },
                {
                    name: ['Category 2'],
                    data: [45],
                },
                {
                    name: ['Category 3'],
                    data: [60],
                },
            ],
            categoriesYear: [],
            researchCountDataYear: [],
        }
    },
};
</script>
  