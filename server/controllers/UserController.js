const UserRepo = require("../repo/UserRepo");

exports.updateStatus = async (req, res) => {

  /**
   * @swagger
   * /users/{username}/status:
   *  put:
   *    description: Update user status
   *    consumes:
   *        - application/json
   *    parameters:
   *      - in: body
   *        name: status
   *        description: update a status
   *        schema:
   *              type: object
   *              required:
   *                   - username
   *                   - status
   *              properties:
   *                  username:
   *                    type: string
   *                  status:
   *                    type: string
   *    responses:
   *      '200':
   */
  UserRepo.updateStatus(
    req.params.username,
    req.body.status
  ).then(response => {
    if(response) {
      res.sendStatus(200);
    }
    else {
      res.sendStatus(404);
    }
  });
};

exports.get_infection_status = async (req, res) => {

  /**
   * @swagger
   * /update-status:
   *  post:
   *    description: Update user status
   *    consumes:
   *        - application/json
   *    parameters:
   *      - in: body
   *        name: status
   *        description: update a status
   *        schema:
   *              type: object
   *              required:
   *                   - username
   *                   - status
   *              properties:
   *                  username:
   *                    type: string
   *                  status:
   *                    type: string
   *    responses:
   *      '200':
   */
  const ret = await UserRepo.getInfectionStatus(req.params['username']).then(response => {
    return res.json(response);
  })
  .catch(err => {
    return res.sendStatus(404);
  });
};
