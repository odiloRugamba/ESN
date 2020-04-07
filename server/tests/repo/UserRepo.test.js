const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserRepo = require("../../repo/UserRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the UserRepo", () => {
    /*
    it("Test UserRepo.saveUser() function", async done => {
        // create a user
        await UserRepo.saveUser("johnx", "password");

        // check the database to see if the
        const user = await User.findOne({ username: "johnx" });

        expect(user.username).toEqual("johnx");
        done();
    });
    */

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
        console.log("users");
        console.log(users);

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

})


