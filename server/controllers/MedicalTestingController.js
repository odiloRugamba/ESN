const medicalTestingRepo = require("../repo/MedicalTestingRepo");

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
exports.get_users_infection_status = async (req, res) => {
  const infections = await medicalTestingRepo.getUsersInfectionStatus();
  res.json(infections);
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
exports.update_user_infection_status = async (req, res) => {
  const ret = await medicalTestingRepo.updateInfectionStatus(req.params['username'], req.body.status)
    .then(response => {
      if(response) {
        return res.sendStatus(200);
      }
      else {
        return res.sendStatus(404);
      }
    })
    .catch(err => {
      return res.sendStatus(404);
    });
};
