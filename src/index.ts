import { CosmosClient } from "@azure/cosmos";
import { nanoid } from "nanoid";

const endpoint = process.env.COSMOS_DB_ENDPOINT_URL || "";
const key = process.env.COSMOS_DB_ACCOUNT_KEY || "";
const client = new CosmosClient({ endpoint, key });

async function main() {
  // The rest of the README samples are designed to be pasted into this function body
  const { database } = await client.databases.createIfNotExists({
    id: "ToDoList",
  });
  const { container } = await database.containers.createIfNotExists({
    id: "Items",
  });

  for (const index of [...Array(10000).keys()]) {
    const item = {
      id: nanoid(),
      name: `name_${index}`,
      partitionKey: "x",
    };
    await container.items.create(item);
  }
}

main().catch((error) => {
  console.error(error);
});
