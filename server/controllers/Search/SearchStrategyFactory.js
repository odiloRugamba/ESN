const SearchAnnouncementCreator = require('./SearchAnnouncementCreator');
const SearchPublicChatCreator = require('./SearchPublicChatCreator');
const SearchPrivateChatCreator = require('./SearchPrivateChatCreator');
const SearchUsersCreator = require('./SearchUsersCreator');
const SearchEmptyCreator = require('./SearchEmptyCreator');

class SearchStrategyFactory {

    constructor() {
    }

    static getStrategy(searchData) {
        let strategyCreator = null;
        if(searchData.terms === '') {
            strategyCreator = new SearchEmptyCreator();
        }
        else if(searchData.context === 'users') {
            strategyCreator = new SearchUsersCreator();
        }
        else if(searchData.context === 'public-messages') {
            strategyCreator = new SearchPublicChatCreator();
        }
        else if(searchData.context === 'private-messages') {
            strategyCreator = new SearchPrivateChatCreator();
        }
        else if(searchData.context === 'search-announcements') {
            strategyCreator = new SearchAnnouncementCreator();
        }
        if(strategyCreator !== null) {
            return strategyCreator.createStrategy(searchData);
        }
        return null;
    }
}

module.exports = SearchStrategyFactory;