const VolunteeringApplicationRepo = require("../repo/VolunteeringApplicationRepo");

/**
 * @swagger
 * /volunteering-call:
 *  post:
 *    description: apply for volunteering
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: application
 *        schema:
 *              type: object
 *              required:
 *                   - callId
 *                   - name
 *                   - phone
 *                   - email
 *                   - additionalDetails
 *                   - username
 *              properties:
 *                  callId:
 *                    type: string
 *                  name:
 *                    type: string
 *                  phone:
 *                    type: string
 *                  email:
 *                    type: string
 *                  additionalDetails:
 *                    type: string
 *                  username:
 *                    type: string
 *    responses:
 *      '200':
 */
exports.createNewApplication = async (req, res) => {
  const application = req.body.application;
  const savedApp = await VolunteeringApplicationRepo.saveApplication(application);
  if(savedApp)
    return res.sendStatus(200);
  return res.sendStatus(404);
};
/**
 * @swagger
 * /volunteering-applications:
 *   get:
 *     parameters:
 *        - in: body
 *          name: call
 *          required: true
 *          schema:
 *            type: string
 *     description: Returns all applications
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: applications
 */
exports.listAllApplications = async (req, res) => {
  const call = req.body.call;
    const apps = await VolunteeringApplicationRepo.getAllApplications(call);
    res.json(apps);
};
/**
 * @swagger
 * /approve-application:
 *  post:
 *    description: approve an application
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: application
 *        description: approve application
 *        schema:
 *              type: object
 *              required:
 *                   - application
 *                   - callId
 *              properties:
 *                  application:
 *                    type: string
 *                  callId:
 *                    type: string
 *    responses:
 *      '200':
 */
exports.approveApplication = async (req, res) => {
  const application = req.body.application;
  const savedApp = await VolunteeringApplicationRepo.approveApplication(application);
  if(savedApp)
    return res.sendStatus(200);
  return res.sendStatus(404);
};
  /**
   * @swagger
   * /decline-application:
   *  post:
   *    description: decline an application
   *    consumes:
   *        - application/json
   *    parameters:
   *      - in: body
   *        name: application
   *        description: decline application
   *        schema:
   *              type: object
   *              required:
   *                   - application
   *                   - callId
   *              properties:
   *                  application:
   *                    type: string
   *                  callId:
   *                    type: string
   *    responses:
   *      '200':
   */
exports.declineApplication = async (req, res) => {
  const application = req.body.application;
  const savedApp = await VolunteeringApplicationRepo.declineApplication(application);
  if(savedApp)
    return res.sendStatus(200);
  return res.sendStatus(404);
};
/**
 * @swagger
 * /check-application-status:
 *  get:
 *    description: check application status
 *    consumes:
 *        - application/json
 *    parameters:
 *      - in: body
 *        name: application
 *        schema:
 *              type: object
 *              required:
 *                   - username
 *                   - callId
 *              properties:
 *                  username:
 *                    type: string
 *                  callId:
 *                    type: string
 *    responses:
 *      '200':
 */
exports.checkApplStatus = async (req, res) => {
const application = req.body.application;
const status = await VolunteeringApplicationRepo.checkApplStatus(application);
if(status)
  return res.json(status);
return res.sendStatus(300);
};