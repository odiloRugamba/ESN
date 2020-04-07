<template>
    <v-dialog
        persistent
        max-width="290"
        v-model="show"
    >
        <v-card>
        <v-card-title>New User</v-card-title>
        <v-card-text>Click ok if you would like to join the community</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="cancel"
            >
                Disagree
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="confirm"
            >
                Agree
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmJoin',
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