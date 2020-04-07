<template>
    <v-container style="background-color: #F2F2F2">
        <v-row 
            v-if="!loading"
            dense
        >
            <v-col
                v-for="applicant in applics"
                :key="applicant._id"
                :name="applicant._id"
                cols="12"
            >
                <ApplicantContainer
                    :applicant="applicant"
                />
            </v-col>
        </v-row>
        <v-row 
            v-else
            dense
        >
            <v-col
                v-for="n in 5"
                :key="n"
                cols="12"
            >
                <v-skeleton-loader
                    loading
                    type="card"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ApplicantContainer from "@/components/applicantContainer";
export default {
    name: 'Applicants',
    props: [ 'applics', 'loading' ],
    components: {
        ApplicantContainer,
    },
    created(){
        
    }
}
</script>

<style scoped>
</style>