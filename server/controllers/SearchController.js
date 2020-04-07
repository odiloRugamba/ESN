const UserRepo = require("../repo/UserRepo");
const ChatRepo = require("../repo/ChatRepo");
const AnnoncementRepo = require("../repo/AnnouncementRepo");

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

    if (req.body.context === "users") {
        const users = await searchUserByUsername(req.body.terms);
        return res.json(users);

    }
    else if (req.body.context === "public-messages") {
        return res.json(await searchPublicChatsByText(req.body.terms));
    }
    else if (req.body.context === "private-messages") {
        return res.json(await searchPrivateChatsByText(req.body.terms, req.body.extras.username1, req.body.extras.username2));
    }
    else if (req.body.context === "search-announcements") {
        return res.json(await searchAnnouncementsByText(req.body.terms));
    }
}

searchUserByUsername = async (query) => {
    const users = await UserRepo.searchUserByUsername(query);
    return users;
}

searchPublicChatsByText = async (query) => {
    return await ChatRepo.searchPublicChatByText(query);
}

searchPrivateChatsByText = async (query, username1, username2) => {
    return await ChatRepo.searchPrivateChatByText(query, username1, username2);
}

searchAnnouncementsByText = async (query) => {
    return await AnnoncementRepo.searchAnnouncementsByText(query);
}