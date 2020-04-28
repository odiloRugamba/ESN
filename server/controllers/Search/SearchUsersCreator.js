const SearchStrategyCreator = require('./SearchStrategyCreator');
const SearchUsers = require('./SearchUsers');

class SearchUsersCreator extends SearchStrategyCreator {

    constructor() {
        super();
    }

    createStrategy(searchData) {
        const searchUsers = new SearchUsers();
        const searchUsersByStatus = searchData.terms.trim().startsWith("status:");
        if(searchUsersByStatus) {
            searchUsers.setSearchBy('status');
        }
        else {
            searchUsers.setSearchBy('username');
        }
        return searchUsers;
    }
}

module.exports = SearchUsersCreator;