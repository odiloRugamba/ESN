const SearchStrategyCreator = require('./SearchStrategyCreator');
const SearchPublicChat = require('./SearchPublicChat');

class SearchPuclicChatCreator extends SearchStrategyCreator {

    constructor() {
        super();
    }

    createStrategy(searchData) {
        return new SearchPublicChat();
    }
}

module.exports = SearchPuclicChatCreator;