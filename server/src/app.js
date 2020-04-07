const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http)

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

require("../config/passport")(passport);

const mongodb_conn_module = require("./mongodbConnModule");
var db = mongodb_conn_module.connect();

const JoinController = require("../controllers/JoinController");
const MessageController = require("../controllers/MessageController");
const UserController = require("../controllers/UserController")

app.post("/users", JoinController.join);
app.put("/users/:username/status/:statusCode", UserController.updateStatus);
app.get("/users", passport.authenticate("jwt", { session: false }), JoinController.listUsers);
app.post("/users/authenticate", JoinController.validateCredentials);


// socket implementation
io.on("connection", socket => {
    // Socket logic goes here
    console.log("Websocket connected");

    socket.on("user-joined", async name => {
        MessageController.user_joined(socket, name);
    });

    socket.on("send-message", async ({ username, message }) => {
        MessageController.send_message(io, username, message);
    });

    socket.on("disconnect", async () => {
        MessageController.user_left(socket);
    });
});

http.listen(process.env.PORT || 8081);
