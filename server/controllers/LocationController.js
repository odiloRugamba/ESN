const LocationRepo = require("../repo/LocationRepo");

exports.send_location = async (req, res) => {
    // TO-DO verify logged-in user is message sender
    // persist the message in the database
    const location = req.body;
    const savedLocation = await LocationRepo.saveLocation(location);
    return savedLocation;
  };

  exports.get_locations = async (req, res) => {
    // persist the message in the database
    const locations = await LocationRepo.getLocations();
    res.json(locations);
  };