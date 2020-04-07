const AnnouncementRepo = require("../repo/AnnouncementRepo");

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
exports.send_announcement = async (req, res) => {
  const ann = req.body;
  const msg = await AnnouncementRepo.saveAnnouncement(ann);
  return msg;
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

exports.getLatestAnnouncements = async (req, res) => {
  const ann = await AnnouncementRepo.getAnnouncement();
  res.json(ann);
};