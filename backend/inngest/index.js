import { Inngest } from "inngest";
import User from "../models.js/User.js";

export const inngest = new Inngest({ id: "movie-ticketing-app" });

// Helper function to extract user data from Clerk payload
const extractUserData = (eventData) => {
  // Use the actual structure from your payload
  return {
    _id: eventData.id,
    name: `${eventData.first_name || ''} ${eventData.last_name || ''}`.trim(),
    email: eventData.email_addresses[0]?.email_address || null,
    image: eventData.image_url || eventData.profile_image_url
  };
};

const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: "clerk/user.created" },
  async (event) => {
    try {
      console.log("Received Clerk event:", JSON.stringify(event, null, 2));
      
      // Extract data directly from event.data (the payload shows user data is at root level)
      const userData = extractUserData(event.data);
      
      console.log("Creating user:", userData);
      await User.create(userData);
      console.log("User created successfully");
    } catch (error) {
      console.error("User creation failed:", error);
      throw new inngest.FunctionError("Database create failed", { error });
    }
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: 'sync-delete-user-from-clerk' },
  { event: "clerk/user.deleted" },
  async (event) => {
    try {
      // Extract user ID directly from event.data
      const { id } = event.data;
      console.log("Deleting user:", id);
      await User.findByIdAndDelete(id);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("User deletion failed:", error);
      throw new inngest.FunctionError("Database delete failed", { error });
    }
  }
);

const syncUserUpdate = inngest.createFunction(
  { id: 'sync-update-user-from-clerk' },
  { event: "clerk/user.updated" },
  async (event) => {
    try {
      const userData = extractUserData(event.data);
      console.log("Updating user:", userData);
      await User.findByIdAndUpdate(
        userData._id, 
        userData, 
        { new: true, upsert: true } // Added upsert for safety
      );
      console.log("User updated successfully");
    } catch (error) {
      console.error("User update failed:", error);
      throw new inngest.FunctionError("Database update failed", { error });
    }
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdate];