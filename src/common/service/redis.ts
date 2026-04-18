import { createClient } from "redis";
import {redisUrl} from '../../config/env.service'

export const client = createClient({
  url: redisUrl
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

client.on("connect", () => {
  console.log("Redis connecting...");
});

client.on("ready", () => {
  console.log("Redis is ready 🚀");
});

client.on("end", () => {
  console.log("Redis connection closed ❌");
});

export const connectionRedis = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    
  }
};