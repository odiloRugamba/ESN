const LockdownStatusRepo = require("../repo/LockdownStatusRepo");

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
exports.get_lockdown_status = async (req, res) => {
  const status = await LockdownStatusRepo.getLockdownStatus();
  res.json(status);
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
exports.update_lockdown_status = async (req, res) => {
  await LockdownStatusRepo.updateLockdownStatus(req.body.status);
  res.sendStatus(200);
};
