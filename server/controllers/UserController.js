const UserRepo = require("../repo/UserRepo");

exports.updateStatus = async (req, res) => {

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
  const ret = await UserRepo.updateStatus(
    req.body.username,
    req.body.userStatus
  ).then(response => {
    return res.sendStatus(200);
  })
    .catch(err => {
      console.log(err);
      return res.sendStatus(404);
    });
};
