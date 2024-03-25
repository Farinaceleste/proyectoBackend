import mongoose from "mongoose";

const messagesColl = "messages";
const messagesSchema = new mongoose.Schema (

    {
        email: {
            type: String, 
            required: true, 
            unique: true

        } , 
        messages: String, 
       
    }, 
    {
        timeStramps: true, strict: false
    }


)

export const modeloMessages = mongoose.model(messagesColl, messagesSchema);

