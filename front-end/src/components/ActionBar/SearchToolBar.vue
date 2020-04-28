<template>
        <v-app-bar
            app
            dark
            color="#8eacbb"
            flat
            class="mx-auto"
        >
            <v-btn 
                icon
                @click="cancelSearch"
            >
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-text-field
                v-model="terms"
                placeholder="Search"
                background-color="#8eacbb"
                solo
                flat
                full-width
                hide-details
                clearable
                autofocus
                @keyup.enter="search"
                @click:clear="clear"
            >
            </v-text-field>
        </v-app-bar>
</template>

<script>
export default {
    name: 'SearchToolBar',
    data() {
        return {
            terms: ''
        }
    },
    methods: {
        search() {
            this.$store.dispatch('search/search', {
                searchCriteria: this.terms
            });
        },
        clear() {
            this.$store.commit('search/clearSearch');
        },
        cancelSearch() {
            this.$store.commit('search/setShowSearchToolbar', false);
        }
    }
}
</script>

<style scoped>
</style>