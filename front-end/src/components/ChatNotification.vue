<template>
    <v-snackbar
        v-bind:value="value" 
        v-on:input="$emit('input', false)"
        :color="color"
    >
        {{message}}
        <v-btn
            color="accent"
            text
            :to="link"
            @click="$emit('input', false)"
        >
            Open
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: 'ChatNotification',
    props: [ 'link', 'message', 'value', 'color' ]
}
</script>

<style scoped>
</style>