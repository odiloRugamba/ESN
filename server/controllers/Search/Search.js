
class Search {

    constructor() {
        this.searchStrategy = null;
    }

    setStrategy(strategy) {
        this.searchStrategy = strategy;
    }

    async doSearch(searchTerms) {
        if(this.searchStrategy) {
            return await this.searchStrategy.search(searchTerms);
        }
        return null;
    }
}

module.exports = Search;