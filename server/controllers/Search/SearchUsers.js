const SearchStrategy = require('./SearchStrategy');
const UserRepo = require("../../repo/UserRepo");

class SearchUsers extends SearchStrategy {

    constructor() {
        super();
    }

    setSearchBy(searchBy) {
        this.searchBy = searchBy;
    }

    async search(searchTerms) {
        if(this.searchBy === 'username') {
            return this.searchUserByUsername(searchTerms);
        }
        else if(this.searchBy === 'status') {
            return this.searchUserByStatus(searchTerms.replace('status:', '').trim());
        }
        return null;
    }

    searchUserByUsername(username) {
        return UserRepo.searchUserByUsername(username);
    }

    searchUserByStatus(status) {
        return UserRepo.searchUserByStatus(status);
    }
}

module.exports = SearchUsers;