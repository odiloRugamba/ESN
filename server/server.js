//imports
const app = require("./app");
const UserRepo = require('./repo/UserRepo');

//Connection to the database
const mongodb_conn_module = require("./mongodbConnModule");
let db = mongodb_conn_module.connect();

// Add initial users
db.on('open', ref => {
    db.db.listCollections().toArray((err, collections) => {
        const userCollectionExists = collections.some(x => x.type === 'collection' && x.name === 'users');
        if(!userCollectionExists) {
            UserRepo.initializeUsers().then(() => {});
        }
    });
});

//Socket
const server = app.listen(process.env.PORT || 8081);
