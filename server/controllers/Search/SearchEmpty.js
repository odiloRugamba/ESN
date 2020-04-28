const SearchStrategy = require('./SearchStrategy');

class SearchEmpty extends SearchStrategy {

    async search(searchTerms) {
        return [];
    }
}

module.exports = SearchEmpty;