import mongoose from "mongoose"

export const usersModelo = mongoose.model('users', new mongoose.Schema({

    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    profileGithub: String


}))


