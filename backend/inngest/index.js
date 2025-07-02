import { Inngest } from "inngest";
import User from "../models.js/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticketing-app" });

//inngest function to save clerk user data to mongodb
const syncUserCreation = inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:"clerk/user.created"},

    async (event)=>{
      const {id,first_name,last_name,email_addresses,image_url} = event[0]?.data;

      const userData = {
        _id:id,
        name:`${first_name} ${last_name}`,
        email:email_addresses[0]?.email_address,
        image:image_url
      }

      await User.create(userData);
    }
)

//inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id:'sync-delete-user-from-clerk'},
    {event:"clerk/user.deleted"},

    async (event)=>{
      const {id} = event.data;

      await User.findByIdAndDelete(id);
    }
)
//inngest function to update user in the database
const syncUserUpdate = inngest.createFunction(
    {id:'sync-update-user-from-clerk'},
    {event:"clerk/user.updated"},

    async (event)=>{
     const {id,first_name,last_name,email_addresses,image_url} = event.data;
     
     const userData = {
        _id:id,
        name:`${first_name} ${last_name}`,
        email:email_addresses[0]?.email_address,
        image:image_url
      }

      await User.findByIdAndUpdate(id,userData);
    }
)
// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdate];
