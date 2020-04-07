<template>
    <v-container style="background-color: #F2F2F2">
        <v-row 
            v-if="!loading"
            dense
        >
            <v-col
                v-for="message in messages"
                :key="message.created_at"
                cols="12"
            >
                <MessageContainer
                    :message="message"
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
import MessageContainer from "@/components/messageContainer.vue";
export default {
    name: 'Chat',
    props: [ 'messages', 'loading' ],
    components: {
        MessageContainer,
    },
}
</script>

<style scoped>
</style>