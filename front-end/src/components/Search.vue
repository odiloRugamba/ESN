<template>
<div>
    <v-text-field
        label="Search"
        v-model="terms"
        clearable
        @keydown.enter="fetch(terms)"
        @click:clear="$emit('reset')"
    >
        <template v-slot:append-outer>
            <v-menu
                v-model="showStatusMenu"
            >
                <template v-slot:activator="{}">
                    <v-icon @click="showStatusMenu = true">mdi-emoticon-outline</v-icon>
                </template>
                <v-list>
                    <v-list-item
                        v-for="status in statuses"
                        :key="status.value"
                        @click="onStatusClick(status)"
                    >
                        <v-list-item-title>{{status.text}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-text-field>
</div>
</template>

<script>

import SearchService from '@/services/searchService'

export default {
    name: 'Search',
    props: [ 'context', 'extras' ],
    data() {
        return {
            showStatusMenu: false,
            terms: '',
            statuses: [ 
                {
                    text: 'OK',
                    value: 'status: ok'
                },
                {
                    text: 'Help',
                    value: 'status: help'
                },
                {
                    text: 'Emergency',
                    value: 'status: emergency'
                }
            ]
        }
    },
    methods: {
        fetch(terms) {
            if(terms === '') {
                this.$emit('reset');
            }
            else {
                const self = this;
                this.$emit('searching');
                SearchService.search(this.context, terms, this.extras)
                .then(response => {
                    if(response.status === 200) {
                        self.$emit('searchresults', response.data);
                    }
                    else {
                        self.$emit('searchend');
                    }
                }).catch(() => {
                    self.$emit('searchend');
                })
            }
        },
        onStatusClick(status) {
            this.terms = status.text;
            this.fetch(status.value);
        }
    }
}
</script>

<style scoped>

</style>