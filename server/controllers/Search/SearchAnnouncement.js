const SearchStrategy = require('./SearchStrategy');
const AnnoncementRepo = require("../../repo/AnnouncementRepo");

class SearchAnnouncement extends SearchStrategy {

    async search(searchTerms) {
        return AnnoncementRepo.searchAnnouncementsByText(searchTerms);
    }
}

module.exports = SearchAnnouncement;