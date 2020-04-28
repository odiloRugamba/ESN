const mongoose = require('mongoose')
const testDatabase = require("../../config/main").test_db
const dbHandler = require('../db-handler');


const User = require("../../models/User");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test User Model", () => {



    it('est create user', async done => {
        // create the user
        const user = new User({ username: "john33", password: "johndoe", current_status: { text: 'help' } });
        // save the user
        await user.save();
        // search for the created user
        const searchedUser = await User.findOne({ username: "john33" });

        const expected = "john33";
        const actual = searchedUser.username;

        expect(actual).toEqual(expected);
        done();
    });


    it("test update user", async done => {
        // create a new user
        const user = await User({ username: 'john10', password: "johndoe", current_status: { text: 'help' } });
        // save the user
        await user.save()

        // update the username 
        user.username = "jack";
        //save the changes
        await user.save();

        expect(user.username).toEqual("jack");
        done();
    });

    it("test delete user", async (done) => {
        // create a new user
        const user = await User({ username: 'john11', password: "johndoe", current_status: { text: 'help' } });
        // save the user
        await user.save()

        //delete the user
        await User.remove({ username: "john11" });

        // attempt to get the user in the database
        const savedUser = await User.findOne({ username: "john11" });
        // test to see it return empty
        expect(savedUser).toBeFalsy();
        done();
    })

});
