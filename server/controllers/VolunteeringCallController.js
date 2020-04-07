const VolunteeringCallRepo = require("../repo/VolunteeringCallRepo");
/**
 * @swagger
 * /volunteering-call:
 *  post:
 *    description: Create new application call
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: call
 *        schema:
 *              type: object
 *              required:
 *                   - title
 *                   - category
 *                   - tasks
 *                   - author
 *                   - endDate
 *              properties:
 *                  title:
 *                    type: string
 *                  category:
 *                    type: string
 *                  tasks:
 *                    type: string
 *                  author:
 *                    type: string
 *                  endDate:
 *                    type: string
 *    responses:
 *      '200':
 */
exports.createNewVolunteeringCall = async (req, res) => {
  const call = req.body.call;
  const callsaved = await VolunteeringCallRepo.saveNewVolunteeringCall(call);
  if(callsaved)
    return res.sendStatus(200);
  else
    return res.sendStatus(404);
};
/**
 * @swagger
 * /all-volunteering-calls:
 *   get:
 *     description: Returns list of all volunteering calls
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calls
 */

exports.listAllVolunteeringCalls = async (req, res) => {
  const calls = await VolunteeringCallRepo.getAllVolunteeringCalls();
  return res.json(calls);
};
/**
 * @swagger
 * /open-volunteering-calls:
 *   get:
 *     description: Returns list of only open volunteering calls
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calls
 */

exports.listOpenVolunteeringCalls = async (req, res) => {
  const calls = await VolunteeringCallRepo.getOpenVolunteeringCalls();
  return res.json(calls);
};
