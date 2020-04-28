const SearchStrategyCreator = require('./SearchStrategyCreator');
const SearchAnnouncement = require('./SearchAnnouncement');

class SearchAnnouncementCreator extends SearchStrategyCreator {

    constructor() {
        super();
    }

    createStrategy(searchData) {
        return new SearchAnnouncement();
    }
}

module.exports = SearchAnnouncementCreator;