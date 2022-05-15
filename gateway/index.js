import express from "express"
import { v4 } from "uuid"
import clients from "./connections/redis.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/user/:action", async (req, res, next) => {

  const topic = v4()

  clients.redis_client.subscribe(topic, (message) => {

    clients.redis_client.unsubscribe(topic)

    return res.status(200).json({
      message: message.toString()
    })

  })

  let body = {
    topic: topic,
    message: "deneme"
  }

  await clients.redis_client_2.sendCommand(['XADD', 'kuyruk_1', '*', 'data', JSON.stringify(body)]);

  // setTimeout(() => {
  //   clients.redis_client_1.publish(topic, `mesaj ${topic}`)
  // }, 75);

})

const port = 6000
app.listen(port, () => {
  console.log(`✅ App running on port ${port}...`)
})