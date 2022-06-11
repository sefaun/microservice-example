import redis from "redis"

const redis_client = redis.createClient({ url: "redis://localhost:6379" })

redis_client.connect()

export default { redis_client }