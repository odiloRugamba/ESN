const bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserRepo {

    constructor() {
        this.onlineUsers = [];
        // security issue to save clear text password
        this.initialAdmin = {
            username: 'ESNAdmin',
            password: '$2a$12$nvo8Cz3UipOtfLy2mLA6nOfpQRRP3zGNhnJVAWeYQgxU9uOat2nE.',
            role: 'administrator',
            current_status: {
                text: 'ok'
            }
        };
        
    }

    async saveUser(username, password) {
        const hashedPassword = await this.hashPassword(password);
        const user = new User({ username: username, password: hashedPassword, current_status: { text: 'undefined' } });
        const saveUser = await user.save()
            .then(res => {
                return true
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        if (saveUser) {

            return true;
        }
        return false;
    }

    // this function checks user's credentials
    async validateUser(username, password) {
        return User
            .find({ username: username })
            .then(users => {
                if (users && users[0]) {
                    const user = users[0];

                    return this.checkPasword(password, user.password);
                }
                return false;
            })
            .catch(err => {
                return false;
            });
    }

    connect(username) {
        if (this.onlineUsers.indexOf(username) === -1) {
            this.onlineUsers.push(username)
            return true;
        }
        return false;
    }

    disconnect(username) {
        if (this.onlineUsers.indexOf(username) !== -1) {
            this.onlineUsers.splice(this.onlineUsers.indexOf(username), 1)
            return true;
        }
        return false;
    }

    async listUsers() {
        const self = this;
        return await User
            .find({active: true}).then(users => {
                return self.usersConnection(users);
            })
            .catch(err => {
                console.log(err);
            });
    }

    orderUserAlphebeticallyOnlineFirst(users) {
        users.sort((a, b) => {
            if(a.connectivity === b.connectivity) {
                return a.username.localeCompare(b);
            }
            else if(a.connectivity) {
                return -1;
            }
            else {
                return 1;
            }
        });
    }

    async findUser(username) {
        return await User
            .findOne({ username: username });
    }

    usersConnection(users) {
        const self = this;
        users.forEach((user, index) => {
            user = user.getJSON();
            user['connectivity'] = self.onlineUsers.indexOf(user.username) !== -1;
            users[index] = user;
        });
        this.orderUserAlphebeticallyOnlineFirst(users);
        return users;
    }

    async searchUserByUsername(query) {

        return await User
            .find({ 
                username: { 
                    "$regex": query, 
                    "$options": "i" 
                },
                active: true
            })
            .then(users => {
                return this.usersConnection(users);
            });
    }

    async searchUserByStatus(query) {
        return await User
            .find({ "current_status.text": { "$regex": query, "$options": "i" } })
            .then(users => {
                return this.usersConnection(users);
            });
    }

    async updateStatus(username, status) {
        const user = await this.findUser(username);
        user.current_status.text = status;
        user.current_status.timestamp = Date.now();
        return await user.save().then(saveUser => {
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        });
    }

    async getInfectionStatus(username) {
        return await User.findOne({ username: username }).then(user => {
            return user.infection_status;
        });
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }

    async checkPasword(rawPassword, hashedPassword) {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }

    async retrieveUsers() {
        return await User.find().select({password: 0});
    }

    async updateUserDetails(user) {
        if (user.password) {
            const psw = await this.hashPassword(user.password);
            user.password = psw;

        } else {
            delete user.password;
        }
        const id = user._id;
        delete user._id;

        return await User.update({_id: id}, user);
    }

    async getActiveUsername() {
        const username = await User.find({active: true}, "username");
        return username.map(x => x.username);
    }

    initializeUsers() {
        return User(this.initialAdmin).save();
    }
}

const userRepo = new UserRepo();
Object.freeze(userRepo);

module.exports = userRepo
