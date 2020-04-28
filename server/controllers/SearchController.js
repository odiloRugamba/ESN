const Search = require('./Search/Search');
const SearchStrategyFactory = require('./Search/SearchStrategyFactory');
const StopWordRule = require('../utils/StopWordRule');

/**
  * @swagger
  * /search:
  *  post:
  *    description: search functionalty for users, public chats and private chats
  *    consumes:
  *        - application/json
  *    parameters:
  *      - in: body
  *        name: status
  *        description: search by a criteria
  *        schema:
  *              type: object
  *              required:
  *                   - context
  *                   - terms
  *              properties:
  *                  context:
  *                    type: string
  *                  terms:
  *                    type: string
  *                  extras:
  *                    type: object
  *    responses:
  *      '200':
  */
exports.searchByCriteria = async (req, res) => {

    const terms = StopWordRule.removeStopWords(req.body.terms);
    let searchData = {
        context: req.body.context,
        terms: terms,
    }
    if(req.body.extras) {
        searchData.sender = req.body.extras.username1;
        searchData.receiver = req.body.extras.username2;
    }

    let search = new Search();
    let searchStrategy = SearchStrategyFactory.getStrategy(searchData);
    search.setStrategy(searchStrategy);

    search.doSearch(searchData.terms).then(results => {
        res.json(results);
    });
}

