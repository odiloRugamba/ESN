/**
 * Class StopWordRule.js:
 *  Utility class with functionality for filtering stop words from the user-provided search terms.
 */


class StopWordRule {

    constructor() {
        this.stopWords = [
            'a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are',
            'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does',
            'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers',
            'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like',
            'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often',
            'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so',
            'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to',
            'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom',
            'why', 'will', 'with', 'would', 'yet', 'you', 'your'
        ];
    }


    /*
        Method removes specific stop words from the user-provided search terms.
     */

    async removeStopWords(searchString){
        searchString = "That is all it means to me? No I don't think so!";

        let splitWords = searchString.split(" ");

        splitWords.forEach(
            function(element, index){
                if (this.stopWords.includes(element)){
                    console.log("Element exists: ", element, index);
                    splitWords.splice(index, 1)
                }
            }
        );

        let filteredSearchString = splitWords.join(" ");
        console.log(filteredSearchString);

        return filteredSearchString;
    }
}


const stopWordRule = new StopWordRule();
Object.freeze(stopWordRule);

module.exports = stopWordRule;