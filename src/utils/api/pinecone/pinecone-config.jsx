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
const indexName = import.meta.env.VITE_PINECONE_INDEX;

/* const pinecone = new PineconeClient(); */

/* export const getPineconeClient = async () => {
  try {
    console.log("trying getPineconeClient");
    await pinecone.init({
      environment: environment,
      apiKey: apiKey,
    });
    const indexes = await pinecone.listIndexes();
    console.log(indexes);
    console.log("pineconeClient initialized");
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}; */

//This wasn't working, trying again
let pineconeClient = null; //|| PineconeClient;

export const getPineconeClient = async () => {
  //validateEnvironmentVariables();
  console.log(apiKey);
  console.log(environment);
  console.log(indexName);
  try {
    console.log("trying getPineconeClient");
    if (pineconeClient) {
      console.log("It makes it here!");
      return pineconeClient;
    } else {
      console.log("Went to ELSE");
      pineconeClient = new PineconeClient();

      await pineconeClient.init({
        apiKey: apiKey,
        environment: environment,
        projectName: indexName,
      });
    }
    return pineconeClient;
  } catch (e) {
    console.log(`error in getPineconeClient: ${e}`);
  }
};
