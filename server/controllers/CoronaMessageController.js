const CoronaMessageRepo = require("../repo/CoronaMessageRepo");

exports.send_corona_message = async (req, res) => {
    // TO-DO verify logged-in user is message sender
    // persist the message in the database
    const message = req.body;
    const savedMessage = await CoronaMessageRepo.saveCoronaMessage(message);
    return savedMessage;
  };

  exports.update_corona_message_mark = async (req, res) => {
    const message = req.body;
    const savedMessage = await CoronaMessageRepo.updateCoronaMessageMark(message);
    return savedMessage;
  };

  exports.get_corona_messages = async (req, res) => {
    // persist the message in the database
    const msgs = await CoronaMessageRepo.getAllCoronaMessages();
    res.json(msgs);
  };