const UserRepo = require("../repo/UserRepo");
const User = require("../models/User");

exports.retrieveUsersList = async (req, res) => {
    const users = await UserRepo.retrieveUsers();
    res.json(users);
};


exports.updateUserProfile = async (req, res, io) => {
    // Get user info in case we are changing the username
    const user = await User.findOne({_id: req.body._id});
    const success = await UserRepo.updateUserDetails(req.body);
    if (success) {
        res.sendStatus(200);
        if(!req.body.active) {
            io.to(user.username).emit("deactivate");
        }
    }
    else {
        res.sendStatus(404);
    }
};