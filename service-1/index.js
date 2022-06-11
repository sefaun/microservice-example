import async_module from "async"
import client from "./connections/redis.js"


let redis_options = "0"
let redis_block_options = "100"

const setRedisStreamOption = (symbol, block) => {
  redis_options = symbol
  redis_block_options = block
}

const deleteSelectedStream = async (stream_id) => {
  //ACK Data
  await client.redis_client.xAck("kuyruk_1", "kuyruk_1_grup", stream_id).catch(() => false)
  //Delete Redis Record
  await client.redis_client.xDel("kuyruk_1", stream_id).catch(() => false)
}

const getDatas = async () => {
  try {

    const result = await client.redis_client.sendCommand(["XREADGROUP", "GROUP", "kuyruk_1_grup", "gateway", "COUNT", "1", "BLOCK", redis_block_options, "STREAMS", "kuyruk_1", redis_options])

    if (result && result[0][1].length) {
      // Change Listening Type of Read Group on the Redis Stream
      setRedisStreamOption(">", "100")

      for (const items of result[0][1]) {
        try {

          if (!items[1]) {
            throw `Data not Found -> ${items[1]}`
          }

          const dataa = JSON.parse(items[1][1])

          client.redis_client.publish(dataa.topic, "cevap veriyorum")

          await deleteSelectedStream(items[0])

        } catch (error) {
          console.log(error)
        }
      }
    } else {
      setRedisStreamOption(">", "0")
    }

  } catch (error) {
    console.log(error)
  }
}

async_module.forever(function (next) {
  getDatas().then(() => next())
})