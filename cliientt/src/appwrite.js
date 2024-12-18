import { Client, Account, ID } from "appwrite";

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("4444"); // Replace with your Project ID

export const account = new Account(client);
export const IDGenerator = ID;
