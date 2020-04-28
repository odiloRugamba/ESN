import SearchService from '@/services/searchService'

const state = {
    canSearch: false,
    showSearchToolbar: false,
    isSearching: false,
    searchContext: '',
    searchResult: null,
    extras: null
}

const mutations = {
    setCanSearch(state, canSearch) {
        state.canSearch = canSearch;
    },
    setShowSearchToolbar(state, showSearchToolbar) {
        state.showSearchToolbar = showSearchToolbar;
    },
    setIsSearching(state, isSearching) {
        state.isSearching = isSearching;
    },
    setSearchContext(state, searchContext) {
        state.searchContext = searchContext;
    },
    setSearchResult(state, searchResult) {
        state.searchResult = searchResult;
    },
    setExtras(state, extras) {
        state.extras = extras;
    },
    clearSearch(state) {
        state.searchResult = null;
    },
    resetSearch(state) {
        state.canSearch = false;
        state.showSearchToolbar = false;
        state.isSearching = false;
        state.searchContext = '';
        state.searchResult = null;
        state.extras = null;
    },
}

const actions = {
    search({ commit, state }, { searchCriteria }) {
        SearchService.search(state.searchContext, searchCriteria, state.extras)
        .then(response => {
            if(response.status === 200) {
                commit('setSearchResult', response.data);
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}