//imports
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const userRepo = require("./repo/UserRepo");
const joinContr = require("./controllers/JoinController.js");
const msgContr = require("./controllers/MessageController.js");
const userContr = require("./controllers/UserController");
const searchController = require("./controllers/SearchController");
const announcementController = require("./controllers/AnnouncementController");
const lockdownController = require("./controllers/LockdownStatusController");
const trackLocController = require("./controllers/TrackLocationController");
const medicalTestController = require("./controllers/MedicalTestingController");
const volCallsCtrl = require("./controllers/VolunteeringCallController");
const volAppsCtrl = require("./controllers/VolunteeringApplicationController");
const coronaMessageController = require("./controllers/CoronaMessageController");
const locationController = require("./controllers/LocationController");
const adminController = require("./controllers/AdministrationController");
const { swaggerDocs } = require("./config/swagger");

// configuring the express server
const app = express();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Socket
const server = require('http').createServer(app);
const io = require("socket.io")(server);

//Setup passport and passport for socket.io
require("./config/passport")(passport, io);

// Swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//routes
//Login
app.post("/login", (req, res) => {
  joinContr.validateCredentials(req, res);
});

//register
app.post("/register", (req, res) => {
  joinContr.join(req, res);
});

//getting data about a user
app.head("/users/:username", (req, res) => {
  joinContr.findUser(req, res);
});

//getting a list of users
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
  joinContr.listUsers(req, res);
});

// check if login user is the message sender
app.post("/messages/public",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.body.sender) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  (req, res) => {
    msgContr.send_message(req, res).then(message => {
      if (message) {
        res.sendStatus(201);
        io.emit("new-public", message);
      }
      else {
        res.sendStatus(404);
      }
    })
  });

app.get("/messages/public", passport.authenticate("jwt", { session: false }), (req, res) => {
  msgContr.get_messages(req, res);
});

app.get("/announcements", passport.authenticate("jwt", { session: false }), (req, res) => {
  announcementController.getLatestAnnouncements(req, res);
});

// check if logged in user is sender user
app.get("/messages/private/:username1/:username2",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.params['username1'] || req.user.username === req.params['username1']) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  msgContr.getprivatemsgs
);

// check if logged in user is sender user
app.post("/messages/private",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.body.sender) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  (req, res) => {
    msgContr.send_privmessage(req, res).then(message => {
      if (message) {
        res.status(201).json(message);
        io.to(message.receiver).emit("new-private", message);
        io.to(message.sender).emit("new-private", message);
      }
      else {
        res.sendStatus(404);
      }
    })
  });

// check if logged in user is username
app.put("/users/:username/status",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.params.username) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  userContr.updateStatus);

// handle search request
app.post("/search", passport.authenticate("jwt", { session: false }), searchController.searchByCriteria);

app.get("/lockdown/status", passport.authenticate("jwt", { session: false }), lockdownController.get_lockdown_status);

// only coordinator can post announcement
app.post("/announcements", passport.authenticate("jwt", { session: false }), (req, res) => {
  if(req.user.role === 'coordinator')
  {
    announcementController.send_announcement(req, res).then(announcement => {
      if (announcement) {
        res.sendStatus(201);
        io.emit("new-announcement", announcement);
      }
      else {
        res.sendStatus(404);
      }
    })
  }
  else{
    res.sendStatus(401);
  }
});

// only city representative can update the lockdown
app.post("/lockdown/status",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'city_rep') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  lockdownController.update_lockdown_status);


// only medical worker can see the infection status
app.get("/users/infection/status",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'health_worker') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  medicalTestController.get_users_infection_status);

// check if logged in user is username
app.get("/users/:username/infection/status",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.params.username) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  userContr.get_infection_status);

// only medical worker can update the infection status
app.post("/users/:username/infection/status",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'health_worker') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  medicalTestController.update_user_infection_status);

// check if logged in user is username
app.post("/tracklocation/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.params.username) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  trackLocController.update_user_location);

// check if logged in user is username
app.put("/tracklocation/users/:username/permission",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.username === req.params.username) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  trackLocController.update_user_permission);

/*** Start of volunteering routes ****/

app.get('/all-volunteering-calls', passport.authenticate("jwt", { session: false }), volCallsCtrl.listAllVolunteeringCalls);

app.get('/open-volunteering-calls', passport.authenticate("jwt", { session: false }), volCallsCtrl.listOpenVolunteeringCalls);

// only for coordinator
app.post('/volunteering-call',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'coordinator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  volCallsCtrl.createNewVolunteeringCall);


// only for coordinator
app.post('/volunteering-applications',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'coordinator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  volAppsCtrl.listAllApplications);

app.post('/create-volunteering-application',
  passport.authenticate("jwt", { session: false }),
  volAppsCtrl.createNewApplication);

// only for coordinator
app.post('/decline-application',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'coordinator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  volAppsCtrl.declineApplication);

// only for coordinator
app.post('/approve-application',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === 'coordinator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  volAppsCtrl.approveApplication);

app.post('/check-application-status', passport.authenticate("jwt", { session: false }), volAppsCtrl.checkApplStatus);

/*** end of volunteering routes ****/

app.post("/coronamessages", passport.authenticate("jwt", { session: false }), (req, res) => {
  coronaMessageController.send_corona_message(req, res).then(message => {
    if (message) {
      res.sendStatus(201);
      io.emit("new-corona-msg", message);
    }
    else {
      res.sendStatus(404);
    }
  })
});

app.post("/sendLocation", passport.authenticate("jwt", { session: false }), (req, res) => {
  locationController.send_location(req, res).then(message => {
    if (message) {
      res.sendStatus(201);
      io.emit("new-location", message);
    }
    else {
      res.sendStatus(404);
    }
  })
});

app.post("/markCoronaMessage", (req, res) => {
  console.log("mark mark");
  coronaMessageController.update_corona_message_mark(req, res).then(message => {
    if (message) {
      console.log("mark mark");
      res.sendStatus(201);
    }
    else {
      res.sendStatus(404);
    }
  })
});

app.get("/coronamessages", passport.authenticate("jwt", { session: false }), (req, res) => {
  coronaMessageController.get_corona_messages(req, res);
});

app.get("/locations", passport.authenticate("jwt", { session: false }), (req, res) => {
  locationController.get_locations(req, res);
});

// Handle user profile administration
app.get("/allusers", 
  passport.authenticate("jwt", { session: false }), 
  (req, res, next) => {
    if (req.user.role === 'administrator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  (req, res) => {
  adminController.retrieveUsersList(req, res);
})

// handle update the user
app.post("/updateuser", 
  passport.authenticate("jwt", { session: false }), 
  (req, res, next) => {
    if (req.user.role === 'administrator') {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },
  (req, res) => {
    adminController.updateUserProfile(req, res, io);
})


// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")());
// serve pure static assets
app.use(express.static(__dirname + "/dist")); //Serves resources from public folder


// Handling sockets
io.on("connection", function (socket) {
  console.log("socket connected! ");

  socket.on("online", username => {
    if (userRepo.connect(username)) {
      io.emit("onlineusers", userRepo.onlineUsers);
      socket.join(username);
    }
  });

  socket.on("offline", username => {
    if (userRepo.disconnect(username)) {
      io.emit("onlineusers", userRepo.onlineUsers);
      socket.leave(username);
    }
  });

});

module.exports = server;
