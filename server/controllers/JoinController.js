const UserRepo = require("../repo/UserRepo");
const jwt = require("jsonwebtoken");
const config = require("../config/main");


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
    // create a token
    const token = jwt.sign(user.getJSON(), config.secret, {
      expiresIn: 10000 // Expires in one week
    });
    console.log("role::"+user.role);
    return res.json({ success: true, status: user.current_status.text,role: user.role, token: token });
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
 * /username:
 *  post:
 *    description: Check if the user with the username exists
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
 *              properties:
 *                  username:
 *                    type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.findUser = async (req, res) => {
  const users = await UserRepo.findUser(req.body.username);
  if (users) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
    res.sendStatus(404);
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
    Console.log("clicked to join");
    res.json({ success: false, message: "Username and Password required" });
  } else {
    const saved = await UserRepo.saveUser(req.body.username, req.body.password);
    if (!saved) {
      return res.json({
        success: false,
        message: "username address already exists"
      });
    }
    res.json({ success: true, message: "Successfully created new user!" });
  }
};

exports.logout = async username => {
  UserRepo.logout(username);
};

exports.welcomeMessage = (req, res) => {
  res.send("welcomeMessage");
};
