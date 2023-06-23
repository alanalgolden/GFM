import { utils } from "@pinecone-database/pinecone";
import { config } from "dotenv";

import { embedder } from "../../embeddings/embeddings";
import { getPineconeClient } from "./pinecone-config";

const { createIndexIfNotExists, chunkedUpsert } = utils;

const indexName = import.meta.env.VITE_PINECONE_INDEX;
let counter = 1;

const run = async () => {
  //Get a Pinecone client instance
  console.log("attempting to get client");
  const pineconeClient = await getPineconeClient();

  //Create a Pinecone index if it doesn't exist
  /* await createIndexIfNotExists(pineconeClient, indexName, 384); */

  //Select the target Pinecone index
  console.log("attempting to index client");
  const index = pineconeClient;
  console.log(index);

  /*   await embedder.init();
  await embedder.embedBatch(["Hello World"], 1, async (embeddings) => {
    console.log("attemping upsert");
    await chunkedUpsert(index, embeddings, "default");
  });

  console.log(`Inserted ${counter} documents into the index ${indexName}`); */
};

export default run;
