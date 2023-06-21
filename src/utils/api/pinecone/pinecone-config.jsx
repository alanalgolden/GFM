import { PineconeClient } from "@pinecone-database/pinecone";

/* export function getEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} environment variable not set`);
  }
  return value;
} */

/* const validateEnvironmentVariables = () => {
  getEnv("VITE_PINECONE_API_KEY");
  getEnv("VITE_PINECONE_ENVIRONMENT");
  getEnv("VITE_PINECONE_INDEX");
}; */

const apiKey = import.meta.env.VITE_PINECONE_API_KEY;
const environment = import.meta.env.VITE_PINECONE_ENVIRONMENT;

let pineconeClient = null || PineconeClient;

export const getPineconeClient = async () => {
  //validateEnvironmentVariables();
  try {
    console.log("trying getPineconeClient");
    if (pineconeClient) {
      console.log("It makes it here!");
      return pineconeClient;
    } else {
      pineconeClient = new PineconeClient();

      await pineconeClient.init({
        apiKey: apiKey,
        environment: environment,
      });
    }
    return pineconeClient;
  } catch (e) {
    console.log(e);
  }
};
