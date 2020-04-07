const bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserRepo {



    constructor() {
        this.onlineUsers = []
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
            .find().then(users => {
                return self.usersConnection(users);
            })
            .catch(err => {
                console.log(err);
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
        return users;
    }

    async searchUserByUsername(query) {
        return await User
            .find({ "username": { "$regex": query, "$options": "i" } })
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
            return false;
        });
        /*if (saveUser) {
            return true;
        }
        return false;*/
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }

    async checkPasword(rawPassword, hashedPassword) {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }
}

const userRepo = new UserRepo();
Object.freeze(userRepo);

module.exports = userRepo
