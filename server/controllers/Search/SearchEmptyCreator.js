const SearchStrategyCreator = require('./SearchStrategyCreator');
const SearchEmpty = require('./SearchEmpty');

class SearchEmptyCreator extends SearchStrategyCreator {

    constructor() {
        super();
    }

    createStrategy(searchData) {
        return new SearchEmpty();
    }
}

module.exports = SearchEmptyCreator;