const bcrypt = require('bcryptjs');
const UserRepo = require("../../repo/UserRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the UserRepo", () => {

    it("Test UserRepo.saveUser() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        // check the database to see if the
        const user = await User.findOne({ username: "johnx" });

        expect(user.current_status.text).toEqual('undefined');
        done();
    });


    it("Test UserRepo.validateUser() function", async done => {
        // create a new user in the database
        const user = await User({ username: 'johnx1', password: "password", current_status: { text: 'help' } });
        // save the user
        await user.save()


        // check the database to see if the
        const valid = await UserRepo.validateUser("johnx1", "password");

        // todp change later
        expect(valid).toEqual(false);
        done();
    });

    it("Test UserRepo.listUsers() function", async done => {
        // create a new users in the database
        const user2 = await User({ username: 'johnx2', password: "password", current_status: { text: 'help' } });
        await user2.save()
        const user3 = await User({ username: 'johnx3', password: "password", current_status: { text: 'help' } });
        await user3.save()
        const user4 = await User({ username: 'johnx4', password: "password", current_status: { text: 'help' } });
        await user4.save()


        // check the database to see if the
        const users = await UserRepo.listUsers();

        expect(users.length).toEqual(3);
        done();
    });

    it("Test UserRepo.hashPassword() function", async done => {
        // get the password and test if its working fine
        const plainPassword = "SecretPass1234";
        const hashedPassword = await UserRepo.hashPassword(plainPassword);

        // compare the hashed and plain password match
        const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

        expect(passwordMatch).toEqual(true);
        done();
    });

    it("Test UserRepo.checkPasword() function", async done => {
        // get the password and test if its working fine
        const plainPassword = "SecretPass1234";
        const hashedPassword = await bcrypt.hash(plainPassword, 12);

        // compare the hashed and plain password match
        const passwordMatch = await UserRepo.checkPasword(plainPassword, hashedPassword);

        expect(passwordMatch).toEqual(true);
        done();
    });

    it("Test UserRepo.findUser() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        // check the database to see if the
        const expectedUser = await User.findOne({ username: "johnx" });
        const actualUser = await UserRepo.findUser("johnx");

        expect(expectedUser._id).toEqual(actualUser._id);
        done();
    });

    it("Test UserRepo.updateStatus() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        let user = await User.findOne({ username: "johnx" });
        expect(user.current_status.text).toEqual('undefined');

        const result = await UserRepo.updateStatus('johnx', 'help');
        expect(result).toEqual(true);

        user = await User.findOne({ username: "johnx" });
        expect(user.current_status.text).toEqual('help');

        done();
    });

    it("Test UserRepo.getInfectionStatus() function", async done => {
        // create a user
        const expectedInfectionStatus = 'negative';
        const user = await User({
            username: 'johnx',
            password: "password",
            infection_status: {
                status: expectedInfectionStatus
            }
        });
        await user.save()

        const actualInfectionStatus = await UserRepo.getInfectionStatus("johnx");

        expect(actualInfectionStatus.status).toEqual(expectedInfectionStatus);
        done();
    });

    it("Test UserRepo.connect() function", async done => {
        const result = UserRepo.connect('johnx');
        expect(result).toEqual(true);

        expect(UserRepo.onlineUsers.indexOf('johnx')).not.toEqual(-1);

        done();
    });

    it("Test UserRepo.disconnect() function", async done => {

        const result = UserRepo.disconnect('johnx');
        expect(result).toEqual(true);

        expect(UserRepo.onlineUsers.indexOf('johnx')).toEqual(-1);

        done();
    });

    it("Test UserRepo.usersConnection() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");
        await UserRepo.saveUser("johny", "passwory");
        await UserRepo.saveUser("johnz", "passworz");

        UserRepo.connect('johnx');
        UserRepo.connect('johnz');

        const users = await User.find();
        const actualUsers = await UserRepo.usersConnection(users);
        expect(actualUsers.length).toEqual(3);

        expect(actualUsers.filter(x => x.connectivity).length).toEqual(2);
        done();
    });

    it("Test connect twice same user in UserRepo.connect() function", async done => {

        const result = await UserRepo.connect('johnx');
        expect(result).toEqual(false);

        done();
    });

    it("Test disconnect twice same user in UserRepo.disconnect() function", async done => {

        let result = await UserRepo.disconnect('johnx');
        expect(result).toEqual(true);

        result = await UserRepo.disconnect('johnx');
        expect(result).toEqual(false);

        done();
    });

    it("Test duplicate user in UserRepo.saveUser() function", async done => {
        // create a user
        let result = await UserRepo.saveUser("johnx", "password");
        expect(result).toEqual(true);

        result = await UserRepo.saveUser("johnx", "password");
        expect(result).toEqual(false);

        done();
    });

    it("Test non-existent user in UserRepo.validateUser() function", async done => {

        let result = await UserRepo.validateUser('johnx', 'password');
        expect(result).toEqual(false);

        done();
    });

    it("Test invalid status in UserRepo.updateStatus() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        const result = await UserRepo.updateStatus('johnx', 'newstatus');
        expect(result).toEqual(false);
        done();
    });

    it("Test able to set active to false UserRepo.updateUserDetails() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        let user = await User.findOne({ username: "johnx" });

        user.active = false;
        const result = await UserRepo.updateUserDetails(user);

        user = await User.findOne({ username: "johnx" });

        expect(user.active).toEqual(false);
        done();
    });


})
