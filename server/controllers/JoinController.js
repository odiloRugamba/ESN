const UserRepo = require("../repo/UserRepo");
const jwt = require("jsonwebtoken");
const config = require("../config/main");
const ReservedUsername = require("../utils/ReservedUsername");


/**
 * @swagger
 * /login:
 *  post:
 *    description: Login in the citizen
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The citizen username
 *        schema:
 *              type: object
 *              required:
 *                   - username
 *                   - password
 *              properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.validateCredentials = async (req, res) => {
  const user = await UserRepo.findUser(req.body.username);

  const match = await UserRepo.validateUser(
    req.body.username,
    req.body.password
  );

  if (match) {
    if(!user.active) {
      return res.sendStatus(403);
    }
    else {

      // create a token
      const token = jwt.sign(user.getJSON(), config.secret, {
        expiresIn: 10000 // Expires in one week
      });

      return res.json({ user: user.getJSON(), token: token });
    }
  } else {
    return res.sendStatus(401);
  }
};


/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns list of citizens
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
exports.listUsers = async (req, res) => {
  const users = await UserRepo.listUsers();
  res.json(users);
};




/**
 * @swagger
 * /users/{username}:
 *  head:
 *    description: Check if the user with the username exists
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: path
 *        name: username
 *        description: The citizen username
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Username is taken
 *      '404':
 *        description: Username is available
 *      '406':
 *        description: Username is not acceptable
 */
exports.findUser = async (req, res) => {
  if(ReservedUsername.includes(req.params.username)) {
    res.sendStatus(406);
  }
  else {
    const users = await UserRepo.findUser(req.params.username);
    if (users) {
      res.sendStatus(200);
    } 
    else {
      res.sendStatus(404);
    }
  }
};


/**
 * @swagger
 * /register:
 *  post:
 *    description: Register in the citizen
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The citizen username
 *        schema:
 *              type: object
 *              required:
 *                   - username
 *                   - password
 *              properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.join = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  } else {
    const saved = await UserRepo.saveUser(req.body.username, req.body.password);
    if (!saved) {
      // 409: conflict
      return res.sendStatus(409);
    }
    const user = await UserRepo.findUser(req.body.username);
    const token = jwt.sign(user.getJSON(), config.secret, {
      expiresIn: 10000 // Expires in one week
    });

    return res.status(201).json({ user: user.getJSON(), token: token });
  }
};

exports.logout = async username => {
  UserRepo.logout(username);
};

exports.welcomeMessage = (req, res) => {
  res.send("welcomeMessage");
};
