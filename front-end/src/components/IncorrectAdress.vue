<template>
    <v-dialog
        persistent
        max-width="290"
        v-model="show"
    >
        <v-card>
        <v-card-title>Incorrect Address </v-card-title>
        <v-card-text>Google Maps can not find the address entered.<br><br>
            Please verify the address provided.
            If the problem persists, send it as a message</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
                color="green darken-1"
                text
                @click="confirm"
            >
                Ok
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'IncorrectAddress',
    props: [ 'show' ],
    methods: {
        confirm() {
            this.$emit('confirmed')
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped>

</style>