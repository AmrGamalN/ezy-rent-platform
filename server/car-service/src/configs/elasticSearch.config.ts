import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();


export const elasticClient  = new Client({
  node: String(process.env.ELASTICSEARCH_URL),
});