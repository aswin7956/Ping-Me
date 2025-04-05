import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req , res) => {
    try{
        const {message} = req.body;
        const {id : receiverId} = req.params ;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : { $all: [senderId , receiverId]}
        });

        if (!conversation){ 
            conversation = await Conversation.create({
                participants : [senderId , receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        
        //await conversation.save();
        //await newMessage.save();

        await Promise.all([conversation.save() , newMessage.save()]) // this will make it to do both operations simultaneously

        // here we will add the socket io functionality

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //io.to (<socketId>).emit() is used to send events  to specific clients
            io.to(receiverSocketId).emit("newMessage" , newMessage)
        }




        res.status(201).json({message : newMessage})

    }catch(error){
        console.log("error in sending controller" , error.message);
        res.status(500).json({error : "internal server error"})
    }
}

export const getMessage = async (req , res) => {
    try {
        const {id : userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId , userToChatId]}
        }).populate("messages") // this enables to recieve not the reference but the actual message itself

        if (!conversation){
            return res.status(200).json([])
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
        
    } catch (error) {

        console.log("error in receiving controller" , error.message);
        res.status(500).json({error : "internal server error"})
        
    }
}
 