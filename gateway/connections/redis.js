import redis from "redis"

const redis_client = redis.createClient({ url: "redis://localhost:6379" })
const redis_client_2 = redis.createClient({ url: "redis://localhost:6379" })

redis_client.connect()
redis_client_2.connect()

 redis_client.xGroupCreate("kuyruk_1", "kuyruk_1_grup", "$", { MKSTREAM: true }).catch(() => false)

export default { redis_client, redis_client_2 }