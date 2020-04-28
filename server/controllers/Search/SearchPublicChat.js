const SearchStrategy = require('./SearchStrategy');
const ChatRepo = require("../../repo/ChatRepo");

class SearchPublicChat extends SearchStrategy {

    async search(searchTerms) {
        return ChatRepo.searchPublicChatByText(searchTerms);
    }
}

module.exports = SearchPublicChat;