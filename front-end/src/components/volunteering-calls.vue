<template>
    <v-container style="background-color: #F2F2F2">
        <v-row 
            v-if="!loading"
            dense
        >
            <v-col
                v-for="call in calls"
                :key="call._id"
                
                cols="12"
            >
                <volunteeringCallContainer
                    :call="call"
                    :isCoordinator="isCoordinator"
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
import volunteeringCallContainer from "@/components/volunteeringCallContainer";
export default {
    name: 'Chat',
    props: [ 'calls','isCoordinator', 'loading' ],
    components: {
        volunteeringCallContainer,
    }
}
</script>

<style scoped>
</style>