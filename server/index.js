import express from 'express'

const app = express();

app.use(express.json())

app.get('/', (require, response) => {
  response.json({message: "Hello"})
})

app.listen(5000, () => {
  console.log("server running");
})