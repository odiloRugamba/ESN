<template>
    <v-text-field
        label="Search"
        append-icon="mdi-magnify"
        v-model="terms"
        @keyup.enter="fetch"
    >
    </v-text-field>
</template>

<script>

import SearchService from '@/services/searchService'

export default {
    name: 'Search',
    props: [ 'context', 'extras' ],
    data() {
        return {
            terms: '',
        }
    },
    methods: {
        fetch() {
            if(this.terms === '') {
                this.$emit('reset');
            }
            else {
                const self = this;
                SearchService.search(this.context, this.terms, this.extras)
                .then(response => {
                    if(response.status === 200) {
                        self.$emit('searchresults', response.data);
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>