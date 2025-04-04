import { Client, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// Export initialized services
export const account = new Account(client);

// Export ID namespace for convenience
export { ID } from 'appwrite';
