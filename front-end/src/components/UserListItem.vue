<template>
    <v-list-item @click="select">
        <v-list-item-avatar>
            <v-icon large>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-text="user.username"></v-list-item-title>
            <v-list-item-subtitle v-text="user.status.text"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-icon :color="getColor(user.connectivity)">mdi-circle</v-icon>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'UserListItem',
    props: [ 'user' ],
    methods: {
        select() {
            this.$emit('selected', this.user);
        },
        getColor(connected) {
            if(connected) {
                return 'green';
            }
            return 'grey lighten-1';
        }
    }
}
</script>

<style scoped>

</style>