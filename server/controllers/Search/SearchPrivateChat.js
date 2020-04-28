const SearchStrategy = require('./SearchStrategy');
const ChatRepo = require("../../repo/ChatRepo");

class SearchPrivateChat extends SearchStrategy {

    constructor() {
        super();
    }

    setSender(sender) {
        this.sender = sender;
    }

    setReceiver(receiver) {
        this.receiver = receiver;
    }

    async search(searchTerms) {
        return ChatRepo.searchPrivateChatByText(searchTerms, this.sender, this.receiver);
    }
}

module.exports = SearchPrivateChat;