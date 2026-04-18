import { BadRequestException } from "../exception/application.exception.js";
import { client } from "./redis.js";


class Redisrepo {
    
set = async ({ key, value, ttl } : {key:string,value:any,ttl:any} ) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  if (ttl) {
    return await client.set(key, value, { EX: ttl });
  }

  return await client.set(key, value);
};

get = async (key: string) => {
  let data : any = await client.get(key);

  try {
    data = JSON.parse(data);
  } catch (err) {}

  return data;
};

del = async (key: string) => {
  return await client.del(key);
};

exists = async (key: string) => {
  return await client.exists(key);
};

mget = async (...keys : string[]) => {
  let values: (string | null)[] = await client.mGet(keys);
    if(!values){
        throw new BadRequestException('value not found')
    }
  return values.map((val) => {
    try {
        if(!val) throw new Error("null")
      return JSON.parse(val);
    } catch {
      return val;
    }
  });
};
 keysByPrefix = async (prefix: string) => {
  return await client.keys(`${prefix}*`);
};

 setIfNotExists = async ({ key, value, ttl } : {key: string , value: any , ttl: any}) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  return await client.set(key, value, {
    NX: true,
    EX: ttl,
  });
};

increment = async (key: string) => {
  return await client.incr(key);
};

ttl = async (key: string) => {
  return await client.ttl(key);
};

deleteByPrefix = async (prefix: string) => {
  const keys = await client.keys(`${prefix}*`);

  if (keys.length === 0) return 0;

  return await client.del(keys);
};
}


export default new Redisrepo()