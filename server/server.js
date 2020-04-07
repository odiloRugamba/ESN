//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
let path = require("path");
const swaggerUI = require("swagger-ui-express");
let userRepo = require("./repo/UserRepo");
const joinContr = require("./controllers/JoinController.js");
const msgContr = require("./controllers/MessageController.js");
const userContr = require("./controllers/UserController");
const searchController = require("./controllers/SearchController");
const announcementController = require("./controllers/AnnouncementController");
const volCallsCtrl = require("./controllers/VolunteeringCallController");
const volAppsCtrl = require("./controllers/VolunteeringApplicationController");
const { swaggerDocs } = require("./config/swagger");

//Connection to the database

// Do not run this if we are running jest 
if (process.env.JEST_WORKER_ID === undefined) {
  const mongodb_conn_module = require("./mongodbConnModule");
  let db = mongodb_conn_module.connect();
}
// configuring the express server
const app = express();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// handle fallback for HTML5 history API
//app.use(require("connect-history-api-fallback")());
// serve pure static assets
app.use(express.static(__dirname + "/dist")); //Serves resources from public folder


//Socket
const server = app.listen(process.env.PORT || 8081);
const io = require("socket.io")(server);

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
app.post("/username", (req, res) => {
  joinContr.findUser(req, res);
});

//getting a list of users
app.get("/users", (req, res) => {
  joinContr.listUsers(req, res);
});

app.post("/messages/public", (req, res) => {
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

app.post("/announcements", (req, res) => {
  announcementController.send_announcement(req, res).then(announcement => {
    if (announcement) {
      res.sendStatus(201);
      io.emit("new-announcement", announcement);
    }
    else {
      res.sendStatus(404);
    }
  })
});

app.get("/messages/public", (req, res) => {
  msgContr.get_messages(req, res);
});

app.get("/announcements", (req, res) => {
  announcementController.getLatestAnnouncements(req, res);
});

app.get("/messages/private/:username1/:username2", (req, res) => {
  msgContr.getprivatemsgs(req, res);
});

app.post("/messages/private", (req, res) => {
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



app.post("/update-status", userContr.updateStatus);
//if private select from db where sender and receiver 


// handle search request
app.post("/search", searchController.searchByCriteria);


/*** Start of volunteering routes ****/

app.get('/all-volunteering-calls', volCallsCtrl.listAllVolunteeringCalls);

app.get('/open-volunteering-calls', volCallsCtrl.listOpenVolunteeringCalls);

app.post('/volunteering-call', volCallsCtrl.createNewVolunteeringCall);


app.post('/volunteering-applications', volAppsCtrl.listAllApplications);

app.post('/create-volunteering-application', volAppsCtrl.createNewApplication);

app.post('/decline-application', volAppsCtrl.declineApplication);

app.post('/approve-application', volAppsCtrl.approveApplication);

app.post('/check-application-status', volAppsCtrl.checkApplStatus);

/*** end of volunteering routes ****/






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
