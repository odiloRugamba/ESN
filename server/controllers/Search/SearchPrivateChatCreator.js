const SearchStrategyCreator = require('./SearchStrategyCreator');
const SearchPrivateChat = require('./SearchPrivateChat');

class SearchPrivateChatCreator extends SearchStrategyCreator {

    constructor() {
        super();
    }

    createStrategy(searchData) {
        const searchPrivateChat = new SearchPrivateChat();
        searchPrivateChat.setSender(searchData.sender);
        searchPrivateChat.setReceiver(searchData.receiver);
        return searchPrivateChat;
    }
}

module.exports = SearchPrivateChatCreator;