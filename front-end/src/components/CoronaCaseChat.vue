<template>
    <v-container style="background-color: #F2F2F2">
        <v-row 
            v-if="!loading"
            dense
        >
            <v-col
                v-for="msg in all"
                :key="msg.created_at"
                cols="12"
            >
                <component 
                    :is="msg.type"
                    :message="msg"
                >
                </component>
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
import MessageContainer from "@/components/CoronaMessageContainer.vue";
import MapContainer from "@/components/mapContainer.vue";
export default {
    name: 'CoronaCaseChat',
    props: [ 'messages', 'addresses' ,'loading' ],
    components: {
        MessageContainer,
        MapContainer,
    },
    computed: {
        all: function() {
            const result = [];
            let messages = this.messages.forEach(x => {
                x['type'] = 'MessageContainer';
                result.push(x);
            });
            let addresses = this.addresses.forEach(x => {
                x['type'] = 'MapContainer';
                result.push(x);
            });
            result.sort((a, b) => {
                const dateA = new Date(a['created_at']);
                const dateB = new Date(b['created_at']);
                return dateA.getTime() > dateB.getTime();
            });
            return result;
        }
    }
}
</script>

<style scoped>
</style>