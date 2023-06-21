import { Vector } from "@pinecone-database/pinecone";
import { Pipeline } from "@xenova/transformers";
import { v4 as uuidv4 } from "uuid";

function sliceIntoChunks(arr, chunkSize) {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize)
  );
}

class Embedder {
  constructor() {
    this._pipe = null;
  }

  // Init the pipeline
  async init() {
    const { pipeline } = await import("@xenova/transformers");
    this._pipe = await pipeline("embeddings", "Xenova/all-MiniLM-L6-v2");
  }

  // Embed a sentence
  async embed(text) {
    const result = this._pipe && (await this._pipe(text));
    return {
      id: uuidv4(),
      metadata: {
        text,
      },
      values: Array.from(result.data),
    };
  }

  // Batch an array of string and embed each batch
  // Call onDoneBatch with embeddings
  async embedBatch(texts, batchSize, onDoneBatch) {
    const batches = sliceIntoChunks(texts, batchSize);
    for (const batch of batches) {
      const embeddings = await Promise.all(
        batch.map((text) => this.embed(text))
      );
      onDoneBatch(embeddings);
    }
  }
}

export const embedder = new Embedder();
