const ChatRepo = require("../repo/ChatRepo");


exports.user_joined = async (socket, name) => {
  console.log("user-joined called!");
  const msg = await ChatRepo.listPublicMessages();
  console.log(msg);
  socket.emit("pre-messages", msg);
  socket.broadcast.emit("new-user", `${name} joined!`);
};


/**
 * @swagger
 * /messages/public:
 *  post:
 *    description: Send public message
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: message
 *        description: the message to send to the public
 *        schema:
 *              type: object
 *              required:
 *                   - sender
 *                   - text
 *                   - current_status
 *              properties:
 *                  sender:
 *                    type: string
 *                  text:
 *                    type: string
 *                  current_status:
 *                    type: object
 *                    properties:
 *                      type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.send_message = async (req, res) => {
  // TO-DO verify logged-in user is message sender
  // persist the message in the database
  const message = req.body;
  const savedMessage = await ChatRepo.savePublicChat(message);
  return savedMessage;
};


/**
 * @swagger
 * /messages/private:
 *  post:
 *    description: Send private message
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: message
 *        description: the message to send to the public
 *        schema:
 *              type: object
 *              required:
 *                   - sender
 *                   - receiver
 *                   - sender
 *              properties:
 *                  sender:
 *                    type: string
 *                  receiver:
 *                    type: string
 *                  text:
 *                    type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.send_privmessage = async (req, res) => {
  // persist the message in the database
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const text = req.body.text;
  const msg = await ChatRepo.savePrivateChat(sender, receiver, text);
  return msg;
};


/**
 * @swagger
 * /messages/public:
 *   get:
 *     description: Returns list of all public messages
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
exports.get_messages = async (req, res) => {
  // persist the message in the database
  const msgs = await ChatRepo.listPublicMessages();
  res.json(msgs);
};

exports.user_left = async socket => {
  console.log("user left");
  socket.broadcast.emit("user-left");
};

/**
 * @swagger
 * /messages/private/{username1}/{username2}:
 *   get:
 *     parameters:
 *        - in: path
 *          name: username1
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: username2
 *          required: true
 *          schema:
 *            type: string
 *     description: Send the private message from username1 to username2
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
exports.getprivatemsgs = async (req, res) => {
  const username1 = req.params['username1'];
  const username2 = req.params['username2'];
  console.log(username1);
  const msgs = await ChatRepo.getLatestMessages(username1, username2);
  return res.json(msgs);
}



exports.getallprivatemsgs = async (req, res) => {
  const msgs = await ChatRepo.getAllLatestMessages();
  res.json({ allmsgs: msgs });
}
