import redis from "redis"
import Redis from "ioredis"

const redis_client_2 = new Redis()

const redis_client = redis.createClient({ url: "redis://localhost:6379" })

redis_client.connect()

redis_client_2.xgroup("create", "kuyruk_1", "kuyruk_1_grup", "$", "MKSTREAM").catch(() => false)
// redis_client.xGroupCreate("kuyruk_1", "kuyruk_1_grup", "$", { MKSTREAM: true }).catch(() => false)

export default { redis_client, redis_client_2 }