const trackLocationRepo = require("../repo/TrackLocationRepo");

/**
 * @swagger
 * /announcements:
 *  post:
 *    description: Login in the citizen
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: announcement
 *        description: Send an announcement to citizen
 *        schema:
 *              type: object
 *              required:
 *                   - sender
 *                   - text
 *              properties:
 *                  sender:
 *                    type: string
 *                  text:
 *                    type: string
 *    responses:
 *      '200':
 */
exports.update_user_location = async (req, res) => {
  await trackLocationRepo.updateLocation(req.params['username'], req.body.lat, req.body.long);
  res.sendStatus(201);
};

// /
/**
 * @swagger
 * /announcements:
 *   get:
 *     description: Returns list of all announcements
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
exports.update_user_permission = async (req, res) => {
  await trackLocationRepo.updatePermission(req.params['username'], req.body.status);
  res.sendStatus(200);
};
