<template>
    <v-btn 
        icon
        @click="$emit('click')"
    >
        <v-icon v-text="icon"></v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'IconButtonAction',
    props: [ 'icon' ],
}
</script>

<style scoped>
</style>