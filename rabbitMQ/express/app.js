const express = require("express");
const util = require("util");
const path = require("path");
const fs = require("fs");
const port = 3000;


const app = express();
const RabbitMQ = require("./public/rabbitmq");
const store = require("./public/database.js");

const rabbitMQ = new RabbitMQ()
// const cors = require("cors");

// app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "order.html"));
});

app.get("/order-details", (req, res) => {
  res.sendFile(path.join(__dirname, "order-details.html"))
});

app.get("/rabbitMQ", async (req, res) => {
  try {
    if(!rabbitMQ.isOpen()) {
      await rabbitMQ.connect()
    }
    res.json({
      isOpen: rabbitMQ.isOpen(),
      // channel: util.inspect(rabbitMQ.channel)
    })
  } catch (error) {
    console.error("Error checking RabbitMQ connection:", error);
    res.status(500).json({ error: "Unable to check RabbitMQ connection" });
  }
});

app.get('/database', async (req, res) => {

    fs.readFile(path.join(__dirname, "./database.json"), (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).send("데이터를 읽는중 에러가 발생했습니다.")
      }
      if(!data) {
        console.error("파일이 비어 있습니다.");
        return res.status(400).send("데이터가 없습니다.");
      }
      try {
        const parsedData = JSON.parse(data);w
        res.json(parsedData);
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        res.status(500).send("JSON 데이터 파싱 오류");
      }
    })

})

app.post("/api/order", async (req, res) => {
  const { name, quantity } = req.body;
  if(!name || !quantity) {
    return res.status(400).json({error:"Invalid order data"})
  }
  const orderData = {name, quantity};
  try {
    await rabbitMQ.order(orderData);
    await store();
    res.status(201).json({ message: "order successfully", orderData })
  } catch (e) {
    console.error("order failed", e);
    res.status(500).json({ error: "failed order"})

  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log('http://localhost:3000')
});
